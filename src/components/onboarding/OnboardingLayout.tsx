import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface OnboardingLayoutProps {
	children: ReactNode;
	step: number;
	totalSteps: number;
}

const OnboardingLayout = ({
	children,
	step,
	totalSteps,
}: OnboardingLayoutProps) => {
	return (
		<div className="min-h-screen bg-background max-w-md mx-auto flex flex-col font-gochi ">
			{/* Progress indicator */}
			<div className="p-6 pt-12">
				<div className="flex gap-2 justify-center">
					{Array.from({ length: totalSteps }).map((_, index) => (
						<div
							key={index}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								index <= step ? 'w-8 bg-primary' : 'w-8 bg-muted'
							}`}
						/>
					))}
				</div>
			</div>

			{/* Content */}
			<motion.div
				key={step}
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -20 }}
				transition={{ duration: 0.3 }}
				className="flex-1 flex flex-col px-6 pb-6"
			>
				{children}
			</motion.div>
		</div>
	);
};

export default OnboardingLayout;
