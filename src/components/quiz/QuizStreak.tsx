import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap } from "lucide-react";

interface QuizStreakProps {
  streak: number;
  multiplier: number;
  points: number;
}

const QuizStreak = ({ streak, multiplier, points }: QuizStreakProps) => {
  return (
    <div className="flex items-center justify-between">
      <AnimatePresence mode="wait">
        {streak > 0 && (
          <motion.div
            key={streak}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [-5, 5, -5, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
            >
              <Flame className="w-4 h-4" />
              <span className="font-bold">{streak} Streak!</span>
            </motion.div>
            
            {multiplier > 1 && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm"
              >
                <Zap className="w-3 h-3" />
                {multiplier}x
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={points}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary"
      >
        <span className="text-sm text-muted-foreground">Points:</span>
        <span className="font-bold text-foreground">{points}</span>
      </motion.div>
    </div>
  );
};

export default QuizStreak;
