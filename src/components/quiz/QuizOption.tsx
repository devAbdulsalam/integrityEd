import { motion } from "framer-motion";

interface QuizOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  isDisabled: boolean;
  isEliminated: boolean;
  onClick: () => void;
}

const QuizOption = ({
  option,
  index,
  isSelected,
  isDisabled,
  isEliminated,
  onClick,
}: QuizOptionProps) => {
  const letters = ["A", "B", "C", "D"];

  if (isEliminated) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.3, scale: 0.98 }}
        className="w-full p-4 rounded-lg border-2 border-dashed border-muted bg-muted/20 cursor-not-allowed"
      >
        <span className="text-muted-foreground line-through">{option}</span>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full p-4 text-left rounded-lg border-2 transition-all flex items-center gap-3 ${
        isSelected
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
          : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
      } ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {letters[index]}
      </span>
      <span className="text-foreground">{option}</span>
    </motion.button>
  );
};

export default QuizOption;
