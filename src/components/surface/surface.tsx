import type { useRender } from "@base-ui/react";
import clsx from "clsx";
import { createContext, useContext } from "react";

import { View, type Color } from "../view";
import type { Background } from "./surface.types";

import styles from "./surface.module.css";

const ElevationContext = createContext(0);

interface SurfaceProps extends useRender.ComponentProps<"div"> {
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

  /**
   * Add CSS color variables.
   */
  color?: Color;
}

function Surface({ background, elevated, className, ...props }: SurfaceProps) {
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
          styles["surface"],
          styles[`surface--${elevationToBackground(elevation)}`],
          className,
        )}
        {...props}
      />
    </ElevationContext.Provider>
  );
}

const backgrounds: Background[] = ["root", "default", "higher", "highest"];

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

export { Surface };

export declare namespace Surface {
  export type Props = SurfaceProps;
}
