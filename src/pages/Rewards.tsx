import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Award, Gift } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import tokenLogo from '@/assets/token.jpg';
interface UserProfile {
	username: string;
	ageRange: string;
	learningStyle: string;
	avatar: string;
	progress: number;
	reward: number;
}
const Rewards = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = React.useState<UserProfile | null>(null);
	React.useEffect(() => {
		const storedData = localStorage.getItem('user_profile');
		if (storedData) {
			const user: UserProfile = JSON.parse(storedData);
			setUserData(user);
		}
	}, []);
	return (
		<div className="min-h-screen bg-background pb-20">
			<div className="max-w-md mx-auto p-6 space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<button onClick={() => navigate(-1)}>
						<ArrowLeft className="w-6 h-6 text-foreground" />
					</button>
					<h1 className="text-xl font-bold text-foreground">Rewards</h1>
					<div></div>
				</div>

				<div>
					<h1 className="text-3xl font-bold text-foreground mb-2"></h1>
					<p className="text-muted-foreground">
						Earn Knowledge Tokens by completing modules and quizzes
					</p>
				</div>

				<Card className="p-6 bg-card border-border">
					<div className="text-center space-y-4">
						<div className="p-o.5 bg-primary/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
							<img src={tokenLogo} className="w-18 h-18 rounded-full" />
						</div>
						<div>
							<p className="text-4xl font-bold text-foreground mb-2">
								{userData?.reward || 0}
							</p>
							<p className="text-muted-foreground">KNTs Earned</p>
						</div>
					</div>
				</Card>

				<div className="space-y-3">
					<h2 className="text-lg font-semibold text-foreground">
						How to Earn Rewards
					</h2>
					<Card className="p-4 bg-secondary/30 border-border/50">
						<div className="flex items-start gap-3">
							<Gift className="w-5 h-5 text-primary mt-0.5 shrink-0" />
							<div>
								<p className="font-medium text-foreground mb-1">
									Complete Modules
								</p>
								<p className="text-sm text-muted-foreground">
									Finish learning modules and pass quizzes with 70% or higher
								</p>
							</div>
						</div>
					</Card>
					<Card className="p-4 bg-secondary/30 border-border/50">
						<div className="flex items-start gap-3">
							<Award className="w-5 h-5 text-primary mt-0.5 shrink-0" />
							<div>
								<p className="font-medium text-foreground mb-1">
									Earn NFT Certificates
								</p>
								<p className="text-sm text-muted-foreground">
									Each completed module grants you a unique Knowledge Token NFT
								</p>
							</div>
						</div>
					</Card>
					<Card className="p-4 bg-secondary/30 border-border/50">
						<div className="flex items-start gap-3">
							<Award className="w-5 h-5 text-primary mt-0.5 shrink-0" />
							<div>
								<p className="font-medium text-foreground mb-1">
									Claim Your Tokens
								</p>
								<p className="text-sm text-muted-foreground">
									Redeem them for rewards
								</p>
							</div>
						</div>
					</Card>
				</div>

				<Card className="p-6 bg-primary/5 border-primary/20">
					<p className="text-sm text-center text-muted-foreground">
						Start your first module to earn your first Knowledge Token NFT!
					</p>
				</Card>
			</div>
			<BottomNav />
		</div>
	);
};

export default Rewards;
