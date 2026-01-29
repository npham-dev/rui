import { useEffect, useState } from "react";

import { View } from "../view";
import { ThemeContext } from "./theme-context";

interface ThemeProviderProps extends View.Props {
  /** Override theme. */
  value?: string;

  /**
   * Default theme if you don't want to manage it yourself.
   * Defaults to user preferences and then light.
   */
  defaultValue?: string;

  /**
   * Override theme set on body.
   * This prevents mismatched themes on overscroll.
   * Defaults to true.
   */
  overrideBody?: boolean;
}

function ThemeProvider({
  value,
  defaultValue,
  overrideBody = true,
  ...props
}: ThemeProviderProps) {
  const isControlled = value !== undefined;
  const [uncontrolledTheme, setUncontrolledTheme] = useState<string>(
    () => defaultValue || getDefaultTheme(),
  );

  const theme = isControlled ? value : uncontrolledTheme;
  const setTheme = setUncontrolledTheme;

  useEffect(() => {
    // also set theme of the body b/c overscroll will probably show mismatched themes
    if (overrideBody) {
      document.body.dataset.theme = theme;
    }
  }, [theme, overrideBody]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View data-theme={theme} {...props} />
    </ThemeContext.Provider>
  );
}

/**
 * Try to get theme from user system preferences.
 * Otherwise just default to "light".
 * @returns Theme name
 */
function getDefaultTheme(): string {
  if (typeof window === "undefined") {
    return "light";
  }

  // try & get theme from user preferences
  try {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  } catch (error) {
    console.error(error);
  }

  return "light";
}

export { ThemeProvider };

export declare namespace ThemeProvider {
  export type Props = ThemeProviderProps;
}
