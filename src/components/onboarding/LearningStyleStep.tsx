import { Button } from '@/components/ui/button';
import { BookOpen, Video, Headphones, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import React from 'react';

interface LearningStyleStepProps {
	value: string;
	learningType: string;
	onChange: (value: string) => void;
	onTextChange: (value: string) => void;
	onNext: () => void;
	onBack: () => void;
}

const SuggestedTopics = [
	{
		id: 'corruption',
		label: 'Corruption',
		icon: '⚖️',
		description: 'Understanding the basics, forms, and impacts of corruption',
		color: 'bg-red-100 text-red-800',
		count: 85, // number of flashcards/questions
	},
	{
		id: 'governance',
		label: 'Good Governance',
		icon: '🏛️',
		description: 'Principles of effective and ethical public administration',
		color: 'bg-blue-100 text-blue-800',
		count: 42,
	},
	{
		id: 'transparency',
		label: 'Transparency & Accountability',
		icon: '🔍',
		description:
			'Open government, access to information, and oversight mechanisms',
		color: 'bg-emerald-100 text-emerald-800',
		count: 38,
	},
	{
		id: 'ethics',
		label: 'Ethics & Integrity',
		icon: '✨',
		description:
			'Moral principles, ethical decision-making, and integrity systems',
		color: 'bg-purple-100 text-purple-800',
		count: 56,
	},
	{
		id: 'youth',
		label: 'Youth Engagement',
		icon: '👥',
		description:
			'How young people can lead and participate in anti-corruption efforts',
		color: 'bg-amber-100 text-amber-800',
		count: 31,
	},
	{
		id: 'technology',
		label: 'Tech & Innovation',
		icon: '💻',
		description:
			'Digital tools, AI, and innovative approaches to fight corruption',
		color: 'bg-cyan-100 text-cyan-800',
		count: 27,
	},
];

const LearningStyleStep = ({
	value,
	learningType,
	onChange,
	onTextChange,
	onNext,
	onBack,
}: LearningStyleStepProps) => {
	return (
		<div className="flex-1 flex flex-col justify-between">
			<div className="flex-1 flex flex-col items-center">
				<h1 className="text-2xl font-bold text-foreground text-center mb-2 mt-8">
					What do you want to learn?
				</h1>
				<p className="text-muted-foreground text-center mb-8">
					Tell us briefly which area of corruption you want to learn?
				</p>
				<Textarea
					value={learningType}
					onChange={(e) => onTextChange(e.target.value)}
					placeholder="Describe a scenario where corruption is present and you want a change..."
					className="mb-6 mt-20 w-full"
					rows={14}
				/>

				<>
					<h2 className="text-3xl font-bold text-slate-900 my-3 text-center">
						Some few examples of our corruption topics
					</h2>
					<div className="w-full  grid grid-cols-2 items-center justify-center gap-2">
						{SuggestedTopics.map((topic) => {
							return (
								<button
									key={topic.id}
									onClick={() => onChange(topic.id)}
									className={cn(
										'w-full p-2 rounded-xl border-2 transition-all duration-200 flex gap-4',
										value === topic.id
											? 'border-primary bg-primary/10'
											: 'border-border bg-card hover:border-primary/50'
									)}
								>
									<div
										className={cn(
											`w-6 h-6 rounded-full flex items-center justify-center
									${topic.color.split(' ')[0]}`
										)}
									>
										{topic.icon}
									</div>
									<p className="text-left text-lg font-semibold text-foreground block">
										{topic.label}
									</p>
								</button>
							);
						})}
					</div>
				</>
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
					onClick={onNext}
					disabled={!value || learningType.trim().length === 0}
					className="flex-1 h-14 text-lg font-semibold"
					size="lg"
				>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default LearningStyleStep;
