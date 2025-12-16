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
import { getVideoUrlByTitle } from '@/data/videos';
import { useModules } from '@/context/ModuleContext';

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
	const [introCompleted, setIntroCompleted] = useState(false);
	const [userData, setUserData] = useState<UserProfile | null>(null);
	const [currentDifficulty, setCurrentDifficulty] =
		useState<Difficulty>('medium');
	const [module, setModule] = useState<ModuleType | null>(null);
	const [showQuiz, setShowQuiz] = useState(false);
	const [videoUrl, setVideoUrl] = useState('');
	const { markModuleComplete } = useModules();

	// console.log('context modules', modules);

	useEffect(() => {
		const storedData = localStorage.getItem('user_profile');
		if (storedData.progress >= 100) {
			const data = getVideoUrlByTitle(`module${id}`);
			setVideoUrl(data);
		} else {
			const data = getVideoUrlByTitle(`module${id}`);
			setVideoUrl(data);
		}
	}, [id]);
	// getVideoUrlByTitle(`module${id}`);
	// console.log('videoUrl', );

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
	const handleComplete = () => {
		markModuleComplete(`module${id}`, 'easy');
		navigate(`/flashcard/${id}`);
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
						value={introCompleted ? 25 : module.progress}
						label="Module Progress"
					/>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					<ModuleVideo
						module={module}
						videoUrl={videoUrl}
						showQuiz={showQuiz}
						setShowQuiz={handleComplete}
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
			</div>
		</div>
	);
};

export default Module;
