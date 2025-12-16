import React from 'react';
import { Check, X } from 'lucide-react';
import { Card } from '../ui/card';

type Answer = {
	question: string;
	userAnswer: string;
	correctAnswer: string;
	explanation?: string;
	options: string[];
};

const ResultCard = ({ answer }: { answer: Answer }) => {
	const isCorrect = answer.userAnswer === answer.correctAnswer;
	const [isViewedAnswer, setIsViewedAnswer] = React.useState(false);
	const handleViewAnswer = () => {
		setIsViewedAnswer((prev) => !prev);
	};

	const shouldShowExplanation =
		answer.explanation && (!isCorrect || isViewedAnswer);

	return (
		<Card
			className={`p-4 border-l-4 cursor-pointer ${
				isCorrect
					? 'bg-card border-l-green-500'
					: 'bg-primary/10 border-l-red-500'
			}`}
			onClick={handleViewAnswer}
		>
			<div className="flex justify-between items-start gap-3">
				<div className="flex-1">
					<p className="font-medium text-foreground mb-1">{answer.question}</p>
					<p
						className={`text-sm ${
							isCorrect ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{isCorrect ? 'Correct' : 'Incorrect'}
					</p>
				</div>

				{isCorrect ? (
					<Check className="w-6 h-6 text-green-500 flex-shrink-0" />
				) : (
					<X className="w-6 h-6 text-red-500 flex-shrink-0" />
				)}
			</div>

			{shouldShowExplanation && (
				<div className="mt-3 pt-3 border-t border-border/50">
					<p className="text-sm text-muted-foreground">
						<span className="font-semibold text-foreground">Explanation: </span>
						{answer.explanation || answer.options[answer.correctAnswer]}
					</p>
				</div>
			)}
		</Card>
	);
};

export default ResultCard;
