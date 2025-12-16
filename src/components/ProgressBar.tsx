import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
}

export const ProgressBar = ({ value, max = 100, className, label }: ProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <div className="w-full h-2 bg-progress-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
