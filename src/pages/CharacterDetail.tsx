import { useState } from "react";
import { ArrowLeft, Play, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCharacterById, characterContent, CharacterLesson } from "@/data/characters";
import { BottomNav } from "@/components/BottomNav";
import CharacterVideo from "@/components/CharacterVideo";
import { cn } from "@/lib/utils";

const CharacterDetail = () => {
  const navigate = useNavigate();
  const { characterId } = useParams<{ characterId: string }>();
  const [activeLesson, setActiveLesson] = useState<CharacterLesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const character = getCharacterById(characterId || "");
  const content = characterContent.find((c) => c.characterId === characterId);

  if (!character) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Character not found</p>
      </div>
    );
  }

  const handleLessonComplete = () => {
    if (activeLesson && !completedLessons.includes(activeLesson.id)) {
      setCompletedLessons((prev) => [...prev, activeLesson.id]);
    }
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Header with character info */}
        <div
          className={cn(
            "sticky top-0 z-10 p-6 bg-gradient-to-br border-b border-border",
            character.bgGradient
          )}
        >
          <button onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-background/50 flex items-center justify-center text-5xl shadow-lg"
            >
              {character.emoji}
            </motion.div>
            <div>
              <h1 className={cn("text-2xl font-bold", character.color)}>
                {character.name}
              </h1>
              <p className="text-sm text-muted-foreground">{character.role}</p>
            </div>
          </div>

          <p className="mt-4 text-foreground/80 text-sm leading-relaxed">
            {character.description}
          </p>
          <p className="mt-2 text-muted-foreground text-xs italic">
            {character.personality}
          </p>
        </div>

        {/* Lessons list */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Video Lessons
            </h2>
            <span className="text-xs text-muted-foreground">
              {completedLessons.length}/{content?.lessons.length || 0} completed
            </span>
          </div>

          <div className="space-y-3">
            {content?.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveLesson(lesson)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all text-left",
                    "bg-card hover:border-primary/50",
                    isCompleted ? "border-primary/30" : "border-border"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        isCompleted
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {!content?.lessons.length && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No lessons available yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Video player overlay */}
      <AnimatePresence>
        {activeLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="max-w-md mx-auto h-full flex flex-col">
              <div className="p-4 border-b border-border">
                <button
                  onClick={() => setActiveLesson(null)}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to lessons</span>
                </button>
                <h2 className="text-lg font-semibold text-foreground mt-2">
                  {activeLesson.title}
                </h2>
              </div>

              <div className="flex-1 overflow-auto">
                <CharacterVideo
                  dialogues={activeLesson.dialogues}
                  onComplete={handleLessonComplete}
                  title={activeLesson.title}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default CharacterDetail;