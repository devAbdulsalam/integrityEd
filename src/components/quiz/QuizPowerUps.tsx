import { motion } from "framer-motion";
import { Clock, Shuffle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PowerUp {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  uses: number;
}

interface QuizPowerUpsProps {
  powerUps: PowerUp[];
  onUsePowerUp: (id: string) => void;
  disabled: boolean;
}

const QuizPowerUps = ({ powerUps, onUsePowerUp, disabled }: QuizPowerUpsProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Power-ups:</span>
        {powerUps.map((powerUp) => (
          <Tooltip key={powerUp.id}>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUsePowerUp(powerUp.id)}
                  disabled={disabled || powerUp.uses === 0}
                  className={`relative h-10 w-10 p-0 ${
                    powerUp.uses === 0 ? "opacity-40" : "hover:bg-primary/10"
                  }`}
                >
                  {powerUp.icon}
                  {powerUp.uses > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                      {powerUp.uses}
                    </span>
                  )}
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{powerUp.name}</p>
              <p className="text-xs text-muted-foreground">{powerUp.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export const defaultPowerUps: PowerUp[] = [
  {
    id: "extraTime",
    name: "Extra Time",
    icon: <Clock className="w-4 h-4" />,
    description: "Add 10 seconds to the timer",
    uses: 2,
  },
  {
    id: "fiftyFifty",
    name: "50/50",
    icon: <Shuffle className="w-4 h-4" />,
    description: "Remove two wrong answers",
    uses: 1,
  },
  {
    id: "hint",
    name: "Hint",
    icon: <Lightbulb className="w-4 h-4" />,
    description: "Get a helpful hint",
    uses: 1,
  },
];

export default QuizPowerUps;
