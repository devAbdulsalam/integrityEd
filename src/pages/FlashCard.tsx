import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ChevronRight,
	Volume2,
	Sparkles,
	RotateCw,
	Heart,
	Target,
	Users,
	Shield,
	ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock AI response generator (in production, this would call an API)
const generateGracieResponse = (question: string, answer: string): string => {
	const responses = [
		`Hey friend! ✨ You know, when we talk about "${question}", it's really about how power can be misused in our communities. The answer "${answer}" might sound formal, but think of it like this: Imagine if someone at your school was using their position to get special privileges while others suffer. That's what we're fighting against! Young people like us can be the change by speaking up and demanding fairness. What do you think about this concept?`,

		`Great question! 🌟 This is so relevant to our daily lives. "${answer}" - let me break it down in simpler terms. Think about when you see someone skipping a queue because they know someone, or when resources meant for everyone end up with just a few. These small acts add up! The good news? We can start by being the integrity champions in our own spaces. Have you experienced something similar in your community?`,

		`Ah, this one's important! 💪 "${question}" gets to the heart of why we need ethical leadership. You see, when "${answer}", it creates a ripple effect that affects education, healthcare, and opportunities for youth. But here's the hopeful part - young people across Africa are organizing, using social media, and creating art to fight this. We're not just victims; we're solution-makers! What's one way you could apply this learning today?`,
	];

	return responses[Math.floor(Math.random() * responses.length)];
};

interface Flashcard {
	question: string;
	answer: string;
	id: string;
}

const flashcards: Flashcard[] = [
	{
		id: '1',
		question:
			'What is the baseline definition of corruption provided by the World Bank?',
		answer: "The 'use of public office for private gain'.",
	},
	{
		id: '2',
		question:
			"How does Transparency International's definition of corruption broaden the scope beyond the public sector?",
		answer:
			"It defines corruption as 'the abuse of entrusted power for private gain', which includes private and non-governmental actors.",
	},
	{
		id: '3',
		question:
			'According to UNCAC, what are the five key illegal actions defined as corruption offences?',
		answer:
			'Bribery, embezzlement, trading in influence, abuse of functions, and illicit enrichment.',
	},
	{
		id: '4',
		question: 'What distinguishes "grand corruption" from "petty corruption"?',
		answer:
			"'Grand corruption' involves the upper echelons of government and large-scale theft, while 'petty corruption' refers to smaller, isolated instances with low-level officials.",
	},
	{
		id: '5',
		question:
			"What phenomenon occurs when powerful individuals or business elites use corruption to shape a country's policies, laws, or institutions for their own benefit?",
		answer: 'State capture.',
	},
	{
		id: '6',
		question:
			'Which Sustainable Development Goal (SDG) specifically calls for reducing all forms of corruption and developing transparent institutions?',
		answer: 'SDG 16: Peace, Justice and Strong Institutions.',
	},
	{
		id: '7',
		question:
			"The African Union estimates that what percentage of Africa's gross domestic product (GDP) is lost to corruption?",
		answer: "An estimated 25% of Africa's GDP is lost to corruption.",
	},
	{
		id: '8',
		question: 'In the context of corruption, what is "sextortion"?',
		answer:
			'It is a form of abuse of functions where sexual favours are demanded as a form of payment or bribe.',
	},
];

