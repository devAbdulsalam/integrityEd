import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';
const Index = () => {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);
	const [showPreloader, setShowPreloader] = useState(true);
	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

	const handleNavigation = () => {
		const onboardingCompleted = localStorage.getItem('onboarding_completed');
		if (onboardingCompleted === 'true') {
			navigate('/index');
		} else {
			navigate('/onboarding');
		}
	};

	useEffect(() => {
		// Start progress animation
		progressIntervalRef.current = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					if (progressIntervalRef.current) {
						clearInterval(progressIntervalRef.current);
					}
					return 100;
				}
				return prev + 1;
			});
		}, 50); // 50ms interval for 5 seconds total (100 * 50ms = 5000ms)

		// Navigate after 5 seconds
		const timer = setTimeout(() => {
			setShowPreloader(false);
			setTimeout(() => {
				handleNavigation();
			}, 300); // Small delay for exit animation
		}, 5000);

		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
			}
			clearTimeout(timer);
		};
	}, [navigate]);

	const handleSkip = () => {
		if (progressIntervalRef.current) {
			clearInterval(progressIntervalRef.current);
		}
		setShowPreloader(false);
		setTimeout(() => {
			handleNavigation();
		}, 300);
	};

	return (
		<AnimatePresence mode="wait">
			{showPreloader ? (
				<motion.div
					key="preloader"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="min-h-screen bg-gradient-to-br from-[#101c22] via-[#0c2733] to-[#083144] flex flex-col items-center justify-center p-6 relative overflow-hidden"
				>
					{/* Animated Background Elements */}
					<div className="absolute inset-0 overflow-hidden">
						<div className="absolute -top-40 -left-40 w-80 h-80 bg-[#1193d4]/10 rounded-full blur-3xl" />
						<div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#10b981]/10 rounded-full blur-3xl" />
						<div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl" />
					</div>

					{/* Main Content */}
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="relative z-10 max-w-md w-full space-y-8 text-center"
					>
						{/* Logo/Icon with Animation */}
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: 'spring',
								stiffness: 260,
								damping: 20,
								delay: 0.3,
							}}
							className="relative mx-auto"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-[#1193d4] to-[#10b981] rounded-2xl blur-lg opacity-50 animate-pulse" />
								<div className="relative bg-gradient-to-br from-[#1193d4]/20 to-[#10b981]/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-2xl">
									<div>
										<img src={logo} className="w-18 h-18 rounded-full" />
									</div>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 20,
											repeat: Infinity,
											ease: 'linear',
										}}
										className="absolute -top-2 -right-2"
									>
										<Sparkles className="w-6 h-6 text-yellow-400" />
									</motion.div>
								</div>
							</div>
						</motion.div>

						{/* Title & Description */}
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.6 }}
							className="space-y-4"
						>
							<h1 className="text-4xl mb-2 md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
								Gracie
							</h1>
							<p className="text-lg text-white/80 font-light max-w-sm mx-auto leading-relaxed">
								Learn about anti-corruption, earn rewards, and make a difference
								with our AI-powered platform.
							</p>
						</motion.div>

						{/* Progress Bar */}
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="space-y-4"
						>
							<div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
								<motion.div
									className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1193d4] to-[#10b981] rounded-full"
									style={{ width: `${progress}%` }}
									transition={{ duration: 0.1 }}
								/>
							</div>

							<div className="flex justify-between items-center">
								<span className="text-sm text-white/60">
									{Math.round(progress)}%
								</span>
								<span className="text-sm text-white/60">
									{Math.round((5000 - progress * 50) / 1000)}s
								</span>
							</div>
						</motion.div>

						{/* Loading Indicator */}
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
							className="pt-2"
						>
							<Loader2 className="w-6 h-6 text-[#1193d4] mx-auto" />
						</motion.div>

						{/* Skip Button */}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleSkip}
							className="text-sm text-white/60 hover:text-white/90 transition-colors duration-200"
						>
							Skip preloader
						</motion.button>
					</motion.div>

					{/* Bottom Decorative Elements */}
					<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
				</motion.div>
			) : (
				// Empty div for smooth transition
				<motion.div
					key="empty"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="min-h-screen bg-[#101c22]"
				/>
			)}
		</AnimatePresence>
	);
};

export default Index;
