import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { ModuleCard } from '@/components/ModuleCard';
import ModuleVideo from '@/components/ModuleVideo';
import CharacterVideo from '@/components/CharacterVideo';
import { ArrowLeft, DollarSign, Play, SkipForward } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { moduleIntros } from '@/data/characters';
import { getModule, Difficulty, Module as ModuleType } from '@/data/module';
import { getModuleDifficulty } from '@/utils/moduleProgression';

import RatingModal from '@/components/RatingModal';
import { getVideoUrlByTitle } from '@/data/videos';

interface UserProfile {
	username: string;
	ageRange: string;
	learningStyle: string;
	avatar: string;
	progress: number;
}

const Module = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [showIntro, setShowIntro] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [introCompleted, setIntroCompleted] = useState(false);
	const [userData, setUserData] = useState<UserProfile | null>(null);
	const [currentDifficulty, setCurrentDifficulty] =
		useState<Difficulty>('medium');
	const [module, setModule] = useState<ModuleType | null>(null);
	const [showQuiz, setShowQuiz] = useState(false);
	const videoUrl = getVideoUrlByTitle(`module${id}`);
	// console.log('videoUrl', );

	const handleSubmit = (data) => {
		console.log('User submitted ratings:', data);
		// Send to your backend here
		setIsOpen(false);
		setShowQuiz(true);
	};
	const handleSkip = () => {
		setIsOpen(false);
	};
	const handleShowRatingModal = () => {
		const isRating = localStorage.setItem(
			'gracei_rating',
			JSON.stringify(userData)
		);
		if (isRating) {
			setShowQuiz(true);
			return;
		}
		setIsOpen(true);
	};
	useEffect(() => {
		const storedData = localStorage.getItem('user_profile');
		if (storedData) {
			const user: UserProfile = JSON.parse(storedData);
			setUserData(user);
		}
	}, []);

	useEffect(() => {
		if (id) {
			const difficulty = getModuleDifficulty(`module${id}`);
			setCurrentDifficulty(difficulty);
			const moduleData = getModule(`module${id}`, difficulty);
			setModule(moduleData);
		}
	}, [id]);

	const moduleIntro =
		moduleIntros.find((m) => m.moduleId === id) || moduleIntros[0];

	const handleIntroComplete = () => {
		setShowIntro(false);
		setIntroCompleted(true);
		if (userData) {
			localStorage.setItem(
				'user_profile',
				JSON.stringify({ ...userData, progress: userData.progress + 10 })
			);
		}
	};

	if (!module) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<p className="text-muted-foreground">Loading module...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pb-6">
			<div className="max-w-md mx-auto">
				{/* Header */}
				<div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 p-6 pb-4">
					<button onClick={() => navigate('/index')} className="mb-4">
						<ArrowLeft className="w-6 h-6 text-foreground" />
					</button>
					<div className="flex items-center gap-2 mb-2">
						<h1 className="text-2xl font-bold text-foreground">
							Module {id}: {module.title}
						</h1>
						<span
							className={`text-xs px-2 py-1 rounded-full ${
								currentDifficulty === 'easy'
									? 'bg-green-500/20 text-green-500'
									: currentDifficulty === 'medium'
									? 'bg-yellow-500/20 text-yellow-500'
									: 'bg-red-500/20 text-red-500'
							}`}
						>
							{currentDifficulty}
						</span>
					</div>
					<ProgressBar
						value={introCompleted ? 50 : 25}
						label="Module Progress"
					/>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					<ModuleVideo
						module={module}
						videoUrl={videoUrl}
						showQuiz={showQuiz}
						setShowQuiz={handleShowRatingModal}
					/>

					{/* Introduction */}
					<section className="space-y-3">
						<h2 className="text-xl font-bold text-foreground">
							{module.title}
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{module.description}
						</p>
					</section>

					{/* Fact */}
					<section className="space-y-2">
						<p className="text-muted-foreground leading-relaxed">
							{module.facts}
						</p>
					</section>

					{/* Types */}
					<section className="space-y-4">
						<h2 className="text-xl font-bold text-foreground">{module.type}</h2>
						{module.types.map((type, index) => (
							<ModuleCard
								key={index}
								icon={<DollarSign className="w-6 h-6 text-primary" />}
								title={type.split(':')[0]}
								description={type.split(':').slice(1).join(':').trim()}
							/>
						))}
					</section>

					{/* Analogy */}
					<section className="space-y-3">
						<h2 className="text-xl font-bold text-foreground">For example:</h2>
						<p className="text-muted-foreground leading-relaxed">
							{module.analogy}
						</p>
					</section>

					{/* Action */}
					<section className="space-y-3">
						<h2 className="text-xl font-bold text-foreground">
							What can we do?
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{module.action}
						</p>
					</section>
				</div>
				{/* Quiz Section */}
				<section className="space-y-3 pt-4">
					<h2 className="text-xl font-bold text-foreground">Flash Cards</h2>
					<p className="text-muted-foreground">
						Test your understanding with flash cards.
					</p>
					<Button
						onClick={() => navigate(`/flashcard`)}
						variant="outline"
						className="w-full font-semibold py-6 text-lg"
					>
						Flash Cards
					</Button>
				</section>
				{/* Quiz Section */}
				<AnimatePresence>
					{showQuiz && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							className="border-2 border-blue-200 rounded-2xl overflow-hidden"
						>
							<div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-blue-200">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-2xl font-bold text-slate-900">
											Knowledge Check
										</h3>
										<p className="text-slate-600 mt-1">
											Test your understanding of the video content
										</p>
									</div>
									<div className="flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 rounded-full">
										<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
										<span className="text-sm font-medium text-blue-700">
											Quiz Unlocked
										</span>
									</div>
								</div>
							</div>

							{/* Quiz Content Here */}
							<div className="p-6 bg-white">
								<div className="text-center py-12">
									<div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
										<SkipForward className="w-10 h-10 text-blue-600" />
									</div>
									<h4 className="text-xl font-bold text-slate-900 mb-2">
										Quiz Ready!
									</h4>
									<p className="text-slate-600 max-w-md mx-auto">
										You've successfully completed the video. The quiz will test
										your understanding of the concepts covered.
									</p>
									<button
										onClick={() =>
											navigate(
												`/quiz?module=${id}&difficulty=${currentDifficulty}`
											)
										}
										className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
									>
										Begin Quiz
									</button>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				<RatingModal
					isOpen={isOpen}
					handleSubmit={handleSubmit}
					handleSkip={handleSkip}
				/>
			</div>
		</div>
	);
};

export default Module;
