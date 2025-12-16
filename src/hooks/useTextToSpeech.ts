import { useState, useRef, useCallback, useEffect } from 'react';
import { handelTextToSpeech } from '../utils/handelTextToSpeech';

interface UseTextToSpeechOptions {
	onStart?: () => void;
	onEnd?: () => void;
	onError?: (error: string) => void;
}

export const useTextToSpeech = (options: UseTextToSpeechOptions = {}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const cacheRef = useRef<Map<string, string>>(new Map());
	const currentRequestRef = useRef<AbortController | null>(null);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (audioRef.current) audioRef.current.pause();
			currentRequestRef.current?.abort();
		};
	}, []);

	const stop = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
		setIsPlaying(false);
	}, []);

	const playAudio = useCallback(
		(base64Audio: string) => {
			try {
				const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
				const audio = new Audio(audioUrl);

				audioRef.current = audio;

				audio.onplay = () => {
					setIsPlaying(true);
					options.onStart?.();
				};

				audio.onended = () => {
					setIsPlaying(false);
					options.onEnd?.();
				};

				audio.onerror = () => {
					setError('Failed to play audio');
					setIsPlaying(false);
					options.onError?.('Failed to play audio');
				};

				audio.play().catch(() => {
					setError('Failed to play audio');
				});
			} catch (error) {
				setError('Could not create audio element');
			}
		},
		[options]
	);

	const speak = useCallback(
		async (text: string, characterId: string) => {
			stop();
			setError(null);

			const shortKey = `${characterId}-${text.slice(0, 40)}`; // avoid massive cache keys
			const cachedAudio = cacheRef.current.get(shortKey);

			if (cachedAudio) {
				playAudio(cachedAudio);
				return;
			}

			setIsLoading(true);

			// Cancel previous request
			currentRequestRef.current?.abort();
			const controller = new AbortController();
			currentRequestRef.current = controller;

			try {
				const { data, error: fnError } = await handelTextToSpeech(
					{ text, characterId },
					controller.signal
				);

				if (controller.signal.aborted) return;

				if (fnError) throw new Error(fnError.message);
				if (!data?.audioContent) throw new Error('No audio content received');

				cacheRef.current.set(shortKey, data.audioContent);
				playAudio(data.audioContent);
			} catch (err: any) {
				if (err.name === 'AbortError') return;

				const message = err?.message || 'Failed to generate speech';
				setError(message);
				options.onError?.(message);
			} finally {
				if (!controller.signal.aborted) setIsLoading(false);
			}
		},
		[stop, playAudio, options]
	);

	const clearCache = useCallback(() => {
		cacheRef.current.clear();
	}, []);

	return {
		speak,
		stop,
		isLoading,
		isPlaying,
		error,
		clearCache,
	};
};
