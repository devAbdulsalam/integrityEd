import { motion } from 'framer-motion';
import { Lock, Star, CheckCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Module {
  id: number;
  title: string;
  description: string;
  progress: number;
  locked: boolean;
}

interface LearningPathProps {
  modules: Module[];
  currentModuleId: number;
}

export const LearningPath = ({ modules, currentModuleId }: LearningPathProps) => {
  const navigate = useNavigate();

  const getNodeStatus = (module: Module) => {
    if (module.locked) return 'locked';
    if (module.progress === 100) return 'completed';
    if (module.progress > 0) return 'in-progress';
    return 'available';
  };

  return (
    <div className="relative py-8 px-4">
      {/* Path Background */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/50 -translate-x-1/2" />
      
      {/* Animated Character - positioned at current module */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        initial={{ y: 0 }}
        animate={{ 
          y: (currentModuleId - 1) * 180,
        }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.8 
        }}
      >
        <motion.div 
          className="relative"
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 border-4 border-background">
            <span className="text-2xl">🏃</span>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        </motion.div>
      </motion.div>

      {/* Module Nodes */}
      <div className="relative space-y-12">
        {modules.map((module, index) => {
          const status = getNodeStatus(module);
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Module Card */}
              <motion.div
                onClick={() => !module.locked && navigate(`/module/${module.id}`)}
                whileHover={!module.locked ? { scale: 1.02 } : {}}
                whileTap={!module.locked ? { scale: 0.98 } : {}}
                className={`flex-1 relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  status === 'completed' 
                    ? 'bg-green-500/10 border-green-500/50' 
                    : status === 'in-progress'
                    ? 'bg-primary/10 border-primary/50 shadow-lg shadow-primary/10'
                    : status === 'available'
                    ? 'bg-card border-border hover:border-primary/50'
                    : 'bg-secondary/30 border-border/50 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Sparkle effect for current module */}
                {status === 'in-progress' && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  >
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                )}

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${
                    status === 'completed' 
                      ? 'bg-green-500/20' 
                      : status === 'in-progress' 
                      ? 'bg-primary/20'
                      : status === 'available'
                      ? 'bg-secondary'
                      : 'bg-muted'
                  }`}>
                    {status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : status === 'in-progress' ? (
                      <Play className="w-5 h-5 text-primary" />
                    ) : status === 'locked' ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Play className="w-5 h-5 text-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">Level {module.id}</p>
                    <h3 className="font-semibold text-foreground text-sm leading-tight">
                      {module.title}
                    </h3>
                    {status === 'in-progress' && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${module.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )}
                    {status === 'locked' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Complete previous level to unlock
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Connection Node */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center z-10 ${
                    status === 'completed'
                      ? 'bg-green-500 border-green-400 text-white'
                      : status === 'in-progress'
                      ? 'bg-primary border-primary/70 text-primary-foreground'
                      : status === 'available'
                      ? 'bg-card border-border text-foreground'
                      : 'bg-secondary border-border text-muted-foreground'
                  }`}
                >
                  {status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : status === 'locked' ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span className="font-bold text-sm">{module.id}</span>
                  )}
                </motion.div>

                {/* Connecting path to next node */}
                {index < modules.length - 1 && (
                  <svg 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-24 h-12"
                    viewBox="0 0 100 50"
                  >
                    <motion.path
                      d={isEven ? "M50 0 Q80 25 50 50" : "M50 0 Q20 25 50 50"}
                      fill="none"
                      stroke={status === 'completed' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    />
                  </svg>
                )}
              </div>

              {/* Empty space for layout balance */}
              <div className="flex-1" />
            </motion.div>
          );
        })}
      </div>

      {/* Finish Line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: modules.length * 0.1 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
          <span className="text-3xl">🏆</span>
        </div>
        <p className="text-sm font-medium text-muted-foreground">Complete all levels!</p>
      </motion.div>
    </div>
  );
};
