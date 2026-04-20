import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

/** Client-only gate without useEffect+setState (matches SSR, then updates after hydration). */
function useClientReady() {
  return useSyncExternalStore(
    (onStoreChange) => {
      queueMicrotask(onStoreChange);
      return () => {};
    },
    () => true,
    () => false
  );
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const clientReady = useClientReady();

  if (!clientReady) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        suppressHydrationWarning
        aria-label="Toggle theme"
      />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-300 hover:scale-110"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary transition-all duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 text-primary transition-all duration-300 rotate-0 scale-100" />
      )}
    </Button>
  );
};

export default ThemeToggle;