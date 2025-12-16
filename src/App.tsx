import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from './pages/Home';
import Modules from './pages/Modules';
import Module from './pages/Module';
import Quiz from './pages/Quiz';
import QuizResults from './pages/QuizResults';
import LearningPreferences from './pages/LearningPreferences';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import Glossary from './pages/Glossary';
import AiTutor from './pages/AiTutor';
import FlashcardQuiz from './pages/FlashCard';
import CharacterAssessment from './pages/CharacterAssessment';
import LearningPattern from './pages/LearningPattern';
import { useEffect } from 'react';
import { ModuleProvider } from '@/context/ModuleContext';

const queryClient = new QueryClient();

// Check if onboarding is completed
const OnboardingCheck = ({ children }: { children: React.ReactNode }) => {
	const isOnboardingCompleted =
		localStorage.getItem('onboarding_completed') === 'true';

	if (!isOnboardingCompleted) {
		return <Navigate to="/onboarding" replace />;
	}

	return <>{children}</>;
};




const App = () => (
	<ModuleProvider>
	<ThemeProvider>
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/onboarding" element={<Onboarding />} />
						<Route
							path="/index"
							element={
								<OnboardingCheck>
									<Home />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/modules"
							element={
								<OnboardingCheck>
									<Modules />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/module/:id"
							element={
								<OnboardingCheck>
									<Module />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/flashcard/:id"
							element={
								<OnboardingCheck>
									<FlashcardQuiz />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/quiz/:id"
							element={
								<OnboardingCheck>
									<Quiz />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/quiz-results"
							element={
								<OnboardingCheck>
									<QuizResults />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/learning-preferences"
							element={
								<OnboardingCheck>
									<LearningPreferences />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/learning-pattern"
							element={
								<OnboardingCheck>
									<LearningPattern />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/rewards"
							element={
								<OnboardingCheck>
									<Rewards />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/profile"
							element={
								<OnboardingCheck>
									<Profile />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/characters/assessment"
							element={
								<OnboardingCheck>
									<CharacterAssessment />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/glossary"
							element={
								<OnboardingCheck>
									<Glossary />
								</OnboardingCheck>
							}
						/>
						<Route
							path="/ai-tutor"
							element={
								<OnboardingCheck>
									<AiTutor />
								</OnboardingCheck>
							}
						/>
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
		</ThemeProvider>
	</ModuleProvider>
);

export default App;
