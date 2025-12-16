import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Play,
	Pause,
	CheckCircle,
	Clock,
	Eye,
} from 'lucide-react';

const VideoQuizModule = ({ module, showQuiz, setShowQuiz }) => {
	const [hasCompletedVideo, setHasCompletedVideo] = useState(false);
	const [videoProgress, setVideoProgress] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [totalDuration, setTotalDuration] = useState(0);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const [watchRequirements, setWatchRequirements] = useState({
		minPercent: 95, // User must watch at least 95% of video
		minTime: 0, // Will be set to video duration
		mustReachEnd: true, // Must reach the end of video
	});

	const videoRef = useRef<HTMLVideoElement>(null);
	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Initialize watch requirements when video metadata loads
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoadedMetadata = () => {
			setTotalDuration(video.duration);
			setWatchRequirements((prev) => ({
				...prev,
				minTime: video.duration * 0.95, // Must watch 95% of duration
			}));
		};

		video.addEventListener('loadedmetadata', handleLoadedMetadata);
		return () => {
			video.removeEventListener('loadedmetadata', handleLoadedMetadata);
		};
	}, []);

	// Monitor video progress
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const updateProgress = () => {
			if (video.duration) {
				const progress = (video.currentTime / video.duration) * 100;
				setVideoProgress(progress);
				setCurrentTime(video.currentTime);

				// Check if video completion requirements are met
				const requirementsMet = checkCompletionRequirements(
					progress,
					video.currentTime
				);
				if (requirementsMet && !hasCompletedVideo) {
					setHasCompletedVideo(true);
				}
			}
		};

		// Update every 500ms
		progressIntervalRef.current = setInterval(updateProgress, 500);

		// Video event listeners
		const handleTimeUpdate = () => {
			updateProgress();
		};

		const handleEnded = () => {
			setHasCompletedVideo(true);
			setIsPlaying(false);
		};

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);

		video.addEventListener('timeupdate', handleTimeUpdate);
		video.addEventListener('ended', handleEnded);
		video.addEventListener('play', handlePlay);
		video.addEventListener('pause', handlePause);

		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
			}
			video.removeEventListener('timeupdate', handleTimeUpdate);
			video.removeEventListener('ended', handleEnded);
			video.removeEventListener('play', handlePlay);
			video.removeEventListener('pause', handlePause);
		};
	}, [hasCompletedVideo]);

	// Check video completion requirements
	const checkCompletionRequirements = (
		progress: number,
		currentTime: number
	) => {
		const { minPercent, minTime, mustReachEnd } = watchRequirements;

		// Check if reached end
		if (mustReachEnd && videoRef.current && !videoRef.current.ended) {
			return false;
		}

		// Check percentage watched
		if (progress < minPercent) {
			return false;
		}

		// Check minimum time watched
		if (currentTime < minTime) {
			return false;
		}

		return true;
	};

	// Show quiz when video is completed
	useEffect(() => {
		if (hasCompletedVideo) {
			// Small delay for better UX
			const timer = setTimeout(() => {
				setShowQuiz(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [hasCompletedVideo]);

	// Video controls
	const togglePlayPause = () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	};

	const skipToPercent = (percent: number) => {
		const video = videoRef.current;
		if (!video || !video.duration) return;

		const time = (percent / 100) * video.duration;
		video.currentTime = time;
		setVideoProgress(percent);
	};

	const changePlaybackRate = (rate: number) => {
		const video = videoRef.current;
		if (!video) return;

		video.playbackRate = rate;
		setPlaybackRate(rate);
	};

	// Format time (seconds to MM:SS)
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	// Reset video progress (if needed)
	const resetVideo = () => {
		const video = videoRef.current;
		if (!video) return;

		video.currentTime = 0;
		setVideoProgress(0);
		setHasCompletedVideo(false);
		setShowQuiz(false);
		setIsPlaying(false);
	};

	return (
		<div className="space-y-8">
			{/* Video Section */}
			<div className="space-y-4">
				{/* Video Container */}
				<div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 h-[325px]">
					{/* Video Element */}
					<video
						ref={videoRef}
						src={module.video}
						className="w-full aspect-video"
						poster="/placeholder.svg"
						controls={false} // We'll use custom controls
					/>

					{/* Custom Controls Overlay */}
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
						{/* Progress Bar */}
						<div className="mb-3">
							<div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
								<div
									className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-400"
									style={{ width: `${videoProgress}%` }}
								/>

								{/* Skip Prevention Dots */}
								{[25, 50, 75].map((percent) => (
									<div
										key={percent}
										className="absolute top-1/2 w-2 h-2 bg-white/30 rounded-full -translate-y-1/2"
										style={{ left: `${percent}%` }}
									/>
								))}
							</div>

							{/* Time Display */}
							<div className="flex justify-between text-xs text-white/70 mt-1">
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(totalDuration)}</span>
							</div>
						</div>

						{/* Control Buttons */}
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								{/* Play/Pause */}
								<button
									onClick={togglePlayPause}
									className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
								>
									{isPlaying ? (
										<Pause className="w-5 h-5 text-slate-900" />
									) : (
										<Play className="w-5 h-5 text-slate-900 ml-0.5" />
									)}
								</button>

								{/* Playback Speed */}
								<div className="flex items-center gap-2">
									{[0.5, 1, 1.5, 2].map((rate) => (
										<button
											key={rate}
											onClick={() => changePlaybackRate(rate)}
											className={`px-2 py-1 rounded text-sm ${
												playbackRate === rate
													? 'bg-blue-600 text-white'
													: 'bg-white/20 text-white/80 hover:bg-white/30'
											}`}
										>
											{rate}x
										</button>
									))}
								</div>
							</div>

							{/* Completion Status */}
							<div className="text-right">
								<div className="flex items-center gap-2 text-white">
									{hasCompletedVideo ? (
										<>
											<CheckCircle className="w-5 h-5 text-emerald-400" />
											<span className="font-medium">Video Complete!</span>
										</>
									) : (
										<>
											<Clock className="w-5 h-5 text-amber-400" />
											<span>{Math.round(videoProgress)}% watched</span>
										</>
									)}
								</div>
								<div className="text-xs text-white/60 mt-1">
									{hasCompletedVideo
										? 'Quiz unlocked!'
										: `Watch ${watchRequirements.minPercent}% to continue`}
								</div>
							</div>
						</div>
					</div>

					{/* Skip Attempt Warning */}
					{/* <AnimatePresence>
						{videoProgress > 0 &&
							videoProgress < watchRequirements.minPercent && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-sm"
								>
									<div className="flex items-start gap-2">
										<AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
										<div>
											<p className="text-sm font-medium text-slate-900">
												Please watch the full video
											</p>
											<p className="text-xs text-slate-600 mt-1">
												You need to watch at least{' '}
												{watchRequirements.minPercent}% of this video (
												{formatTime(watchRequirements.minTime)}) to unlock the
												quiz.
											</p>
										</div>
									</div>
								</motion.div>
							)}
					</AnimatePresence> */}
				</div>

				{/* Progress Requirements */}
				{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div
						className={`p-4 rounded-xl border ${
							videoProgress >= 25
								? 'border-emerald-200 bg-emerald-50'
								: 'border-slate-200 bg-slate-50'
						}`}
					>
						<div className="flex items-center gap-3">
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${
									videoProgress >= 25
										? 'bg-emerald-100 text-emerald-700'
										: 'bg-slate-200 text-slate-600'
								}`}
							>
								<span className="text-sm font-bold">25%</span>
							</div>
							<div>
								<h4 className="font-medium text-slate-900">First Checkpoint</h4>
								<p className="text-sm text-slate-600">
									Basic concepts introduced
								</p>
							</div>
						</div>
					</div>

					<div
						className={`p-4 rounded-xl border ${
							videoProgress >= 50
								? 'border-emerald-200 bg-emerald-50'
								: 'border-slate-200 bg-slate-50'
						}`}
					>
						<div className="flex items-center gap-3">
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${
									videoProgress >= 50
										? 'bg-emerald-100 text-emerald-700'
										: 'bg-slate-200 text-slate-600'
								}`}
							>
								<span className="text-sm font-bold">50%</span>
							</div>
							<div>
								<h4 className="font-medium text-slate-900">Midpoint</h4>
								<p className="text-sm text-slate-600">
									Core principles explained
								</p>
							</div>
						</div>
					</div>

					<div
						className={`p-4 rounded-xl border ${
							videoProgress >= watchRequirements.minPercent
								? 'border-emerald-200 bg-emerald-50'
								: 'border-slate-200 bg-slate-50'
						}`}
					>
						<div className="flex items-center gap-3">
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${
									videoProgress >= watchRequirements.minPercent
										? 'bg-emerald-100 text-emerald-700'
										: 'bg-slate-200 text-slate-600'
								}`}
							>
								<CheckCircle className="w-4 h-4" />
							</div>
							<div>
								<h4 className="font-medium text-slate-900">Completion</h4>
								<p className="text-sm text-slate-600">
									{videoProgress >= watchRequirements.minPercent
										? 'Ready for quiz!'
										: `${watchRequirements.minPercent}% required`}
								</p>
							</div>
						</div>
					</div>
				</div> */}

				{/* Completion Celebration */}
				{/* <AnimatePresence>
					{hasCompletedVideo && (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6"
						>
							<div className="flex items-center gap-4">
								<div className="flex-shrink-0">
									<div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
										<CheckCircle className="w-8 h-8 text-white" />
									</div>
								</div>
								<div className="flex-1">
									<h4 className="text-xl font-bold text-emerald-900">
										Video Complete! 🎉
									</h4>
									<p className="text-emerald-800 mt-1">
										Great job watching the entire video! You've earned access to
										the quiz.
									</p>
									<div className="flex items-center gap-4 mt-3 text-sm text-emerald-700">
										<span className="flex items-center gap-1">
											<Eye className="w-4 h-4" />
											{Math.round(videoProgress)}% watched
										</span>
										<span className="flex items-center gap-1">
											<Clock className="w-4 h-4" />
											{formatTime(currentTime)} / {formatTime(totalDuration)}
										</span>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setShowQuiz(true)}
									className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
								>
									Start Quiz Now
								</motion.button>
							</div>
						</motion.div>
					)}
				</AnimatePresence> */}
			</div>

			
			{/* Debug/Admin Controls (Remove in production) */}
			{/* {process.env.NODE_ENV === 'development' && (
				<div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border">
					<h5 className="font-medium text-slate-900 mb-2">
						Video Controls (Dev)
					</h5>
					<div className="flex gap-2 flex-wrap">
						<button
							onClick={() => skipToPercent(25)}
							className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm"
						>
							25%
						</button>
						<button
							onClick={() => skipToPercent(50)}
							className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm"
						>
							50%
						</button>
						<button
							onClick={() => skipToPercent(75)}
							className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm"
						>
							75%
						</button>
						<button
							onClick={() => skipToPercent(95)}
							className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm"
						>
							95%
						</button>
						<button
							onClick={() => setHasCompletedVideo(true)}
							className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 rounded text-sm"
						>
							Force Complete
						</button>
						<button
							onClick={resetVideo}
							className="px-3 py-1 bg-rose-100 hover:bg-rose-200 rounded text-sm"
						>
							Reset
						</button>
					</div>
				</div>
			)} */}
		</div>
	);
};

export default VideoQuizModule;
