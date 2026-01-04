import type { useRender } from "@base-ui/react";
import clsx from "clsx";
import { createContext, useContext } from "react";

import { View } from "../view";
import styles from "./surface.module.css";

export interface SurfaceProps extends useRender.ComponentProps<"div"> {
  /**
   * Explicitly sets the background color of the surface.
   * If this prop is set, the `elevated` prop will be ignored.
   */
  background?: Background;

  /**
   * If true, the surface will be elevated by one level from the current
   * context. If false, the surface will be at the same level as before.
   *
   * If the `background` prop is set, this prop will be ignored.
   */
  elevated?: boolean;
}

const ElevationContext = createContext(0);

export const Surface = ({
  background,
  elevated,
  className,
  ...props
}: SurfaceProps) => {
  // automatically manage elevation
  let elevation = useContext(ElevationContext);
  if (background) {
    elevation = backgroundToElevation(background);
  } else if (elevated) {
    elevation++;
  }

  return (
    <ElevationContext.Provider value={elevation}>
      <View
        className={clsx(
          styles.surface,
          styles[`surface--${elevationToBackground(elevation)}`],
          className,
        )}
        {...props}
      />
    </ElevationContext.Provider>
  );
};

Surface.displayName = "Surface";

const backgrounds = ["root", "default", "higher", "highest"] as const;

export type Background = (typeof backgrounds)[number];

/**
 * Convert a background string into a numbered elevation level
 * @param background Background provided as a string
 * @returns Background as a number
 */
function backgroundToElevation(background: Background = "root") {
  const elevation = backgrounds.indexOf(background);
  return Math.min(Math.max(elevation, 0), backgrounds.length - 1);
}

/**
 * Convert a numbered elevation level into a background string
 * @param elevation Background as a number
 * @returns Background as a string
 */
function elevationToBackground(elevation: number = 0): Background {
  return backgrounds[elevation] || "root";
}