const getRandomFlashcards = (data: Flashcard[], count: number): Flashcard[] => {
	const shuffled = [...data].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

const FlashcardQuiz = () => {
	const [currentCards, setCurrentCards] = useState<Flashcard[]>(() =>
		getRandomFlashcards(flashcards, 5)
	);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [aiResponse, setAiResponse] = useState('');
	const [score, setScore] = useState(0);
	const [streak, setStreak] = useState(0);
	const [userKnows, setUserKnows] = useState<boolean | null>(null);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const navigate = useNavigate();

	const currentCard = currentCards[currentIndex];

	const speakText = (text: string) => {
		if ('speechSynthesis' in window) {
			setIsSpeaking(true);
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 0.9;
			utterance.pitch = 1;
			utterance.volume = 1;
			utterance.onend = () => setIsSpeaking(false);
			window.speechSynthesis.speak(utterance);
		}
	};

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
		if (!isFlipped) {
			setShowDetails(false);
		}
	};

	const handleShowDetails = () => {
		const response = generateGracieResponse(
			currentCard.question,
			currentCard.answer
		);
		setAiResponse(response);
		setShowDetails(true);
	};

	const handleUserResponse = (knows: boolean) => {
		setUserKnows(knows);
		if (knows) {
			setScore((prev) => prev + 1);
			setStreak((prev) => prev + 1);
		} else {
			setStreak(0);
		}

		setTimeout(() => {
			if (currentIndex === currentCards.length - 1) {
				// Quiz completed
				setCurrentCards(getRandomFlashcards(flashcards, 5));
				setCurrentIndex(0);
				setScore(0);
				setStreak(0);
			} else {
				setCurrentIndex((prev) => prev + 1);
			}
			setIsFlipped(false);
			setShowDetails(false);
			setUserKnows(null);
		}, 1500);
	};

	const handleRestart = () => {
		setCurrentCards(getRandomFlashcards(flashcards, 5));
		setCurrentIndex(0);
		setIsFlipped(false);
		setShowDetails(false);
		setScore(0);
		setStreak(0);
		setUserKnows(null);
	};

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === ' ') {
				handleFlip();
			} else if (e.key === 'ArrowRight' && isFlipped) {
				handleUserResponse(true);
			} else if (e.key === 'ArrowLeft' && isFlipped) {
				handleUserResponse(false);
			} else if (e.key === 'd' && isFlipped) {
				handleShowDetails();
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [isFlipped, currentIndex]);

	const progress = ((currentIndex + 1) / currentCards.length) * 100;

	const handleReadText = (e) => {
		if (isSpeaking) {
			setIsSpeaking(false);
			window.speechSynthesis.cancel();
			return;
		}
		e.stopPropagation();
		speakText(currentCard.answer);
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-md mx-auto p-6">
				{/* Header */}
				<div className="mb-4">
					<button onClick={() => navigate('/module/1')} className="mb-4">
						<ArrowLeft className="w-6 h-6 text-foreground" />
					</button>
					<div className="flex justify-between items-center mb-2">
						<h1 className="text-xl font-bold text-foreground">Flashcards</h1>
						<span className="text-sm text-muted-foreground">
							Question {currentIndex + 1} of {currentCards.length}
						</span>
					</div>
					<div className="w-full h-2 bg-progress-bg rounded-full overflow-hidden">
						<motion.div
							className="h-full bg-primary"
							initial={{ width: 0 }}
							animate={{
								width: `${((currentIndex + 1) / currentCards.length) * 100}%`,
							}}
						/>
					</div>
				</div>

				{/* Flashcard */}
				<div className="mb-8">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="relative"
					>
						<div
							className="cursor-pointer perspective-1000"
							onClick={handleFlip}
						>
							<motion.div
								className="relative w-full min:h-64 md:min-h-96 bg-white rounded-2xl shadow-xl border border-slate-100"
								animate={{ rotateY: isFlipped ? 180 : 0 }}
								transition={{ duration: 0.6 }}
								style={{ transformStyle: 'preserve-3d' }}
							>
								{/* Front of card */}
								<div
									className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between backface-hidden"
									style={{ backfaceVisibility: 'hidden' }}
								>
									<div>
										<div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-4">
											<Target className="w-4 h-4 text-blue-600" />
											<span className="text-sm font-medium text-blue-700">
												Question
											</span>
										</div>
										<h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
											{currentCard.question}
										</h2>
									</div>
									<div className="text-slate-500 text-sm flex items-center justify-between">
										<span>Click or press SPACE to flip</span>
										<div className="flex items-center gap-2">
											<button
												onClick={handleReadText}
												className="p-2 hover:bg-slate-100 rounded-full transition-colors"
											>
												<Volume2
													className={`w-5 h-5 ${
														isSpeaking ? 'text-emerald-600' : 'text-slate-400'
													}`}
												/>
											</button>
										</div>
									</div>
								</div>

								{/* Back of card */}
								<div
									className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between backface-hidden bg-gradient-to-br from-emerald-50 to-blue-50"
									style={{
										backfaceVisibility: 'hidden',
										transform: 'rotateY(180deg)',
									}}
								>
									<div>
										<div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full mb-4">
											<Sparkles className="w-4 h-4 text-emerald-600" />
											<span className="text-sm font-medium text-emerald-700">
												Answer
											</span>
										</div>
										<p className="text-lg md:text-xl text-slate-800 leading-relaxed">
											{currentCard.answer}
										</p>

										{/* User response buttons */}
										<AnimatePresence>
											{userKnows === null && (
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0 }}
													className="mt-6 flex gap-3"
												>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleUserResponse(false);
														}}
														className="flex-1 py-3 px-4 border-2 border-red-200 bg-red-50 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors"
													>
														Need to review
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleUserResponse(true);
														}}
														className="flex-1 py-3 px-4 border-2 border-emerald-200 bg-emerald-50 text-emerald-700 rounded-xl font-medium hover:bg-emerald-100 transition-colors"
													>
														Got it! Next →
													</button>
												</motion.div>
											)}
										</AnimatePresence>

										{/* Show Details button */}
										{!showDetails && (
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleShowDetails();
												}}
												className="mt-4 w-full py-3 border-2 border-blue-200 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors"
											>
												📚 Show Details (Gracie explains)
											</button>
										)}
									</div>

									<div className="text-slate-500 text-sm">
										<div className="flex items-center justify-between">
											<span>Press ← for "Need review", → for "Got it"</span>
											<button
												onClick={handleReadText}
												className="p-2 hover:bg-slate-100 rounded-full transition-colors"
											>
												<Volume2
													className={`w-5 h-5 ${
														isSpeaking ? 'text-emerald-600' : 'text-slate-400'
													}`}
												/>
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Gracie Explanation */}
						<AnimatePresence>
							{showDetails && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									className="mt-6 bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-100"
								>
									<div className="flex items-start gap-4 mb-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
												<Users className="w-6 h-6 text-white" />
											</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<div className="flex items-center gap-2">
													<Heart className="w-4 h-4 text-rose-500" />
													<span className="font-bold text-slate-900">
														Gracie here!
													</span>
												</div>
												<span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
													Your Peer Guide
												</span>
											</div>
											<p className="text-slate-700 leading-relaxed">
												{aiResponse}
											</p>
											<button
												onClick={() => speakText(aiResponse)}
												className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors"
											>
												<Volume2 className="w-4 h-4" />
												Listen to this explanation
											</button>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border">
					<h3 className="font-bold text-slate-900 mb-3">Quick Actions</h3>
					<div className="space-y-3">
						<button
							onClick={handleRestart}
							className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
						>
							<RotateCw className="w-5 h-5" />
							New Set of Cards
						</button>
						<Button
							onClick={() => navigate(`/quiz/${quizId}`)}
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
						>
							Start Quiz
						</Button>
					</div>
				</div>

				{/* Gracie's Signature */}
				<div className="mt-8 text-center">
					<p className="text-slate-600 italic">
						"Remember, every step you take in understanding corruption is a step
						toward building the transparent, fair world we all deserve. You've
						got this! 🌟" - Gracie, your integrity peer
					</p>
				</div>
			</div>
		</div>
	);
};

export default FlashcardQuiz;
