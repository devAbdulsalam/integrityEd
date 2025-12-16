import { BottomNav } from '@/components/BottomNav';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { LearningPath } from '@/components/LearningPath';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { BookOpen, Lock, Map, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '@/components/ProgressBar';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAllModulesByMode, getModulesByMode } from '@/data/module';
import { useModules } from '@/context/ModuleContext';

const Modules = () => {
	const navigate = useNavigate();
	const [viewMode, setViewMode] = useState<'path' | 'list'>('list');
	const { modules } = useModules();
	const allModules = getAllModulesByMode('easy', modules);

	// Find current active module
	//   console.log('myModules', myModules);
	const currentModuleId = 1;
	// Calculate total progress
	const totalProgress = 10;

	return (
		<div className="min-h-screen bg-background pb-20">
			{/* Header */}
			<div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
				<div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
					<HamburgerMenu />
					<h1 className="font-semibold text-foreground">Learning Journey</h1>
					<div className="w-10" />
				</div>
			</div>

			<div className="max-w-md mx-auto p-4 space-y-4">
				{/* Progress Overview */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-4 border border-primary/20"
				>
					<div className="flex items-center justify-between mb-3">
						<div>
							<h2 className="text-lg font-bold text-foreground">
								Your Journey
							</h2>
							<p className="text-sm text-muted-foreground">
								Level {currentModuleId} of {modules.length}
							</p>
						</div>
						<div className="text-right">
							<p className="text-2xl font-bold text-primary">
								{totalProgress}%
							</p>
							<p className="text-xs text-muted-foreground">Complete</p>
						</div>
					</div>
					<div className="h-2 bg-background/50 rounded-full overflow-hidden">
						<motion.div
							className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
							initial={{ width: 0 }}
							animate={{ width: `${totalProgress}%` }}
							transition={{ duration: 1, ease: 'easeOut' }}
						/>
					</div>
				</motion.div>

				{/* View Toggle */}
				<Tabs
					value={viewMode}
					onValueChange={(v) => setViewMode(v as 'path' | 'list')}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-2 bg-secondary/50">
						<TabsTrigger value="list" className="flex items-center gap-2">
							<List className="w-4 h-4" />
							<span>List View</span>
						</TabsTrigger>
						<TabsTrigger value="path" className="flex items-center gap-2">
							<Map className="w-4 h-4" />
							<span>Journey Map</span>
						</TabsTrigger>
					</TabsList>

					{/* Journey Map View */}
					<TabsContent value="path" className="mt-4">
						<LearningPath
							modules={allModules}
							currentModuleId={currentModuleId}
						/>
					</TabsContent>

					{/* List View */}
					<TabsContent value="list" className="mt-4 space-y-3">
						{allModules.map((module, index) => (
							<motion.div
								key={module.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.05 }}
							>
								<Card
									onClick={() =>
										!module.locked && navigate(`/module/${module.id}`)
									}
									className={`p-4 border-border border-2 border-red-400 px-2 border-dashed rounded-2xl ${
										module.locked
											? 'bg-secondary/30 opacity-60 '
											: 'bg-card hover:border-primary/50 cursor-pointer border-2 border-red-400 px-2 border-dashed rounded-2xl'
									} transition-all  `}
								>
									<div className="flex gap-3">
										<div
											className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${
												module.locked ? 'bg-muted' : 'bg-primary/10'
											}`}
										>
											{module.locked ? (
												<Lock className="w-5 h-5 text-muted-foreground" />
											) : (
												<BookOpen className="w-5 h-5 text-primary" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between mb-1">
												<div>
													<p className="text-xs text-muted-foreground mb-0.5">
														Level {module.id}
													</p>
													<h3 className="font-semibold text-foreground text-sm">
														{module.title}
													</h3>
												</div>
											</div>
											<p className="text-xs text-muted-foreground mb-2">
												{module.description}
											</p>
											{!module.locked && (
												<ProgressBar value={module.progress} />
											)}
											{module.locked && (
												<p className="text-xs text-muted-foreground">
													Complete previous level to unlock
												</p>
											)}
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</TabsContent>
				</Tabs>
			</div>
			<BottomNav />
		</div>
	);
};

export default Modules;
