import { ReactNode } from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
	icon: ReactNode;
	title: string;
	description: string;
	className?: string;
}

export const ModuleCard = ({
	icon,
	title,
	description,
	className,
}: ModuleCardProps) => {
	const navigate = useNavigate();
	return (
		<Card
			onClick={() => navigate('/glossary')}
			className={cn(
				'p-4 bg-secondary/50 border-border/50 hover:border-primary/50 transition-all',
				className
			)}
		>
			<div className="flex gap-4 items-start">
				<div className="p-3 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
					{icon}
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-foreground mb-1">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</Card>
	);
};
