import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Users,
	Brain,
	TrendingUp,
	BarChart3,
	Target,
	Clock,
	Award,
	Sparkles,
	ChevronRight,
	Heart,
	Volume2,
	BookOpen,
	Shield,
	Zap,
	Compass,
	Star,
	CheckCircle,
	AlertCircle,
	RefreshCw,
	Lightbulb,
	BrainCircuit,
	UserCheck,
	TargetIcon,
	ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type CharacterScenario = {
	id: number;
	character: {
		name: string;
		age: number;
		occupation: string;
		location: string;
		avatarEmoji: string;
		background: string;
	};
	scenario: string;
	choices: {
		text: string;
		reasoningType: 'ethical' | 'practical' | 'legal' | 'community-focused';
		consequence: string;
		learningPreference:
			| 'visual'
			| 'auditory'
			| 'kinesthetic'
			| 'conceptual'
			| 'practical';
		integrityScore: number; // 0-100
		immediateImpact: string;
		longTermImpact: string;
	}[];
	question: string;
	idealChoiceIndex: number;
	explanation: {
		ethicalFramework: string;
		realWorldExample: string;
		youthConnection: string;
		keyTakeaway: string;
	};
};

type LearningProfile = {
	visual: number;
	auditory: number;
	kinesthetic: number;
	conceptual: number;
	decisionPatterns: {
		tendsToward: 'ethical' | 'practical' | 'legal' | 'community-focused';
		reactionTime: 'quick' | 'considered' | 'deliberate';
		confidenceLevel: number;
	};
	strengths: string[];
	growthAreas: string[];
};

