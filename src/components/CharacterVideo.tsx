import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Character, CharacterDialogue, getCharacterById } from "@/data/characters";
import { cn } from "@/lib/utils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface CharacterVideoProps {
  dialogues: CharacterDialogue[];
  onComplete?: () => void;
  autoPlay?: boolean;
  title?: string;
}

const CharacterAvatar = ({ 
  character, 
  animation,
  isActive,
  isSpeaking,
}: { 
  character: Character; 
  animation?: CharacterDialogue["animation"];
  isActive: boolean;
  isSpeaking: boolean;
}) => {
  const animationVariants = {
    wave: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: { duration: 1.5, repeat: Infinity, repeatDelay: 2 },
    },
    think: {
      y: [0, -5, 0],
      transition: { duration: 2, repeat: Infinity },
    },
    explain: {
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity },
    },
    celebrate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.8, repeat: Infinity },
    },
    question: {
      rotateZ: [0, -10, 10, 0],
      transition: { duration: 1.2, repeat: Infinity },
    },
    speaking: {
      scale: [1, 1.08, 1],
      transition: { duration: 0.4, repeat: Infinity },
    },
  };

  const activeAnimation = isSpeaking ? 'speaking' : animation;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1 : 0.85, 
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative flex flex-col items-center",
        isActive && "z-10"
      )}
    >
      <motion.div
        animate={isActive && activeAnimation ? animationVariants[activeAnimation] : {}}
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center text-4xl",
          "bg-gradient-to-br shadow-lg",
          character.bgGradient,
          isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          isSpeaking && "ring-4 ring-primary/50"
        )}
      >
        {character.emoji}
      </motion.div>
      <span className={cn(
        "mt-2 text-xs font-medium text-center",
        isActive ? character.color : "text-muted-foreground"
      )}>
        {character.name.split(" ")[0]}
      </span>
      {isSpeaking && (
        <motion.div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const CharacterVideo = ({ dialogues, onComplete, autoPlay = false, title }: CharacterVideoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const currentDialogue = dialogues[currentIndex];
  const currentCharacter = getCharacterById(currentDialogue?.characterId);

  const handleAudioEnd = useCallback(() => {
    // Audio finished, ready for next
  }, []);

  const { speak, stop, isLoading: isLoadingAudio, isPlaying: isAudioPlaying } = useTextToSpeech({
    onEnd: handleAudioEnd,
  });

  // Typewriter effect with TTS
  useEffect(() => {
    if (!currentDialogue || !isPlaying) return;

    setIsTyping(true);
    setDisplayedText("");
    
    const text = currentDialogue.text;
    let index = 0;
    
    // Start TTS if audio is enabled
    if (audioEnabled) {
      speak(text, currentDialogue.characterId);
    }
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);

    return () => {
      clearInterval(interval);
      stop();
    };
  }, [currentIndex, currentDialogue, isPlaying, audioEnabled]);

  const handleNext = () => {
    stop();
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    } else {
      onComplete?.();
    }
  };

  const handleSkip = () => {
    if (isTyping) {
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      stop();
    } else {
      handleNext();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleAudio = () => {
    if (audioEnabled) {
      stop();
    }
    setAudioEnabled(!audioEnabled);
  };

  if (!currentCharacter) return null;

  // Get unique characters in this dialogue
  const uniqueCharacters = [...new Set(dialogues.map(d => d.characterId))]
    .map(id => getCharacterById(id))
    .filter(Boolean) as Character[];

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Video header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            {title || "Character Introduction"}
          </span>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} / {dialogues.length}
          </span>
        </div>
      </div>

      {/* Characters stage */}
      <div className="p-6 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="flex justify-center gap-4">
          {uniqueCharacters.map((character) => (
            <CharacterAvatar
              key={character.id}
              character={character}
              animation={currentDialogue.characterId === character.id ? currentDialogue.animation : undefined}
              isActive={currentDialogue.characterId === character.id}
              isSpeaking={isAudioPlaying && currentDialogue.characterId === character.id && audioEnabled}
            />
          ))}
        </div>
      </div>

      {/* Dialogue box */}
      <div className="p-6 pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-muted/50 rounded-xl p-4 min-h-[100px]"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{currentCharacter.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn("text-sm font-semibold", currentCharacter.color)}>
                    {currentCharacter.name}
                  </span>
                  {isLoadingAudio && audioEnabled && (
                    <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                  )}
                </div>
                <p className="text-foreground mt-1 leading-relaxed">
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                    />
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAudio}
              className={cn("h-10 w-10", !audioEnabled && "text-muted-foreground")}
            >
              {audioEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {dialogues.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "w-6 bg-primary" 
                    : index < currentIndex 
                      ? "w-1.5 bg-primary/50" 
                      : "w-1.5 bg-muted"
                )}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="gap-1"
          >
            {currentIndex < dialogues.length - 1 ? "Next" : "Done"}
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterVideo;