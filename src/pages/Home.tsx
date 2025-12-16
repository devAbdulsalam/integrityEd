import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/BottomNav';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { BookOpen, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '@/components/ProgressBar';
import { getModule, getAllModuleIds, getModuleSet, getModulesByMode } from '@/data/module';
import React from 'react';

interface UserProfile {
	username: string;
	ageRange: string;
	learningStyle: string;
	learningOptions: string;
	avatar: string;
	progress: number;
	reward: number;
}

const avatarOptions = [
	{ id: 'scholar', emoji: '🎓', label: 'Scholar' },
	{ id: 'detective', emoji: '🔍', label: 'Detective' },
	{ id: 'guardian', emoji: '🛡️', label: 'Guardian' },
	{ id: 'innovator', emoji: '💡', label: 'Innovator' },
];

const Home = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = React.useState<UserProfile | null>(null);

	React.useEffect(() => {
		const storedData = localStorage.getItem('user_profile');
		if (storedData) {
			const user: UserProfile = JSON.parse(storedData);
			setUserData(user);
		}
	}, []);

	const getAvatarEmoji = (avatarId: string) => {
		const avatar = avatarOptions.find((a) => a.id === avatarId);
		return avatar?.emoji || '👤';
	};
	const module = getModule('module1', 'easy');
	const modules = getModulesByMode('easy');
	const activeModules = getModulesByMode('easy');
	const isVisualLearner = userData?.learningStyle === 'visual';
	console.log(activeModules);
	// console.log(moduleset);

	return (
		<div className="min-h-screen bg-background pb-20">
			{/* Header with Hamburger Menu */}
			<div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
				<div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
					<HamburgerMenu />
					<h1 className="font-semibold text-foreground">
						Anti-Corruption Academy
					</h1>
					<div className="w-10" /> {/* Spacer for balance */}
				</div>
			</div>

			<div className="max-w-md mx-auto p-6 space-y-6">
				{/* User Profile Header */}
				<div className="flex items-center gap-4">
					<div className="p-3 bg-primary/10 rounded-full text-3xl">
						{userData ? getAvatarEmoji(userData.avatar) : '👤'}
					</div>
					<div className="flex-1">
						<h1 className="text-2xl font-bold text-foreground">
							Welcome, {userData?.username || 'Learner'}!
						</h1>
						<p className="text-sm text-muted-foreground">
							Ready to continue your anti-corruption journey?
						</p>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-3 gap-3">
					<Card className="p-4 bg-secondary/50 border-border/50 text-center">
						<BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
						<p className="text-2xl font-bold text-foreground">
							{modules.length}
						</p>
						<p className="text-xs text-muted-foreground">Modules</p>
					</Card>
					<Card className="p-4 bg-secondary/50 border-border/50 text-center">
						<Award className="w-6 h-6 text-primary mx-auto mb-2" />
						<p className="text-2xl font-bold text-foreground">
							{userData?.reward || 0}
						</p>
						<p className="text-xs text-muted-foreground">KNT Token</p>
					</Card>
					<Card className="p-4 bg-secondary/50 border-border/50 text-center">
						<TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
						<p className="text-2xl font-bold text-foreground">
							{userData?.progress || 0}%
						</p>
						<p className="text-xs text-muted-foreground">Progress</p>
					</Card>
				</div>

				{/* Learning Module */}
				<div className="space-y-3">
					<h3 className="text-lg font-semibold text-foreground">
						Continue Learning
					</h3>

					<Card className="p-6 bg-card border-border overflow-hidden">
						<div className="space-y-4">
							{isVisualLearner && (
								<div className="relative -mx-6 -mt-6 mb-4">
									<img
										src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop"
										alt="Understanding Corruption - Visual Learning"
										className="w-full h-40 object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
								</div>
							)}
							<div>
								<p className="text-sm text-muted-foreground mb-1">
									Module 1 of {modules.length}
								</p>
								<h2 className="text-xl font-bold text-foreground">
									{module.title}
								</h2>
								<p className="text-sm text-muted-foreground mt-1">
									{module.description}
								</p>
							</div>
							<ProgressBar
								value={module?.progress || 0}
								label="Module Progress"
							/>
							<Button
								onClick={() => navigate('/module/1')}
								className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
							>
								Start Learning
							</Button>
						</div>
					</Card>
				</div>

				{/* Recommended For You */}
				{isVisualLearner && (
					<div className="space-y-3">
						<h3 className="text-lg font-semibold text-foreground">
							Recommended For You
						</h3>
						<div className="flex gap-3 overflow-x-auto pb-2">
							{modules.map((module) => (
								<Card className="min-w-[200px] bg-card border-border overflow-hidden">
									<img
										src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=120&fit=crop"
										alt={module.title}
										className="w-full h-24 object-cover"
									/>
									<div className="p-3">
										<p className="font-medium text-foreground text-sm">
											Module: {module.id + 1}
										</p>
										<p className="text-xs text-muted-foreground">
											{module.title}
										</p>
									</div>
								</Card>
							))}
						</div>
					</div>
				)}
			</div>
			<BottomNav />
		</div>
	);
};

export default Home;
