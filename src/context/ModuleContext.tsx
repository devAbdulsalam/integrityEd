import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { modules as initialModules } from '@/data/module';

export type ModuleLevel = 'easy' | 'medium' | 'hard';

interface ModuleContextType {
	modules: ModulesCollection;
	markModuleComplete: (
		moduleKey: keyof ModulesCollection,
		level: ModuleLevel
	) => void;
	resetModules: () => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);
export const ModuleProvider = ({ children }: { children: ReactNode }) => {
	const [modules, setModules] = useState<ModulesCollection>(() => {
		const saved = localStorage.getItem('modulesProgress');
		return saved ? JSON.parse(saved) : initialModules;
	});

	useEffect(() => {
		localStorage.setItem('modulesProgress', JSON.stringify(modules));
	}, [modules]);

	const markModuleComplete = (
		moduleKey: keyof ModulesCollection,
		level: ModuleLevel
	) => {
		setModules((prev) => {
			const updated = structuredClone(prev);

			// complete current level
			updated[moduleKey][level].progress = 100;
			updated[moduleKey][level].active = false;

			const order: ModuleLevel[] = ['easy', 'medium', 'hard'];
			const currentIndex = order.indexOf(level);
			const nextLevel = order[currentIndex + 1];

			if (nextLevel) {
				updated[moduleKey][nextLevel].locked = false;
				updated[moduleKey][nextLevel].active = true;
			}

			return updated;
		});
	};

	const resetModules = () => {
		localStorage.removeItem('modulesProgress');
		setModules(initialModules);
	};

	return (
		<ModuleContext.Provider
			value={{ modules, markModuleComplete, resetModules }}
		>
			{children}
		</ModuleContext.Provider>
	);
};

export const useModules = () => {
	const context = useContext(ModuleContext);

	if (!context) {
		throw new Error('useModules must be used within ModuleProvider');
	}

	return context;
};
