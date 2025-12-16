import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import UsernameStep from '@/components/onboarding/UsernameStep';
import AgeRangeStep from '@/components/onboarding/AgeRangeStep';
import LearningStyleStep from '@/components/onboarding/LearningStyleStep';
import AvatarStep from '@/components/onboarding/AvatarStep';
import Preloader from '@/components/Preloader';

interface OnboardingData {
	username: string;
	ageRange: string;
	learningStyle: string;
	learningType: string;
	learningGuide: string;
	avatar: string;
	progress: number;
	reward: number;
}

const Onboarding = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [data, setData] = useState<OnboardingData>({
		username: '',
		ageRange: '',
		learningStyle: '',
		learningType: '',
		learningGuide: '',
		avatar: '',
		progress: 0,
		reward: 0,
	});

	const totalSteps = 4;

	const updateData = (key: keyof OnboardingData, value: string) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};
	const [showPreloader, setShowPreloader] = useState(false);

	const handleComplete = () => {
		// Store onboarding data in localStorage
		localStorage.setItem('onboarding_completed', 'true');
		localStorage.setItem('user_profile', JSON.stringify(data));
		setShowPreloader(true);
		setTimeout(() => {
			setShowPreloader(false);
			navigate('/module/1');
		}, 5000);
	};

	// 🔹 Render preloader first
	if (showPreloader) {
		return (
			<Preloader
				showPreloader={showPreloader}
				setShowPreloader={setShowPreloader}
				title="Loading your learning journey…"
				time={5000}
				descriptions={[
					'Generating modules…',
					'Almost there…',
					'Almost there…',
					'Modules generated…',
				]}
			/>
		);
	}

	return (
		<OnboardingLayout step={step} totalSteps={totalSteps}>
			{step === 0 && (
				<UsernameStep
					value={data.username}
					onChange={(value) => updateData('username', value)}
					onNext={() => setStep(1)}
				/>
			)}
			{step === 1 && (
				<AgeRangeStep
					value={data.ageRange}
					onChange={(value) => updateData('ageRange', value)}
					onNext={() => setStep(2)}
					onBack={() => setStep(0)}
				/>
			)}
			{step === 2 && (
				<LearningStyleStep
					value={data.learningStyle}
					onChange={(value) => updateData('learningStyle', value)}
					learningType={data.learningType}
					onTextChange={(value) => updateData('learningType', value)}
					onNext={() => setStep(3)}
					onBack={() => setStep(1)}
				/>
			)}
			{step === 3 && (
				<AvatarStep
					value={data.avatar}
					onChange={(value) => updateData('avatar', value)}
					learningGuide={data.learningGuide}
					onTextChange={(value) => updateData('learningGuide', value)}
					onComplete={handleComplete}
					onBack={() => setStep(2)}
				/>
			)}
		</OnboardingLayout>
	);
};

export default Onboarding;
