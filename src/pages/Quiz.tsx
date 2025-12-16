import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import QuizTimer from '@/components/quiz/QuizTimer';
import QuizStreak from '@/components/quiz/QuizStreak';
import QuizPowerUps, { defaultPowerUps } from '@/components/quiz/QuizPowerUps';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizOption from '@/components/quiz/QuizOption';
import RatingModal from '@/components/RatingModal';
import { getRandomQuestions, getModuleQuiz } from '@/data/quiz';

interface UserAnswer {
	question: string;
	userAnswer: number;
	correctAnswer: number;
	options: string[];
	explanation?: string;
}
interface UserProfile {
	username: string;
	ageRange: string;
	learningStyle: string;
	avatar: string;
	progress: number;
	reward: number;
}

const QUESTION_TIME = 30;
const BASE_POINTS = 100;

const Quiz = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const moduleQuestions = getModuleQuiz(`module${id}easy`);
	const questions = moduleQuestions.slice(0, 5) || getRandomQuestions(5);
	// console.log('module', id, questions);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState(0);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
	// Gamification state
	const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
	const [streak, setStreak] = useState(0);
	const [totalPoints, setTotalPoints] = useState(0);
	const [powerUps, setPowerUps] = useState(defaultPowerUps);
	const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
	const [showHint, setShowHint] = useState(false);
	const [showFeedback, setShowFeedback] = useState(false);
	const [lastAnswer, setLastAnswer] = useState<{
		isCorrect: boolean;
		points: number;
		bonus: number;
	} | null>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [userData, setUserData] = useState<UserProfile | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem('user_profile');
		if (storedData) {
			const user: UserProfile = JSON.parse(storedData);
			setUserData(user);
		}
	}, []);
	// Timer effect
	useEffect(() => {
		if (isPaused || showFeedback || showResult) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [currentQuestion, isPaused, showFeedback, showResult]);

	const handleTimeUp = useCallback(() => {
		if (selectedAnswer === null) {
			toast.error("Time's up!");
			handleAnswer(-1); // Force wrong answer
		}
	}, [selectedAnswer]);

	const getMultiplier = (currentStreak: number) => {
		if (currentStreak >= 5) return 3;
		if (currentStreak >= 3) return 2;
		return 1;
	};

	const handleSubmit = (data) => {
		console.log('User submitted ratings:', data);
		// Send to your backend here
		setIsOpen(false);
		const user = localStorage.getItem('user_profile');
		if (user) {
			const userData = JSON.parse(user);
			userData.progress += 10;
			localStorage.setItem('user_profile', JSON.stringify(userData));
		}

		navigate(`/module/${Number(id) + 1}`);
	};
	const handleSkip = () => {
		setIsOpen(false);
		const user = localStorage.getItem('user_profile');
		if (user) {
			const userData = JSON.parse(user);
			userData.progress += 10;
			localStorage.setItem('user_profile', JSON.stringify(userData));
		}
		navigate(`/module/${Number(id) + 1}`);
	};
	const handleShowRatingModal = () => {
		// const isRating = localStorage.getItem('gracei_rating');
		// if (isRating) {
		// 	navigate(`/module/${Number(id) + 1}`);
		// 	return;
		// }

		setShowResult(false);
		setIsOpen(true);
	};

	const calculatePoints = (timeRemaining: number, currentStreak: number) => {
		const timeBonus = Math.floor((timeRemaining / QUESTION_TIME) * 50);
		const multiplier = getMultiplier(currentStreak);
		const streakBonus = currentStreak > 0 ? currentStreak * 10 : 0;
		return {
			base: BASE_POINTS,
			timeBonus,
			streakBonus,
			multiplier,
			total: (BASE_POINTS + timeBonus) * multiplier + streakBonus,
		};
	};

	const handleAnswer = (answerIndex: number) => {
		if (showFeedback) return;

		const currentQ = questions[currentQuestion];
		const isCorrect = answerIndex === currentQ.correctAnswer;

		const answer: UserAnswer = {
			question: currentQ.question,
			userAnswer: answerIndex,
			correctAnswer: currentQ.correctAnswer,
			options: currentQ.options,
			explanation: currentQ.explanation,
		};

		setUserAnswers([...userAnswers, answer]);

		if (isCorrect) {
			const newStreak = streak + 1;
			setStreak(newStreak);
			setScore(score + 1);

			const points = calculatePoints(timeLeft, newStreak);
			setTotalPoints(totalPoints + points.total);
			setLastAnswer({
				isCorrect: true,
				points: points.total,
				bonus: points.streakBonus,
			});
		} else {
			setStreak(0);
			setLastAnswer({ isCorrect: false, points: 0, bonus: 0 });
		}

		setSelectedAnswer(answerIndex);
		// setShowFeedback(true);
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedAnswer(null);
			setTimeLeft(QUESTION_TIME);
			setEliminatedOptions([]);
			setShowHint(false);
		} else {
			setShowResult(true);
			localStorage.setItem(
				'user_profile',
				JSON.stringify({
					...userData,
					progress: userData?.progress + 10,
					reward: userData?.reward + (score / questions.length >= 0.7 ? 1 : 0),
				})
			);
		}
	};

	const handleUsePowerUp = (id: string) => {
		const currentQ = questions[currentQuestion];

		setPowerUps(
			powerUps.map((p) => (p.id === id ? { ...p, uses: p.uses - 1 } : p))
		);

		switch (id) {
			case 'extraTime':
				setTimeLeft((prev) => Math.min(prev + 10, QUESTION_TIME + 10));
				toast.success('+10 seconds added!');
				break;
			case 'fiftyFifty':
				const wrongAnswers = currentQ.options
					.map((_, i) => i)
					.filter(
						(i) =>
							i !== currentQ.correctAnswer && !eliminatedOptions.includes(i)
					);
				const toEliminate = wrongAnswers
					.sort(() => Math.random() - 0.5)
					.slice(0, 2);
				setEliminatedOptions([...eliminatedOptions, ...toEliminate]);
				toast.success('Two wrong answers removed!');
				break;
			case 'hint':
				setShowHint(true);
				toast.info(currentQ.hint || 'Think carefully about the question...');
				break;
		}
	};

	const handleRestart = () => {
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setShowResult(false);
		setScore(0);
		setUserAnswers([]);
		setTimeLeft(QUESTION_TIME);
		setStreak(0);
		setTotalPoints(0);
		setPowerUps(defaultPowerUps);
		setEliminatedOptions([]);
		setShowHint(false);
		setShowFeedback(false);
		setLastAnswer(null);
	};

	const handleSeeQandA = () => {
		const userAnswer = {
			answers: userAnswers,
			score: score,
			total: questions.length,
			totalPoints: totalPoints,
		};
		// console.log(userAnswer);
		navigate('/quiz-results', { state: userAnswer });
	};

	if (showResult) {
		const percentage = (score / questions.length) * 100;
		const passed = percentage >= 70;
		if (!passed) {
			// toast.error('Better luck next time!');
			console.log('failed');
		}

		return (
			<div className="min-h-screen bg-background flex items-center justify-center p-6">
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: 'spring', damping: 15 }}
				>
					<Card className="max-w-md w-full p-8 bg-card border-border text-center space-y-6">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: 'spring' }}
						>
							<CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
						</motion.div>

						<div>
							<h2 className="text-2xl font-bold text-foreground mb-2">
								Quiz Complete!
							</h2>

							<motion.p
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
								className="text-2xl font-bold text-foreground mt-4"
							>
								{totalPoints} Points Earned!
							</motion.p>
						</div>
						{passed ? (
							<div className="p-4 bg-primary/10 rounded-lg">
								<p className="text-sm text-foreground">
									Congratulations! You've earned a Knowledge Token 🏆
								</p>
							</div>
						) : (
							<p className="text-sm text-muted-foreground">
								You're doing great! Keep up the good work and continue learning
								to strengthen your understanding of anti-corruption.
							</p>
						)}
						<div className="space-y-2 pt-4">
							{/* <Button
								onClick={handleSeeQandA}
								className="w-full"
								>
								Review Answers
								</Button> */}
							<Button
								onClick={handleShowRatingModal}
								variant="outline"
								className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
							>
								Next Module
							</Button>
						</div>
					</Card>
				</motion.div>
			</div>
		);
	}

	const question = questions[currentQuestion];
	const multiplier = getMultiplier(streak);

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-md mx-auto p-6">
				{/* Header */}
				<div className="mb-4">
					<button onClick={() => navigate('/module/1')} className="mb-4">
						<ArrowLeft className="w-6 h-6 text-foreground" />
					</button>
					<div className="flex justify-between items-center mb-2">
						<h1 className="text-xl font-bold text-foreground">Module Quiz</h1>
						<span className="text-sm text-muted-foreground">
							Question {currentQuestion + 1} of {questions.length}
						</span>
					</div>
					<div className="w-full h-2 bg-progress-bg rounded-full overflow-hidden">
						<motion.div
							className="h-full bg-primary"
							initial={{ width: 0 }}
							animate={{
								width: `${((currentQuestion + 1) / questions.length) * 100}%`,
							}}
						/>
					</div>
				</div>

				{/* Timer */}
				<div className="mb-4">
					<QuizTimer
						timeLeft={timeLeft}
						maxTime={QUESTION_TIME}
						onTimeUp={handleTimeUp}
						isPaused={showFeedback}
					/>
				</div>

				{/* Streak & Points */}
				<div className="mb-4">
					<QuizStreak
						streak={streak}
						multiplier={multiplier}
						points={totalPoints}
					/>
				</div>

				{/* Power-ups */}
				<div className="mb-4">
					<QuizPowerUps
						powerUps={powerUps}
						onUsePowerUp={handleUsePowerUp}
						disabled={showFeedback || selectedAnswer !== null}
					/>
				</div>

				{/* Question */}
				<Card className="p-6 bg-card border-border mb-6">
					<motion.h2
						key={currentQuestion}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-lg font-semibold text-foreground mb-4"
					>
						{question.question}
					</motion.h2>

					{showHint && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							className="mb-4 p-3 rounded-lg bg-primary/10 text-sm text-primary"
						>
							💡 {question?.hint}
						</motion.div>
					)}

					<div className="space-y-3">
						{question.options.map((option, index) => (
							<QuizOption
								key={index}
								option={option}
								index={index}
								isSelected={selectedAnswer === index}
								isDisabled={showFeedback}
								isEliminated={eliminatedOptions.includes(index)}
								onClick={() => handleAnswer(index)}
							/>
						))}
					</div>
				</Card>
			</div>
			<RatingModal
				isOpen={isOpen}
				handleSubmit={handleSubmit}
				handleSkip={handleSkip}
			/>
			{/* Feedback Overlay */}
			{/* <QuizFeedback
				show={showFeedback}
				isCorrect={lastAnswer?.isCorrect ?? false}
				pointsEarned={lastAnswer?.points ?? 0}
				streakBonus={lastAnswer?.bonus ?? 0}
				explanation={!lastAnswer?.isCorrect ? question.explanation : undefined}
				onContinue={handleContinue}
			/> */}
		</div>
	);
};

export default Quiz;
