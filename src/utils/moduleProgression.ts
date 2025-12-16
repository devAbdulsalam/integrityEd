import { Difficulty } from '@/data/module';

export interface ModuleProgress {
  moduleId: string;
  difficulty: Difficulty;
  completed: boolean;
  passed: boolean;
}

export interface UserModuleProgress {
  currentModule: string;
  modulesProgress: Record<string, ModuleProgress>;
}

const STORAGE_KEY = 'module_progress';

export const getDefaultProgress = (): UserModuleProgress => ({
  currentModule: 'module1',
  modulesProgress: {},
});

export const loadModuleProgress = (): UserModuleProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return getDefaultProgress();
};

export const saveModuleProgress = (progress: UserModuleProgress): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const getModuleDifficulty = (moduleId: string): Difficulty => {
  const progress = loadModuleProgress();
  const moduleProgress = progress.modulesProgress[moduleId];
  
  // Default to medium for new modules
  if (!moduleProgress) {
    return 'medium';
  }
  
  return moduleProgress.difficulty;
};

export const handleQuizResult = (
  moduleId: string,
  passed: boolean,
  currentDifficulty: Difficulty
): { nextModule: string | null; nextDifficulty: Difficulty } => {
  const progress = loadModuleProgress();
  
  if (passed) {
    // Mark current module as completed
    progress.modulesProgress[moduleId] = {
      moduleId,
      difficulty: currentDifficulty,
      completed: true,
      passed: true,
    };
    
    // Unlock next module
    const moduleNum = parseInt(moduleId.replace('module', ''));
    const nextModuleId = `module${moduleNum + 1}`;
    
    // Set next module as current
    progress.currentModule = nextModuleId;
    
    saveModuleProgress(progress);
    
    return {
      nextModule: nextModuleId,
      nextDifficulty: 'medium',
    };
  } else {
    // Failed - drop to easy difficulty if not already on easy
    if (currentDifficulty !== 'easy') {
      progress.modulesProgress[moduleId] = {
        moduleId,
        difficulty: 'easy',
        completed: false,
        passed: false,
      };
      saveModuleProgress(progress);
      
      return {
        nextModule: null,
        nextDifficulty: 'easy',
      };
    }
    
    // Already on easy, let them retry
    return {
      nextModule: null,
      nextDifficulty: 'easy',
    };
  }
};

export const isModuleUnlocked = (moduleId: string): boolean => {
  const progress = loadModuleProgress();
  const moduleNum = parseInt(moduleId.replace('module', ''));
  
  // Module 1 is always unlocked
  if (moduleNum === 1) return true;
  
  // Check if previous module was passed
  const prevModuleId = `module${moduleNum - 1}`;
  const prevProgress = progress.modulesProgress[prevModuleId];
  
  return prevProgress?.passed ?? false;
};

export const getModuleStatus = (moduleId: string): {
  unlocked: boolean;
  completed: boolean;
  difficulty: Difficulty;
} => {
  const progress = loadModuleProgress();
  const moduleProgress = progress.modulesProgress[moduleId];
  
  return {
    unlocked: isModuleUnlocked(moduleId),
    completed: moduleProgress?.passed ?? false,
    difficulty: moduleProgress?.difficulty ?? 'medium',
  };
};