const CharacterAssessment = () => {
	const navigate = useNavigate();
	// Scenarios Database
	const [scenarios, setScenarios] = useState<CharacterScenario[]>([
		{
			id: 1,
			character: {
				name: 'Amina',
				age: 22,
				occupation: 'University Student & Student Council President',
				location: 'Nairobi, Kenya',
				avatarEmoji: '👩🏾‍🎓',
				background:
					'Amina is passionate about student rights and has organized several successful campus campaigns for transparency in student fees allocation.',
			},
			scenario:
				"Amina discovers that the Dean's office has been collecting 'facilitation fees' from students for course registration that should be free. The Dean privately offers her a leadership scholarship if she can 'manage student expectations' about this issue.",
			choices: [
				{
					text: "Accept the scholarship quietly and use your position to reassure students that the fees are 'necessary administrative costs'",
					reasoningType: 'practical',
					consequence: 'Short-term gain but perpetuates corruption',
					learningPreference: 'practical',
					integrityScore: 20,
					immediateImpact: 'Personal benefit secured',
					longTermImpact: 'Erosion of trust in student leadership',
				},
				{
					text: "Organize a confidential meeting with student representatives to gather evidence and file a formal complaint with the university's integrity committee",
					reasoningType: 'ethical',
					consequence: 'Risk of backlash but upholds principles',
					learningPreference: 'conceptual',
					integrityScore: 90,
					immediateImpact: 'Potential conflict with administration',
					longTermImpact: 'Systemic change and protection of student rights',
				},
				{
					text: 'Create an anonymous social media campaign exposing the fees while protecting your identity, hoping public pressure will force change',
					reasoningType: 'community-focused',
					consequence: 'Raises awareness but lacks formal accountability',
					learningPreference: 'visual',
					integrityScore: 70,
					immediateImpact: 'Public attention drawn to issue',
					longTermImpact: 'May lead to policy review',
				},
				{
					text: 'Research the exact legal provisions on university fees in your country and present a legally-backed petition to the university senate',
					reasoningType: 'legal',
					consequence: 'Formal process with institutional engagement',
					learningPreference: 'conceptual',
					integrityScore: 85,
					immediateImpact: 'Slower but systematic approach',
					longTermImpact: 'Establishes precedent for legal compliance',
				},
			],
			question:
				"What would you do in Amina's position, considering both immediate impact and long-term systemic change?",
			idealChoiceIndex: 1,
			explanation: {
				ethicalFramework:
					'This scenario tests the tension between personal benefit and collective good. The ethical approach prioritizes institutional integrity over individual gain.',
				realWorldExample:
					'Similar to student-led movements in South Africa (#FeesMustFall) and India that successfully challenged unfair university practices through organized, principled resistance.',
				youthConnection:
					"Young leaders often face this 'integrity test' early in their careers - the choice between compromising values for access or upholding principles with potential short-term costs.",
				keyTakeaway:
					'True leadership requires courage to challenge systemic issues, even when personal incentives push toward complicity.',
			},
		},
		{
			id: 2,
			character: {
				name: 'Kwame',
				age: 26,
				occupation: 'Junior Procurement Officer, Ministry of Health',
				location: 'Accra, Ghana',
				avatarEmoji: '👨🏿‍💼',
				background:
					'Kwame recently joined the civil service and is eager to make a difference in healthcare delivery. He comes from a family of healthcare workers.',
			},
			scenario:
				"Kwame is processing emergency medical equipment procurement during a cholera outbreak. A supplier offers him 15% 'commission' to fast-track their bid, which is 30% more expensive than other options. The equipment is urgently needed.",
			choices: [
				{
					text: 'Accept the commission to expedite the process, reasoning that any delay costs lives during the outbreak',
					reasoningType: 'practical',
					consequence:
						'Immediate equipment but at inflated cost and personal compromise',
					learningPreference: 'practical',
					integrityScore: 25,
					immediateImpact: 'Equipment arrives quickly',
					longTermImpact: 'Sets corrupt precedent, wastes public funds',
				},
				{
					text: 'Refuse the bribe, document the attempt, and report it to the anti-corruption unit while continuing with proper procurement procedures',
					reasoningType: 'ethical',
					consequence: 'Slower process but maintains integrity',
					learningPreference: 'conceptual',
					integrityScore: 95,
					immediateImpact: 'Potential delay in equipment arrival',
					longTermImpact:
						'Upholds procurement integrity, deters future corruption',
				},
				{
					text: 'Negotiate with the supplier to remove the commission and match the market price while maintaining the fast timeline',
					reasoningType: 'practical',
					consequence: 'Attempts to balance urgency and ethics',
					learningPreference: 'kinesthetic',
					integrityScore: 65,
					immediateImpact: 'Possible compromise solution',
					longTermImpact: 'May normalize negotiation with corrupt actors',
				},
				{
					text: 'Alert your supervisor and suggest activating emergency procurement protocols that allow for faster legitimate processes during health crises',
					reasoningType: 'legal',
					consequence: 'Works within system to address urgency',
					learningPreference: 'conceptual',
					integrityScore: 85,
					immediateImpact: 'Uses established emergency procedures',
					longTermImpact: 'Strengthens institutional capacity',
				},
			],
			question:
				'How do you balance urgent public need against maintaining procurement integrity during a health emergency?',
			idealChoiceIndex: 3,
			explanation: {
				ethicalFramework:
					'Public health emergencies test systems - the ethical approach uses established emergency protocols rather than compromising integrity.',
				realWorldExample:
					"Similar challenges faced during COVID-19 PPE procurement globally, where some countries established 'integrity pacts' for emergency purchases.",
				youthConnection:
					"Young professionals in public service often encounter their first major integrity test during crises when pressure to 'get things done' conflicts with procedures.",
				keyTakeaway:
					'Crises reveal system weaknesses but also opportunities to strengthen ethical frameworks through proper emergency protocols.',
			},
		},
		{
			id: 3,
			character: {
				name: 'Chloe',
				age: 24,
				occupation: 'Investigative Journalism Intern',
				location: 'Lagos, Nigeria',
				avatarEmoji: '👩🏽‍💻',
				background:
					'Chloe runs a popular youth-focused blog exposing social issues. She recently uncovered evidence linking a popular youth politician to embezzlement of sports development funds.',
			},
			scenario:
				"Chloe's investigation reveals that a well-liked youth politician (with 500K social media followers) diverted funds meant for community sports facilities. The politician's team offers her a lucrative contract to run their social media if she 'drops the story'. Publishing could risk her internship and safety.",
			choices: [
				{
					text: 'Take the contract but continue investigating anonymously through citizen journalism collectives',
					reasoningType: 'practical',
					consequence:
						'Financial security while maintaining investigation capacity',
					learningPreference: 'practical',
					integrityScore: 40,
					immediateImpact: 'Financial benefit gained',
					longTermImpact: 'Compromised journalistic independence',
				},
				{
					text: 'Publish the findings through established media partners with legal support and security precautions in place',
					reasoningType: 'ethical',
					consequence: 'Truth revealed but personal and professional risks',
					learningPreference: 'visual',
					integrityScore: 90,
					immediateImpact: 'Public accountability for politician',
					longTermImpact: 'Strengthens investigative journalism ecosystem',
				},
				{
					text: 'Share the evidence with civil society organizations working on youth accountability and let them lead the advocacy campaign',
					reasoningType: 'community-focused',
					consequence: 'Distributes risk while ensuring issue gets attention',
					learningPreference: 'kinesthetic',
					integrityScore: 80,
					immediateImpact: 'Collective action initiated',
					longTermImpact: 'Builds coalition for accountability',
				},
				{
					text: 'Present the evidence to appropriate anti-corruption agencies and let them handle prosecution while you report on the process',
					reasoningType: 'legal',
					consequence:
						'Follows formal channels while maintaining reporter role',
					learningPreference: 'conceptual',
					integrityScore: 85,
					immediateImpact: 'Official investigation triggered',
					longTermImpact: 'Supports rule of law approach',
				},
			],
			question:
				'How do young journalists balance exposing truth with personal safety and career sustainability in corrupt environments?',
			idealChoiceIndex: 1,
			explanation: {
				ethicalFramework:
					'Journalistic integrity requires courage to publish uncomfortable truths, especially when powerful interests try to silence through co-option.',
				realWorldExample:
					'Similar to Panama Papers investigations where journalists faced threats but persisted through international collaboration and security protocols.',
				youthConnection:
					'Young journalists in digital media often face this tension between access/opportunity and maintaining investigative independence.',
				keyTakeaway:
					'The most impactful journalism often comes with personal risk, but collaboration and proper protocols can mitigate dangers.',
			},
		},
		{
			id: 4,
			character: {
				name: 'Diego',
				age: 28,
				occupation: 'Community Organizer & Tech Entrepreneur',
				location: 'Medellín, Colombia',
				avatarEmoji: '👨🏻‍💻',
				background:
					'Diego developed an app that tracks public service delivery in his neighborhood. He discovered systematic diversion of municipal funds meant for youth programming.',
			},
			scenario:
				"Diego's app data reveals that 70% of youth program funds are being redirected. Local officials offer to 'partner' with his tech startup for exclusive municipal contracts if he modifies the data presentation to show 'improvements'. His startup needs funding to scale.",
			choices: [
				{
					text: "Accept the partnership but maintain the real data in a separate 'researcher' version of the app",
					reasoningType: 'practical',
					consequence: 'Secures funding but creates dual reality',
					learningPreference: 'practical',
					integrityScore: 35,
					immediateImpact: 'Startup funding secured',
					longTermImpact: "Undermines transparency tool's credibility",
				},
				{
					text: 'Reject the offer and use the app data to organize community pressure campaigns for accountability',
					reasoningType: 'ethical',
					consequence: 'Maintains tool integrity but loses funding opportunity',
					learningPreference: 'kinesthetic',
					integrityScore: 90,
					immediateImpact: 'Community mobilization',
					longTermImpact: 'Strengthens community-led accountability',
				},
				{
					text: 'Create a public dashboard with the data and launch a crowdfunding campaign explaining why you rejected corrupt partnership offers',
					reasoningType: 'community-focused',
					consequence:
						'Transparent funding alternative while exposing corruption',
					learningPreference: 'visual',
					integrityScore: 85,
					immediateImpact: 'Public support and alternative funding',
					longTermImpact: 'Models integrity-based entrepreneurship',
				},
				{
					text: 'Submit the data to national audit institutions and request protection as a whistleblower while continuing operations',
					reasoningType: 'legal',
					consequence: 'Formal investigation triggered with legal protections',
					learningPreference: 'conceptual',
					integrityScore: 80,
					immediateImpact: 'Official scrutiny of funds',
					longTermImpact: 'Institutional response to corruption',
				},
			],
			question:
				'How do social entrepreneurs maintain integrity when offered corrupt partnerships that could accelerate their impact?',
			idealChoiceIndex: 2,
			explanation: {
				ethicalFramework:
					"Social entrepreneurship's value lies in integrity - compromising data transparency for growth defeats the purpose of social innovation.",
				realWorldExample:
					'Similar to civic tech initiatives in Brazil and Kenya that maintained data integrity despite pressure, building public trust over time.',
				youthConnection:
					"Young social entrepreneurs often face this 'growth vs integrity' dilemma, especially when working with public institutions.",
				keyTakeaway:
					'The most sustainable social ventures build trust through unwavering commitment to their core values, even when it slows growth.',
			},
		},
	]);

	// State Management
	const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
	const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
		null
	);
	const [isAnswered, setIsAnswered] = useState(false);
	const [learningProfile, setLearningProfile] = useState<LearningProfile>({
		visual: 0,
		auditory: 0,
		kinesthetic: 0,
		conceptual: 0,
		decisionPatterns: {
			tendsToward: 'ethical',
			reactionTime: 'considered',
			confidenceLevel: 0,
		},
		strengths: [],
		growthAreas: [],
	});
	const [reasoningTime, setReasoningTime] = useState<number[]>([]);
	const [assessmentComplete, setAssessmentComplete] = useState(false);
	const [showInsights, setShowInsights] = useState(false);

	const scenarioStartTime = useRef<number>(Date.now());
	const totalResponses = useRef<number>(0);

	const currentScenario = scenarios[currentScenarioIndex];

	// Update learning profile based on choices
	const updateLearningProfile = useCallback(
		(choiceIndex: number) => {
			const choice = currentScenario.choices[choiceIndex];

			setLearningProfile((prev) => {
				const updated = { ...prev };

				// Update learning preference scores
				switch (choice.learningPreference) {
					case 'visual':
						updated.visual += 20;
						break;
					case 'auditory':
						updated.auditory += 20;
						break;
					case 'kinesthetic':
						updated.kinesthetic += 20;
						break;
					case 'conceptual':
						updated.conceptual += 20;
						break;
				}

				// Update decision patterns
				updated.decisionPatterns.tendsToward = choice.reasoningType as any;

				// Calculate average reaction time
				const timeTaken = (Date.now() - scenarioStartTime.current) / 1000;
				const reactionTime =
					timeTaken < 10
						? 'quick'
						: timeTaken < 30
						? 'considered'
						: 'deliberate';
				updated.decisionPatterns.reactionTime = reactionTime;

				// Update confidence based on integrity score
				updated.decisionPatterns.confidenceLevel = Math.min(
					100,
					updated.decisionPatterns.confidenceLevel +
						(choice.integrityScore > 70 ? 10 : 5)
				);

				return updated;
			});
		},
		[currentScenario]
	);

	// Handle choice selection
	const handleChoiceSelect = (choiceIndex: number) => {
		if (isAnswered) return;

		const timeTaken = (Date.now() - scenarioStartTime.current) / 1000;
		setReasoningTime((prev) => [...prev, timeTaken]);
		setSelectedChoiceIndex(choiceIndex);
		setIsAnswered(true);
		updateLearningProfile(choiceIndex);
		totalResponses.current += 1;
	};

	// Move to next scenario
	const handleNextScenario = () => {
		if (currentScenarioIndex < scenarios.length - 1) {
			setCurrentScenarioIndex((prev) => prev + 1);
			setSelectedChoiceIndex(null);
			setIsAnswered(false);
			scenarioStartTime.current = Date.now();
			setShowInsights(false);
		} else {
			setAssessmentComplete(true);
			analyzeFinalProfile();
		}
	};

	// Analyze final learning profile
	const analyzeFinalProfile = () => {
		const profile = { ...learningProfile };

		// Determine dominant learning style
		const maxScore = Math.max(
			profile.visual,
			profile.auditory,
			profile.kinesthetic,
			profile.conceptual
		);

		let strengths = [];
		let growthAreas = [];

		if (profile.visual === maxScore)
			strengths.push('Visual reasoning', 'Pattern recognition');
		if (profile.auditory === maxScore)
			strengths.push('Verbal processing', 'Dialogue-based learning');
		if (profile.kinesthetic === maxScore)
			strengths.push('Practical application', 'Experiential learning');
		if (profile.conceptual === maxScore)
			strengths.push('Abstract thinking', 'Systems understanding');

		// Identify growth areas
		if (profile.visual < 50) growthAreas.push('Visual information processing');
		if (profile.auditory < 50) growthAreas.push('Verbal reasoning');
		if (profile.kinesthetic < 50) growthAreas.push('Practical application');
		if (profile.conceptual < 50) growthAreas.push('Conceptual thinking');

		setLearningProfile((prev) => ({
			...prev,
			strengths: strengths.slice(0, 3),
			growthAreas: growthAreas.slice(0, 2),
		}));
	};

	// Get learning style description
	const getLearningStyleDescription = (style: string) => {
		switch (style) {
			case 'visual':
				return 'You learn best through diagrams, charts, and visual representations of information.';
			case 'auditory':
				return 'You learn best through discussions, explanations, and verbal processing.';
			case 'kinesthetic':
				return 'You learn best through hands-on experiences and practical applications.';
			case 'conceptual':
				return 'You learn best through abstract thinking, systems analysis, and theoretical frameworks.';
			default:
				return '';
		}
	};

	// Calculate average reasoning time
	const averageReasoningTime =
		reasoningTime.length > 0
			? reasoningTime.reduce((a, b) => a + b, 0) / reasoningTime.length
			: 0;

	// Reset assessment
	const resetAssessment = () => {
		setCurrentScenarioIndex(0);
		setSelectedChoiceIndex(null);
		setIsAnswered(false);
		setAssessmentComplete(false);
		setShowInsights(false);
		setReasoningTime([]);
		setLearningProfile({
			visual: 0,
			auditory: 0,
			kinesthetic: 0,
			conceptual: 0,
			decisionPatterns: {
				tendsToward: 'ethical',
				reactionTime: 'considered',
				confidenceLevel: 0,
			},
			strengths: [],
			growthAreas: [],
		});
		totalResponses.current = 0;
		scenarioStartTime.current = Date.now();
	};

	return (
		<div className="min-h-screen bg-background pb-6">
			<div className="max-w-md mx-auto">
				<div className="flex items-center justify-between my-6">
					<button onClick={() => navigate(-1)}>
						<ArrowLeft className="w-6 h-6 text-foreground" />
					</button>
					<h1 className="text-xl font-bold text-foreground">Characters Lab</h1>
					<div></div>
				</div>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-10"
				>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">
						Step into these characters' shoes and make real-world integrity
						decisions. We'll help you understand your reasoning patterns and
						learning preferences.
					</p>
				</motion.div>

				{!assessmentComplete ? (
					<>
						{/* Progress Bar */}
						<div className="mb-8">
							<div className="flex justify-between items-center mb-2">
								<span className="text-sm font-medium text-slate-600">
									Scenario {currentScenarioIndex + 1} of {scenarios.length}
								</span>
								<span className="text-sm font-medium text-slate-600">
									{!isAnswered && (
										<span className="flex items-center gap-2">
											<Clock className="w-4 h-4" />
											Thinking time:{' '}
											{Math.floor(
												(Date.now() - scenarioStartTime.current) / 1000
											)}
											s
										</span>
									)}
								</span>
							</div>
							<div className="h-2 bg-slate-200 rounded-full overflow-hidden">
								<motion.div
									className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
									initial={{ width: 0 }}
									animate={{
										width: `${
											((currentScenarioIndex + 1) / scenarios.length) * 100
										}%`,
									}}
									transition={{ duration: 0.5 }}
								/>
							</div>
						</div>

						{/* Character Card */}
						<motion.div
							key={currentScenarioIndex}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="mb-8"
						>
							<div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
								<div className="flex flex-col md:flex-row gap-6">
									{/* Character Avatar */}
									<div className="relative">
										<div className="w-24 h-24 text-6xl flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl border-4 border-white shadow-lg">
											{currentScenario.character.avatarEmoji}
										</div>
										<div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
											{currentScenario.character.age}
										</div>
									</div>
									<div className="mt-2 md:mt-0">
										<span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
											<UserCheck className="w-4 h-4" />
											Your character today
										</span>
									</div>
								</div>
								{/* Character Info */}
								<div className="flex-1">
									<div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
										<div>
											<h2 className="text-2xl font-bold text-slate-900">
												{currentScenario.character.name}
											</h2>
											<p className="text-slate-600">
												{currentScenario.character.occupation} •{' '}
												{currentScenario.character.location}
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-4">
									<div>
										<h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
											<BookOpen className="w-5 h-5 text-blue-600" />
											Background
										</h3>
										<p className="text-slate-700 leading-relaxed">
											{currentScenario.character.background}
										</p>
									</div>

									<div>
										<h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
											<AlertCircle className="w-5 h-5 text-amber-600" />
											The Situation
										</h3>
										<p className="text-slate-700 leading-relaxed bg-amber-50 p-4 rounded-lg border border-amber-100">
											{currentScenario.scenario}
										</p>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Question */}
						<div className="mb-8">
							<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
								<h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
									<Target className="w-6 h-6 text-blue-600" />
									{currentScenario.question}
								</h3>
								<p className="text-slate-600 italic">
									Consider both immediate impact and long-term consequences when
									deciding...
								</p>
							</div>
						</div>

						{/* Choices Grid */}
						<div className="grid grid-cols-1 gap-4 mb-8">
							{currentScenario.choices.map((choice, index) => {
								const isSelected = selectedChoiceIndex === index;
								const isCorrect = index === currentScenario.idealChoiceIndex;
								const showResult = isAnswered && isSelected;

								return (
									<motion.button
										key={index}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										whileHover={{ scale: isAnswered ? 1 : 1.02 }}
										whileTap={{ scale: isAnswered ? 1 : 0.98 }}
										onClick={() => handleChoiceSelect(index)}
										disabled={isAnswered}
										className={`
                      relative p-5 text-left rounded-xl border-2 transition-all duration-300
                      ${
												isAnswered && isCorrect
													? 'border-emerald-500 bg-emerald-50 shadow-lg'
													: ''
											}
                      ${
												showResult && !isCorrect
													? 'border-rose-500 bg-rose-50'
													: ''
											}
                      ${
												isSelected && !isCorrect
													? 'border-rose-500 bg-rose-50'
													: ''
											}
                      ${
												!isSelected && !isAnswered
													? 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
													: ''
											}
                      ${
												isSelected && isCorrect
													? 'border-emerald-500 bg-emerald-50'
													: ''
											}
                    `}
									>
										<div className="flex items-start gap-3">
											<div
												className={`
                        w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0
                        ${
													isSelected
														? isCorrect
															? 'bg-emerald-100 text-emerald-700'
															: 'bg-rose-100 text-rose-700'
														: 'bg-slate-100 text-slate-700'
												}
                      `}
											>
												{String.fromCharCode(65 + index)}
											</div>
											<div className="flex-1">
												<p
													className={`font-medium mb-2 ${
														isSelected
															? isCorrect
																? 'text-emerald-800'
																: 'text-rose-800'
															: 'text-slate-800'
													}`}
												>
													{choice.text}
												</p>

												{/* Choice Metadata */}
												<div className="flex flex-wrap gap-2 mt-3">
													<span
														className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                            ${
															choice.reasoningType === 'ethical'
																? 'bg-purple-100 text-purple-800'
																: ''
														}
                            ${
															choice.reasoningType === 'practical'
																? 'bg-blue-100 text-blue-800'
																: ''
														}
                            ${
															choice.reasoningType === 'legal'
																? 'bg-amber-100 text-amber-800'
																: ''
														}
                            ${
															choice.reasoningType === 'community-focused'
																? 'bg-green-100 text-green-800'
																: ''
														}
                          `}
													>
														{choice.reasoningType === 'ethical' && (
															<Heart className="w-3 h-3" />
														)}
														{choice.reasoningType === 'practical' && (
															<Zap className="w-3 h-3" />
														)}
														{choice.reasoningType === 'legal' && (
															<Shield className="w-3 h-3" />
														)}
														{choice.reasoningType === 'community-focused' && (
															<Users className="w-3 h-3" />
														)}
														{choice.reasoningType}
													</span>

													<span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
														<TrendingUp className="w-3 h-3" />
														{choice.integrityScore}% integrity score
													</span>
												</div>
											</div>

											{showResult && (
												<motion.div
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													className={`${
														isCorrect ? 'text-emerald-500' : 'text-rose-500'
													}`}
												>
													{isCorrect ? (
														<CheckCircle className="w-6 h-6" />
													) : (
														<AlertCircle className="w-6 h-6" />
													)}
												</motion.div>
											)}
										</div>
									</motion.button>
								);
							})}
						</div>

						{/* Feedback Section */}
						<AnimatePresence>
							{isAnswered && selectedChoiceIndex !== null && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									className="mb-8"
								>
									<div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-200">
										<div className="flex items-start gap-4 mb-6">
											<div className="flex-shrink-0">
												<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
													<Lightbulb className="w-6 h-6 text-white" />
												</div>
											</div>
											<div className="flex-1">
												<h3 className="text-xl font-bold text-slate-900 mb-2">
													{selectedChoiceIndex ===
													currentScenario.idealChoiceIndex
														? 'Excellent Reasoning! ✨'
														: "Good Effort! Let's Review 📚"}
												</h3>

												{/* Consequence Analysis */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
													<div className="bg-white p-4 rounded-xl border border-slate-200">
														<h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
															<Zap className="w-4 h-4 text-amber-600" />
															Immediate Impact
														</h4>
														<p className="text-slate-700">
															{
																currentScenario.choices[selectedChoiceIndex]
																	.immediateImpact
															}
														</p>
													</div>
													<div className="bg-white p-4 rounded-xl border border-slate-200">
														<h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
															<TrendingUp className="w-4 h-4 text-emerald-600" />
															Long-term Impact
														</h4>
														<p className="text-slate-700">
															{
																currentScenario.choices[selectedChoiceIndex]
																	.longTermImpact
															}
														</p>
													</div>
												</div>

												{/* Ideal Choice Explanation */}
												{selectedChoiceIndex !==
													currentScenario.idealChoiceIndex && (
													<div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
														<h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
															<Star className="w-4 h-4 text-emerald-600" />
															The Ideal Approach
														</h4>
														<p className="text-emerald-800">
															{
																currentScenario.choices[
																	currentScenario.idealChoiceIndex
																].text
															}
														</p>
														<p className="text-emerald-700 text-sm mt-2">
															This approach scores{' '}
															{
																currentScenario.choices[
																	currentScenario.idealChoiceIndex
																].integrityScore
															}
															% on integrity because it prioritizes systemic
															change over short-term gains.
														</p>
													</div>
												)}

												{/* Framework Explanation */}
												<div className="space-y-4">
													<div>
														<h4 className="font-semibold text-slate-900 mb-2">
															Ethical Framework
														</h4>
														<p className="text-slate-700">
															{currentScenario.explanation.ethicalFramework}
														</p>
													</div>
													<div>
														<h4 className="font-semibold text-slate-900 mb-2">
															Real World Example
														</h4>
														<p className="text-slate-700">
															{currentScenario.explanation.realWorldExample}
														</p>
													</div>
													<div>
														<h4 className="font-semibold text-slate-900 mb-2">
															Youth Connection
														</h4>
														<p className="text-slate-700">
															{currentScenario.explanation.youthConnection}
														</p>
													</div>
													<div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
														<h4 className="font-semibold text-slate-900 mb-2">
															Key Takeaway
														</h4>
														<p className="text-slate-800 font-medium">
															{currentScenario.explanation.keyTakeaway}
														</p>
													</div>
												</div>
											</div>
										</div>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-3">
											<button
												onClick={() => setShowInsights(!showInsights)}
												className="flex-1 py-3 px-4 border-2 border-blue-200 text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors"
											>
												{showInsights
													? 'Hide Insights'
													: 'Show My Learning Pattern'}
											</button>
											<button
												onClick={handleNextScenario}
												className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
											>
												{currentScenarioIndex < scenarios.length - 1 ? (
													<>
														Next Scenario
														<ChevronRight className="w-5 h-5" />
													</>
												) : (
													<>
														Complete Assessment
														<Award className="w-5 h-5" />
													</>
												)}
											</button>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Learning Insights */}
						<AnimatePresence>
							{showInsights && isAnswered && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									className="mb-8 overflow-hidden"
								>
									<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
										<h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
											<Brain className="w-6 h-6 text-purple-600" />
											Your Emerging Learning Pattern
										</h3>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{/* Learning Style Radar */}
											<div className="bg-white p-4 rounded-xl border border-slate-200">
												<h4 className="font-semibold text-slate-900 mb-4">
													Learning Style Preferences
												</h4>
												<div className="space-y-3">
													{[
														{
															label: 'Visual',
															value: learningProfile.visual,
															color: 'bg-blue-500',
														},
														{
															label: 'Auditory',
															value: learningProfile.auditory,
															color: 'bg-green-500',
														},
														{
															label: 'Kinesthetic',
															value: learningProfile.kinesthetic,
															color: 'bg-amber-500',
														},
														{
															label: 'Conceptual',
															value: learningProfile.conceptual,
															color: 'bg-purple-500',
														},
													].map((style) => (
														<div key={style.label}>
															<div className="flex justify-between text-sm text-slate-600 mb-1">
																<span>{style.label}</span>
																<span>{style.value}%</span>
															</div>
															<div className="h-2 bg-slate-200 rounded-full overflow-hidden">
																<div
																	className={`h-full ${style.color} rounded-full transition-all duration-500`}
																	style={{ width: `${style.value}%` }}
																/>
															</div>
														</div>
													))}
												</div>
											</div>

											{/* Decision Patterns */}
											<div className="bg-white p-4 rounded-xl border border-slate-200">
												<h4 className="font-semibold text-slate-900 mb-4">
													Decision Patterns
												</h4>
												<div className="space-y-3">
													<div>
														<div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
															<Compass className="w-4 h-4" />
															<span>
																Tends toward:{' '}
																<strong className="text-slate-900">
																	{learningProfile.decisionPatterns.tendsToward}
																</strong>{' '}
																reasoning
															</span>
														</div>
													</div>
													<div>
														<div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
															<Clock className="w-4 h-4" />
															<span>
																Reaction time:{' '}
																<strong className="text-slate-900">
																	{
																		learningProfile.decisionPatterns
																			.reactionTime
																	}
																</strong>
															</span>
														</div>
													</div>
													<div>
														<div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
															<TargetIcon className="w-4 h-4" />
															<span>
																Confidence level:{' '}
																{
																	learningProfile.decisionPatterns
																		.confidenceLevel
																}
																%
															</span>
														</div>
														<div className="h-2 bg-slate-200 rounded-full overflow-hidden">
															<div
																className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
																style={{
																	width: `${learningProfile.decisionPatterns.confidenceLevel}%`,
																}}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="mt-4 text-sm text-slate-600">
											<p>
												<span className="font-medium">Insight:</span> Based on
												your choices, you're developing a{' '}
												<strong>
													{learningProfile.decisionPatterns.tendsToward}
												</strong>{' '}
												approach to integrity dilemmas, with a preference for{' '}
												<strong>
													{getLearningStyleDescription(
														Object.keys({
															visual: learningProfile.visual,
															auditory: learningProfile.auditory,
															kinesthetic: learningProfile.kinesthetic,
															conceptual: learningProfile.conceptual,
														}).reduce((a, b) =>
															learningProfile[
																a as keyof typeof learningProfile
															] >
															learningProfile[b as keyof typeof learningProfile]
																? a
																: b
														)
													)}
												</strong>
											</p>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</>
				) : (
					/* Assessment Complete - Results Page */
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="text-center"
					>
						<div className="max-w-3xl mx-auto">
							{/* Celebration Header */}
							<div className="mb-10">
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', stiffness: 260, damping: 20 }}
									className="inline-block mb-6"
								>
									<div className="relative">
										<div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur-2xl opacity-50" />
										<div className="relative bg-white p-6 rounded-full shadow-2xl">
											<Award className="w-16 h-16 text-amber-500" />
										</div>
									</div>
								</motion.div>

								<h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-600 bg-clip-text text-transparent mb-4">
									Assessment Complete! 🎉
								</h2>
								<p className="text-lg text-slate-600">
									You've successfully navigated {scenarios.length} complex
									integrity scenarios. Here's your personalized learning
									profile:
								</p>
							</div>

							{/* Results Dashboard */}
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
												description:
													'Learn through doing and hands-on experiences',
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
												{learningProfile.decisionPatterns.tendsToward}{' '}
												perspective
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
												Average reasoning time:{' '}
												{averageReasoningTime.toFixed(1)} seconds per scenario
											</p>
										</div>

										<div>
											<div className="flex items-center justify-between mb-2">
												<span className="text-slate-700">
													Integrity Confidence
												</span>
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

							{/* Strengths & Growth Areas */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
								{/* Strengths */}
								<div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
									<h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
										<Sparkles className="w-6 h-6 text-emerald-600" />
										Your Strengths
									</h3>
									<div className="space-y-3">
										{learningProfile.strengths.length > 0 ? (
											learningProfile.strengths.map((strength, index) => (
												<div key={index} className="flex items-start gap-3">
													<CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
													<span className="text-slate-800">{strength}</span>
												</div>
											))
										) : (
											<div className="flex items-start gap-3">
												<CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
												<span className="text-slate-800">
													Strong ethical reasoning abilities
												</span>
											</div>
										)}
									</div>
								</div>

								{/* Growth Areas */}
								<div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
									<h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
										<TrendingUp className="w-6 h-6 text-blue-600" />
										Areas for Growth
									</h3>
									<div className="space-y-3">
										{learningProfile.growthAreas.length > 0 ? (
											learningProfile.growthAreas.map((area, index) => (
												<div key={index} className="flex items-start gap-3">
													<Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
													<span className="text-slate-800">{area}</span>
												</div>
											))
										) : (
											<div className="flex items-start gap-3">
												<Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
												<span className="text-slate-800">
													Balancing different reasoning approaches
												</span>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Personalized Recommendations */}
							<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 mb-8">
								<h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
									<Compass className="w-6 h-6 text-purple-600" />
									Your Personalized Learning Path
								</h3>
								<div className="space-y-4">
									<p className="text-slate-700">
										Based on your profile, we recommend focusing on:
									</p>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="bg-white p-4 rounded-xl border">
											<h4 className="font-semibold text-slate-900 mb-2">
												Recommended Learning Formats
											</h4>
											<ul className="space-y-2 text-sm text-slate-600">
												{learningProfile.visual > 70 && (
													<li>• Visual case studies and infographics</li>
												)}
												{learningProfile.auditory > 70 && (
													<li>• Podcast discussions and debates</li>
												)}
												{learningProfile.kinesthetic > 70 && (
													<li>• Role-playing scenarios and simulations</li>
												)}
												{learningProfile.conceptual > 70 && (
													<li>• Systems thinking frameworks</li>
												)}
											</ul>
										</div>
										<div className="bg-white p-4 rounded-xl border">
											<h4 className="font-semibold text-slate-900 mb-2">
												Development Focus
											</h4>
											<ul className="space-y-2 text-sm text-slate-600">
												<li>
													• Practice balancing different reasoning approaches
												</li>
												<li>• Explore real-world integrity case studies</li>
												<li>• Connect with peers for collaborative learning</li>
												<li>• Apply learning to your specific context</li>
											</ul>
										</div>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-4">
								<button
									onClick={resetAssessment}
									className="flex-1 py-4 px-6 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
								>
									<RefreshCw className="w-5 h-5" />
									Retake Assessment
								</button>
								<button
									onClick={() => (window.location.href = '/flashcards')}
									className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
								>
									Continue to Flashcards
									<ChevronRight className="w-5 h-5" />
								</button>
							</div>

							{/* Final Message */}
							<div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
								<p className="text-slate-700 italic text-center">
									"Remember, understanding how you think about integrity
									dilemmas is the first step toward becoming a more effective
									change-maker. Your unique perspective is valuable in the fight
									against corruption. Keep learning, keep questioning, and keep
									making ethical choices! 🌟"
								</p>
								<p className="text-center text-slate-600 mt-4 font-medium">
									- Your Integrity Reasoning Lab Team
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default CharacterAssessment;
