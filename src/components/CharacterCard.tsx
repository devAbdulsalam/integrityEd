import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Character } from '@/data/characters';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
	character: Character;
	isSelected?: boolean;
}

const CharacterCard = ({ character, isSelected }: CharacterCardProps) => {
	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className={cn(
				'w-full p-2 rounded-xl border-2 transition-all duration-200 text-left',
				'bg-gradient-to-br',
				character.bgGradient,
				isSelected
					? 'border-primary shadow-lg shadow-primary/20'
					: 'border-border hover:border-primary/50'
			)}
		>
			<div className="flex items-center gap-4">
				<div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center text-3xl">
					{character.emoji}
				</div>
				<div className="flex-1">
					<h3 className={cn('font-semibold', character.color)}>
						{character.name}
					</h3>
					<p className="text-xs text-muted-foreground mt-0.5">
						{character.role}
					</p>
				</div>
			</div>
		</motion.button>
	);
};

export default CharacterCard;
