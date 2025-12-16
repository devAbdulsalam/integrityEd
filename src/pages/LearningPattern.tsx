import { ArrowLeft, Brain, Target } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningPattern = () => {
    const navigate = useNavigate();
    const [learningProfile, setLearningProfile] = React.useState<{
        visual: number;
        auditory: number;
        kinesthetic: number;
        conceptual: number;         
    }>({
        visual: 70, 
        auditory: 20, 
        kinesthetic: 0, 
        conceptual: 10,
    })
	return (
		<div className="min-h-screen bg-background pb-6">
			<div className="max-w-md mx-auto">
				{/* Header */}
				<div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 p-6 pb-4">
					<button onClick={() => navigate('/index')} className="mb-4">
						<ArrowLeft className="w-6 h-6 text-foreground" />
					</button>
					<h1 className="text-2xl font-bold text-foreground mb-4">
						LearningPattern
					</h1>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{/* Learning Style Profile */}
					<div className="bg-white rounded-2xl p-6 shadow-xl border">
						<h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
							<Brain className="w-6 h-6 text-blue-600" />
							Your Learning Style Profile
						</h3>

						<div className="space-y-4">
							{[
								{
									label: 'Visual Learner',
									value: learningProfile.visual,
									icon: '👁️',
									description:
										'Learn through seeing and visualizing information',
								},
								{
									label: 'Auditory Learner',
									value: learningProfile.auditory,
									icon: '👂',
									description: 'Learn through listening and discussing',
								},
								{
									label: 'Kinesthetic Learner',
									value: learningProfile.kinesthetic,
									icon: '✋',
									description: 'Learn through doing and hands-on experiences',
								},
								{
									label: 'Conceptual Learner',
									value: learningProfile.conceptual,
									icon: '🧠',
									description:
										'Learn through abstract thinking and systems analysis',
								},
							].map((style, index) => (
								<div key={index} className="relative">
									<div className="flex items-center justify-between mb-1">
										<div className="flex items-center gap-2">
											<span className="text-xl">{style.icon}</span>
											<span className="font-medium text-slate-900">
												{style.label}
											</span>
										</div>
										<span className="text-lg font-bold text-blue-700">
											{style.value}%
										</span>
									</div>
									<div className="h-3 bg-slate-200 rounded-full overflow-hidden">
										<div
											className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
											style={{ width: `${style.value}%` }}
										/>
									</div>
									<p className="text-sm text-slate-500 mt-1">
										{style.description}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Decision Making Profile */}
					<div className="bg-white rounded-2xl p-6 shadow-xl border">
						<h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
							<Target className="w-6 h-6 text-purple-600" />
							Decision Making Profile
						</h3>

						<div className="space-y-6">
							<div>
								<div className="flex items-center justify-between mb-2">
									<span className="text-slate-700">
										Dominant Reasoning Style
									</span>
									<span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
										{learningProfile.decisionPatterns.tendsToward}
									</span>
								</div>
								<p className="text-sm text-slate-600">
									You naturally approach integrity dilemmas from a{' '}
									{learningProfile.decisionPatterns.tendsToward} perspective
								</p>
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<span className="text-slate-700">Decision Speed</span>
									<span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
										{learningProfile.decisionPatterns.reactionTime}
									</span>
								</div>
								<p className="text-sm text-slate-600">
									Average reasoning time: {averageReasoningTime.toFixed(1)}{' '}
									seconds per scenario
								</p>
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<span className="text-slate-700">Integrity Confidence</span>
									<span className="text-lg font-bold text-emerald-700">
										{learningProfile.decisionPatterns.confidenceLevel}%
									</span>
								</div>
								<div className="h-3 bg-slate-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
										style={{
											width: `${learningProfile.decisionPatterns.confidenceLevel}%`,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LearningPattern;
