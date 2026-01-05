import { createContext, useContext } from "react";

interface ThemeContextType {
  /** Current theme  */
  theme: string;

  /** Set a new current theme */
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export function useThemeContext() {
  return useContext(ThemeContext);
}
