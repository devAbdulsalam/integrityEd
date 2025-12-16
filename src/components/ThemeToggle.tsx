import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
	className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={cn(
				'relative flex items-center justify-between w-16 h-8 rounded-full p-1 transition-colors duration-300',
				theme === 'dark' ? 'bg-secondary' : 'bg-primary/20',
				className
			)}
			aria-label="Toggle theme"
		>
			<Sun
				className={cn(
					'w-5 h-5 transition-all duration-300 z-10',
					theme === 'light' ? 'text-primary' : 'text-muted-foreground'
				)}
			/>
			<Moon
				className={cn(
					'w-5 h-5 transition-all duration-300 z-10',
					theme === 'dark' ? 'text-primary' : 'text-muted-foreground'
				)}
			/>
			<span
				className={cn(
					'absolute w-6 h-6 rounded-full bg-card shadow-md transition-all duration-300',
					theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
				)}
			/>
		</button>
	);
};
