import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, Sparkles } from 'lucide-react';

type PreloaderProps = {
	title?: string;
	descriptions: string[];
	time?: number;
	showPreloader: boolean;
	setShowPreloader: React.Dispatch<React.SetStateAction<boolean>>;
};

const Preloader: React.FC<PreloaderProps> = ({
	title = 'Gracie',
	descriptions,
	time = 5000,
	showPreloader,
	setShowPreloader,
}) => {
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Progress step calculation (100% over given time)
	const stepTime = time / 100;

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(intervalRef.current!);
					return 100;
				}
				return prev + 1;
			});
		}, stepTime);

		const timeout = setTimeout(() => {
			setShowPreloader(false);
		}, time);

		return () => {
			clearInterval(intervalRef.current!);
			clearTimeout(timeout);
		};
	}, [time, setShowPreloader, stepTime]);

	// 🔹 Dynamic description based on progress
	const activeDescription = useMemo(() => {
		if (!descriptions.length) return '';
		const index = Math.min(
			Math.floor((progress / 100) * descriptions.length),
			descriptions.length - 1
		);
		return descriptions[index];
	}, [progress, descriptions]);

	return (
		<AnimatePresence mode="wait">
			{showPreloader && (
				<motion.div
					key="preloader"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden"
				>
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6 }}
						className="relative z-10 max-w-md w-full text-center space-y-8"
					>
						{/* Loader */}
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
						>
							<Loader2 className="w-6 h-6 text-[#1193d4] mx-auto" />
						</motion.div>
						{/* Text */}
						<div className="space-y-3">
							<motion.p
								key={activeDescription}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="text-lg text-foreground"
							>
								{activeDescription}
							</motion.p>
							{/* Progress */}
							<div className="space-y-3">
								<div className="h-2 bg-white/10 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-[#1193d4] to-[#10b981]"
										style={{ width: `${progress}%` }}
									/>
								</div>

								<div className="flex justify-between text-sm text-white/60">
									<span>{progress}%</span>
									<span>{Math.ceil((time - progress * stepTime) / 1000)}s</span>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Preloader;
