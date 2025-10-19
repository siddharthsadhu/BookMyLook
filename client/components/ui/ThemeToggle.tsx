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
        "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 border-0",
        theme === 'default' 
          ? "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 shadow-purple-500/25"
          : "bg-gradient-to-br from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 shadow-yellow-500/25"
      )}
      aria-label="Toggle theme"
    >
      {/* Artist's Palette Icon - consistent across both themes */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="drop-shadow-sm"
      >
        {/* Palette shape with thumbhole */}
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        {/* Paint dots */}
        <circle cx="13.5" cy="6.5" r="1.5" fill="white"/>
        <circle cx="17.5" cy="10.5" r="1.5" fill="white"/>
        <circle cx="8.5" cy="7.5" r="1.5" fill="white"/>
        <circle cx="6.5" cy="12.5" r="1.5" fill="white"/>
      </svg>
    </Button>
  );
}
