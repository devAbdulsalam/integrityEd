import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgeRangeStepProps {
	value: string;
	onChange: (value: string) => void;
	onNext: () => void;
	onBack: () => void;
}

const ageRanges = [
	{ id: '13-17', label: '13-17', description: 'Teen', bg: 'bg-orange-500/20' },
	{
		id: '18-24',
		label: '18-24',
		description: 'Young Adult',
		bg: 'bg-yellow-500/20',
	},
	{ id: '25+', label: '25+', description: 'Adult', bg: 'bg-purple-500/20' },
];

const AgeRangeStep = ({
	value,
	onChange,
	onNext,
	onBack,
}: AgeRangeStepProps) => {
	return (
		<div className="flex-1 flex flex-col justify-between">
			<div className="flex-1 flex flex-col items-center">
				<div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 mt-8">
					<Calendar className="w-12 h-12 text-primary" />
				</div>

				<h1 className="text-2xl font-bold text-foreground text-center mb-2 capitalize">
					What's your age range?
				</h1>
				<p className="text-muted-foreground text-center mb-8">
					This helps us tailor content to your level
				</p>

				<div className="w-full max-w-sm grid gap-3">
					{ageRanges.map((range) => (
						<button
							key={range.id}
							onClick={() => onChange(range.id)}
							className={cn(
								'w-full p-5 rounded-full text-center border-2 transition-all duration-200',
								range.bg,
								value === range.id
									? 'border-primary '
									: 'border-border hover:border-primary/50'
							)}
						>
							<span className=" text-2xl font-semibold text-foreground block">
								{range.label}
							</span>
							<span className="text-lg text-muted-foreground">
								{range.description}
							</span>
						</button>
					))}
				</div>
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
					disabled={!value}
					className="flex-1 h-14 text-lg font-semibold"
					size="lg"
				>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default AgeRangeStep;
