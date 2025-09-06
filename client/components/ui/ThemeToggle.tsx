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
        "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
        theme === 'salon' 
          ? "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 hover:from-cyan-400 hover:to-blue-500" 
          : "bg-gradient-to-br from-primary to-accent border-primary/20 hover:from-primary/90 hover:to-accent/90"
      )}
      aria-label="Toggle theme"
    >
      {theme === 'default' ? (
        // Salon theme icon (scissors and comb)
        <div className="relative">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-white"
          >
            {/* Scissors */}
            <path d="M6 6l6 6" />
            <path d="M6 18l6-6" />
            <circle cx="6" cy="6" r="2" />
            <circle cx="6" cy="18" r="2" />
            <path d="M18 6l-6 6" />
            <path d="M18 18l-6-6" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="18" cy="18" r="2" />
            {/* Comb */}
            <path d="M12 2v20" />
            <path d="M8 2h8" />
            <path d="M8 4h8" />
            <path d="M8 6h8" />
            <path d="M8 8h8" />
            <path d="M8 10h8" />
            <path d="M8 12h8" />
            <path d="M8 14h8" />
            <path d="M8 16h8" />
            <path d="M8 18h8" />
            <path d="M8 20h8" />
          </svg>
        </div>
      ) : (
        // Default theme icon (palette)
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-white"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
      )}
    </Button>
  );
}
