import { Home, BookOpen, MessageSquare, Users, User, } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

const navItems = [
	{ icon: Home, label: 'Home', path: '/index' },
	{ icon: BookOpen, label: 'Modules', path: '/modules' },
	{ icon: MessageSquare , label: 'Chat', path: '/ai-tutor' },
	{ icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
