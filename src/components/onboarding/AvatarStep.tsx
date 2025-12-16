import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import logo from '@/assets/logo.png';

interface AvatarStepProps {
	value: string;
	learningGuide: string;
	onChange: (value: string) => void;
	onTextChange: (value: string) => void;
	onComplete: () => void;
	onBack: () => void;
}

const avatars = [
	{ id: 'avatar-1', emoji: '👨‍🎓', bg: 'bg-blue-500/20' },
	{ id: 'avatar-2', emoji: '👩‍🎓', bg: 'bg-pink-500/20' },
	{ id: 'avatar-3', emoji: '🧑‍💼', bg: 'bg-purple-500/20' },
	{ id: 'avatar-4', emoji: '👨‍💻', bg: 'bg-green-500/20' },
	{ id: 'avatar-5', emoji: '👩‍💻', bg: 'bg-orange-500/20' },
	{ id: 'avatar-6', emoji: '🦸‍♂️', bg: 'bg-red-500/20' },
	{ id: 'avatar-7', emoji: '🦸‍♀️', bg: 'bg-yellow-500/20' },
	{ id: 'avatar-8', emoji: '🧙‍♂️', bg: 'bg-indigo-500/20' },
	{ id: 'avatar-9', emoji: '🧙‍♀️', bg: 'bg-teal-500/20' },
];
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { characters } from '@/data/characters';
import CharacterCard from '@/components/CharacterCard';
import Preloader from '@/components/Preloader';
import { Textarea } from '../ui/textarea';

const AvatarStep = ({
	value,
	learningGuide,
	onTextChange,
	onChange,
	onComplete,
	onBack,
}: AvatarStepProps) => {
	const navigate = useNavigate();
	const [showPreloader, setShowPreloader] = useState(false);

	const handleGenerateCharacter = () => {
		setShowPreloader(true);
		setTimeout(() => {
			setShowPreloader(false);
			onChange(characters[0].id);
			onComplete();
		}, 5000);
	};

	// 🔹 Render preloader first
	if (showPreloader) {
		return (
			<Preloader
				showPreloader={showPreloader}
				setShowPreloader={setShowPreloader}
				title="Gracie"
				time={5000}
				descriptions={[
					'Loading characters…',
					'Generating characters…',
					'Almost there…',
				]}
			/>
		);
	}

	return (
		<div className="min-h-screen bg-background pb-24">
			<div className="max-w-md mx-auto">
				<div className="flex-1 flex flex-col justify-between">
					<div className="flex-1 flex flex-col items-center">
						<div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 mt-8">
							<img src={logo} className="w-18 h-18 rounded-full" />
						</div>
						<h1 className="text-2xl font-bold text-foreground text-center mb-2">
							Create your preferred learning guide (Gracie)
						</h1>
						<p className="text-muted-foreground text-center mb-8">
							Briefly tell us about who you ideal learning guide is
						</p>
						<Textarea
							value={learningGuide}
							onChange={(e) => onTextChange(e.target.value)}
							placeholder="Tell who you think Gracie is, what she does and where she comes from"
							className="mb-6 mt-20 w-full"
							rows={16}
						/>
						{/* // ) : (
						// 	<div className="p-6 space-y-4">
						// 		{characters.map((character, index) => (
						// 			<motion.div
						// 				key={character.id}
						// 				initial={{ opacity: 0, y: 20 }}
						// 				animate={{ opacity: 1, y: 0 }}
						// 				transition={{ delay: index * 0.1 }}
						// 				onClick={() => onChange(character.id)}
						// 			>
						// 				<CharacterCard character={character} />
						// 			</motion.div>
						// 		))}
						// 	</div>
						// )} */}
					</div>

					<div className="flex gap-3">
						<Button
							onClick={onBack}
							variant="outline"
							className="flex-1 h-14 text-lg font-semibold"
							size="lg"
						>
							Back
						</Button>
						<Button
							onClick={handleGenerateCharacter}
							disabled={!learningGuide}
							className="flex-1 h-14 text-lg font-semibold"
							size="lg"
						>
							Generate Character
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AvatarStep;
