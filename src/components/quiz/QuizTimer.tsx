import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  timeLeft: number;
  maxTime: number;
  onTimeUp: () => void;
  isPaused: boolean;
}

const QuizTimer = ({ timeLeft, maxTime, onTimeUp, isPaused }: QuizTimerProps) => {
  const percentage = (timeLeft / maxTime) * 100;
  const isLow = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  useEffect(() => {
    if (timeLeft === 0 && !isPaused) {
      onTimeUp();
    }
  }, [timeLeft, isPaused, onTimeUp]);

  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={isCritical ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isCritical
            ? "bg-destructive/20 text-destructive"
            : isLow
            ? "bg-warning/20 text-warning"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Clock className="w-4 h-4" />
        <span className="font-bold tabular-nums">{timeLeft}s</span>
      </motion.div>
      
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            isCritical
              ? "bg-destructive"
              : isLow
              ? "bg-warning"
              : "bg-primary"
          }`}
          initial={{ width: "100%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default QuizTimer;
