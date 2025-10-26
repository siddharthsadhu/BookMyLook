import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-500 hover:scale-110 border-0",
        theme === 'default'
          ? "bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 hover:from-amber-300 hover:via-orange-400 hover:to-yellow-400 shadow-amber-500/30"
          : "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 shadow-slate-900/40"
      )}
      aria-label="Toggle theme"
    >
      {/* Sun Icon for Light Theme */}
      {theme === 'default' ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm transition-all duration-500"
        >
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2"/>
          <path d="M12 21v2"/>
          <path d="m4.22 4.22 1.42 1.42"/>
          <path d="m18.36 18.36 1.42 1.42"/>
          <path d="M1 12h2"/>
          <path d="M21 12h2"/>
          <path d="m4.22 19.78 1.42-1.42"/>
          <path d="m18.36 5.64 1.42-1.42"/>
        </svg>
      ) : (
        /* Moon Icon for Dark Theme */
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm transition-all duration-500"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )}
    </Button>
  );
}
