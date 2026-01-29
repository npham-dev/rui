import { Button } from "../button";

/**
 * Sensible defaults for actions (buttons)
 * @param props Action provided by AlertDialog
 * @param isLast Is this the last action provided in the array?
 * @returns Props with defaults
 */
export function getButtonProps(
  props: Button.Props,
  isLast?: boolean,
): Button.Props {
  if (isLast) {
    return {
      interactive: "negative_fill",
      ...props,
    };
  }
  return {
    interactive: true,
    ...props,
  };
}
