import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

interface QuizFeedbackProps {
  show: boolean;
  isCorrect: boolean;
  pointsEarned: number;
  streakBonus: number;
  explanation?: string;
  onContinue: () => void;
}

const QuizFeedback = ({
  show,
  isCorrect,
  pointsEarned,
  streakBonus,
  explanation,
  onContinue,
}: QuizFeedbackProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onContinue}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className={`relative p-8 rounded-2xl max-w-sm mx-4 text-center ${
              isCorrect
                ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50"
                : "bg-gradient-to-br from-red-500/20 to-rose-500/20 border-2 border-red-500/50"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating particles for correct answers */}
            {isCorrect && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                ))}
              </>
            )}

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, delay: 0.1 }}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-20 h-20 mx-auto text-green-500" />
              ) : (
                <XCircle className="w-20 h-20 mx-auto text-red-500" />
              )}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-2xl font-bold mt-4 ${
                isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {isCorrect ? "Correct!" : "Not Quite!"}
            </motion.h2>

            {isCorrect && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 space-y-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-foreground">+{pointsEarned} points</span>
                  {streakBonus > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-sm font-bold"
                    >
                      +{streakBonus} streak bonus!
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )}

            {!isCorrect && explanation && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                {explanation}
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-xs text-muted-foreground"
            >
              Tap anywhere to continue
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizFeedback;
