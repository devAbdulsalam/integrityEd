import { useState } from 'react';
import {
	Menu,
	Award,
	BookText,
	User,
	Settings,
	HelpCircle,
	LogOut,
	X,
	Brain,
	Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const menuItems = [
	{ icon: Award, label: 'Rewards', path: '/rewards' },
	{ icon: BookText, label: 'Glossary', path: '/glossary' },
	{
		icon: Users,
		label: 'Character lab',
		path: '/characters/assessment',
	},
	{
    icon: Brain,
		label: 'Learning pattern',
		path: '/learning-pattern',
	},
	{
    icon: Settings,
		label: 'Learning Preferences',
		path: '/learning-preferences',
	},
  { icon: User, label: 'Profile', path: '/profile' },
	// { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground">
          <Menu className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-[280px] rounded-none rounded-r-xl left-0 right-auto">
        <DrawerHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold text-foreground">Menu</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="flex flex-col p-4 space-y-1">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => handleNavigation(path)}
              className="flex items-center gap-3 p-3 rounded-lg text-foreground hover:bg-secondary/50 transition-colors text-left"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-4 border-t border-border">
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/onboarding');
            }}
            className="flex items-center gap-3 p-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
