const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, content-type',
};

const characterVoices: Record<string, string> = {
	professor: 'ks5excykjjmcRhQvdt92',
	amina: 'EXAVITQu4vr4xnSDxMaL',
	kofi: 'ji8V21dyEPg5du75d9nX',
	justice: '8L53MDQFE8FzIw7uiRtS',
	zara: '9Dbo4hEvXQ5l7MXGZFQA',
};


export const handelTextToSpeech = async (
	body: { text: string; characterId: string },
	signal?: AbortSignal
) => {
	try {
		const { text, characterId } = body;

		if (!text) {
			return { data: null, error: { message: 'Text is required' } };
		}

		const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
		if (!apiKey) {
			return { data: null, error: { message: 'API key missing' } };
		}

		const voiceId =
			characterVoices[characterId] || characterVoices['professor-integrity'];

		const response = await fetch(
			`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
			{
				method: 'POST',
				redirect: 'follow',
				signal,
				headers: {
					Accept: 'audio/mpeg',
					'Content-Type': 'application/json',
					'xi-api-key': apiKey,
				},
				body: JSON.stringify({
					text,
					model_id: 'eleven_multilingual_v2',
					voice_settings: {
						stability: 0.5,
						similarity_boost: 0.75,
						style: 0.3,
						use_speaker_boost: true,
					},
				}),
			}
		);

		if (!response.ok) {
			return {
				data: null,
				error: { message: `API error: ${response.status}` },
			};
		}

		const buffer = await response.arrayBuffer();
		const base64Audio = btoa(String.fromCharCode(...new Uint8Array(buffer)));

		return { data: { audioContent: base64Audio }, error: null };
	} catch (e: any) {
		if (e?.name === 'AbortError') return { data: null, error: null };

		return {
			data: null,
			error: { message: e.message || 'Unknown error' },
		};
	}
};
