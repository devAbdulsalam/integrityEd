import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';
import {
	Award,
	BookOpen,
	TrendingUp,
	LogOutIcon,
	Settings,
	ChevronRight,
	Palette,
	Gift,
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModules } from '@/context/ModuleContext';
import { calculateTotalProgress, getAllModulesByMode, getCompletedModulesLenght } from '@/data/module';

interface UserProfile {
	username: string;
	ageRange: string;
	learningStyle: string;
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

const Profile = () => {
	const navigate = useNavigate();
	const { modules } = useModules();
	const [userData, setUserData] = React.useState<UserProfile | null>(null);
	const completedModules = getCompletedModulesLenght(modules);
	const allModules = getAllModulesByMode('easy', modules);
	const modulesProgress = calculateTotalProgress('easy', modules);
	console.log('modulesProgress', modulesProgress);


	React.useEffect(() => {
		const storedData = localStorage.getItem('user_profile');
		if (storedData) {
			const user: UserProfile = JSON.parse(storedData);
			setUserData(user);
		}
	}, []);

	const handleLogOut = () => {
		localStorage.removeItem('onboarding_completed');
		localStorage.removeItem('user_profile');
		localStorage.removeItem('learning_preferences');
		localStorage.removeItem('modules');
		window.location.href = '/';
	};

	const getAvatarEmoji = (avatarId: string) => {
		const avatar = avatarOptions.find((a) => a.id === avatarId);
		return avatar?.emoji || '👤';
	};

	const getLearningStyleLabel = (style: string) => {
		const styles: Record<string, string> = {
			visual: 'Visual Learner',
			auditory: 'Auditory Learner',
			reading: 'Reading/Writing',
			kinesthetic: 'Kinesthetic Learner',
		};
		return styles[style] || 'Visual Learner';
	};

	return (
		<div className="min-h-screen bg-background pb-20">
			<div className="max-w-md mx-auto p-6 space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
					<p className="text-muted-foreground">
						Track your learning progress and achievements
					</p>
				</div>

				<Card className="p-6 bg-card border-border">
					<div className="flex items-center gap-4">
						<div className="p-4 bg-primary/10 rounded-full text-4xl">
							{userData ? getAvatarEmoji(userData.avatar) : '👤'}
						</div>
						<div>
							<h2 className="text-xl font-bold text-foreground">
								{userData?.username || 'Learner'}
							</h2>
							<p className="text-sm text-muted-foreground">
								{userData
									? getLearningStyleLabel(userData.learningStyle)
									: 'Member since 2025'}
							</p>
						</div>
					</div>
				</Card>

				<div className="grid grid-cols-2 gap-3">
					<Card className="p-4 bg-secondary/50 border-border/50">
						<BookOpen className="w-6 h-6 text-primary mb-2" />
						<p className="text-2xl font-bold text-foreground">
							{completedModules}/{allModules.length}
						</p>
						<p className="text-sm text-muted-foreground">Modules Completed</p>
					</Card>
					<Card className="p-4 bg-secondary/50 border-border/50">
						<Award className="w-6 h-6 text-primary mb-2" />
						<p className="text-2xl font-bold text-foreground">
							{userData?.reward || 0}
						</p>
						<p className="text-sm text-muted-foreground">KNTs Earned</p>
					</Card>
				</div>

				<div className="space-y-3">
					<h2 className="text-lg font-semibold text-foreground">
						Learning Stats
					</h2>
					<Card
						onClick={() => navigate('/modules')}
						className="p-4 bg-secondary/30 border-border/50"
					>
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm text-muted-foreground">
								Overall Progress
							</span>
							<span className="text-sm font-semibold text-foreground">
								{modulesProgress}%
							</span>
						</div>
						<div className="w-full h-2 bg-progress-bg rounded-full overflow-hidden">
							<div
								className="h-full bg-primary transition-all duration-500"
								style={{ width:  `${modulesProgress}%` || '10%' }}
							/>
						</div>
					</Card>
					<Card className="p-4 bg-secondary/30 border-border/50">
						<div className="flex items-center gap-3">
							<TrendingUp className="w-5 h-5 text-primary" />
							<div>
								<p className="font-medium text-foreground">Learning Streak</p>
								<p className="text-sm text-muted-foreground">
									Start learning to build your streak
								</p>
							</div>
						</div>
					</Card>
				</div>

				<div className="space-y-3">
					<h2 className="text-lg font-semibold text-foreground">Settings</h2>

					<Card className="p-4 bg-secondary/30 border-border/50">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Palette className="w-5 h-5 text-primary" />
								<div>
									<p className="font-medium text-foreground">Appearance</p>
									<p className="text-sm text-muted-foreground">
										Switch between light and dark mode
									</p>
								</div>
							</div>
							<ThemeToggle />
						</div>
					</Card>

					<Card
						onClick={() => navigate('/rewards')}
						className="p-4 bg-secondary/30 border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Gift className="w-5 h-5 text-primary" />
								<div>
									<p className="font-medium text-foreground">Rewards</p>
									<p className="text-sm text-muted-foreground">
										View and redeem your Knowledge Tokens
									</p>
								</div>
							</div>
							<ChevronRight className="w-5 h-5 text-muted-foreground" />
						</div>
					</Card>
					<Card
						onClick={() => navigate('/learning-preferences')}
						className="p-4 bg-secondary/30 border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Settings className="w-5 h-5 text-primary" />
								<div>
									<p className="font-medium text-foreground">
										Learning Preferences
									</p>
									<p className="text-sm text-muted-foreground">
										Customize your learning experience
									</p>
								</div>
							</div>
							<ChevronRight className="w-5 h-5 text-muted-foreground" />
						</div>
					</Card>

					<Card
						onClick={handleLogOut}
						className="p-4 bg-destructive/10 border-border/50 cursor-pointer hover:bg-destructive/20 transition-colors"
					>
						<div className="flex items-center gap-3">
							<LogOutIcon className="w-5 h-5 text-destructive" />
							<div>
								<p className="font-medium text-foreground">Logout</p>
								<p className="text-sm text-muted-foreground">
									See you next time!
								</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
			<BottomNav />
		</div>
	);
};

export default Profile;
