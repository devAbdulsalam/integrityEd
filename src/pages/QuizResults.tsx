import ResultCard from '@/components/quiz/ResultCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface QuizAnswer {
	question: string;
	userAnswer: number;
	correctAnswer: number;
	options: string[];
	explanation?: string;
}

const QuizResults = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { answers = [], score = 0, total = 0 } = location.state || {};

	// Default sample data if no state passed
	const sampleAnswers: QuizAnswer[] =
		answers.length > 0
			? answers
			: [
					{
						question: 'What is the definition of corruption?',
						userAnswer: 0,
						correctAnswer: 0,
						options: [
							'The abuse of entrusted power for private gain',
							'A form of legitimate business transaction',
							'Legal political lobbying',
							'None of the above',
						],
					},
					{
						question: 'Which of the following is NOT a form of corruption?',
						userAnswer: 1,
						correctAnswer: 1,
						options: [
							'Bribery',
							'Legal donations to charity',
							'Embezzlement',
							'Nepotism',
						],
					},
					{
						question: 'What is the role of whistleblowers?',
						userAnswer: 2,
						correctAnswer: 0,
						options: [
							'Exposing corruption by reporting illegal activities',
							'Protecting corrupt officials',
							'Hiding evidence of wrongdoing',
							'None of the above',
						],
						explanation:
							'Whistleblowers play a crucial role in exposing corruption by reporting illegal or unethical activities within an organization. They are often protected by laws to prevent retaliation.',
					},
					{
						question: 'What are the consequences of corruption?',
						userAnswer: 0,
						correctAnswer: 0,
						options: [
							'Economic losses and reduced public trust',
							'Increased efficiency',
							'Better governance',
							'Higher tax revenue',
						],
					},
					{
						question:
							'What is the impact of corruption on economic development?',
						userAnswer: 1,
						correctAnswer: 0,
						options: [
							'It hinders economic growth and discourages investment',
							'It promotes business growth',
							'It has no impact',
							'It increases government revenue',
						],
						explanation:
							'Corruption significantly hinders economic development by diverting resources, discouraging investment, and creating an uneven playing field for businesses. It undermines trust in institutions and reduces the effectiveness of public services.',
					},
					{
						question:
							'What is the role of international organizations in combating corruption?',
						userAnswer: 0,
						correctAnswer: 0,
						options: [
							'Setting global standards and supporting anti-corruption efforts',
							'Encouraging corruption for economic gains',
							'Ignoring corruption issues',
							'Promoting bribery',
						],
					},
			  ];

	const displayAnswers = answers.length > 0 ? answers : sampleAnswers;
	const displayScore =
		score ||
		displayAnswers.filter((a: QuizAnswer) => a.userAnswer === a.correctAnswer)
			.length;
	const displayTotal = total || displayAnswers.length;

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-md mx-auto p-6 pb-24">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<button onClick={() => navigate(-1)}>
						<X className="w-6 h-6 text-foreground" />
					</button>
					<h1 className="text-xl font-bold text-foreground">Quiz Results</h1>
					<div className="w-6" />
				</div>

				{/* Score */}
				<div className="text-center mb-8">
					<h2 className="text-4xl font-bold text-foreground mb-2">
						Great Job
					</h2>
					<p className="text-muted-foreground">
						{displayScore >= displayTotal * 0.7
							? "You're doing great! Keep up the good work and continue learning to strengthen your understanding of anti-corruption."
							: 'Keep practicing! Review the explanations below to improve your understanding.'}
					</p>
				</div>

				{/* Review Answers */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-foreground">
						Review Answers
					</h3>
					{displayAnswers.map((answer: QuizAnswer, index: number) => {
						return <ResultCard key={index} answer={answer} index={index} />;
					})}
				</div>

				{/* Continue Button */}
				<div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
					<div className="flex gap-3 max-w-md mx-auto">
						<Button
							onClick={() => navigate('/index')}
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
						>
							Continue Learning
						</Button>
						<Button
							onClick={() => navigate('/characters/assessment')}
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
						>
							Improve your Gracie
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuizResults;
