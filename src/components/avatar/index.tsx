import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import clsx from "clsx";

import type { Size } from "~/styles/tokens";

import styles from "./avatar.module.css";

export interface AvatarProps {
  /**
   * Avatar url; if not provided, uses fallback based on username or fullName.
   */
  src?: string | null;

  /**
   * Used for initials if avatar src is not provided.
   */
  username: string;

  /**
   * User's first & last name. Used for initials, takes precedence over username.
   */
  fullName?: string;

  /**
   * Size of the avatar, defaults to "md".
   */
  size?: Size;
}

export function Avatar(props: AvatarProps) {
  const fallback = getAvatarFallback(props.username, props.fullName);
  return (
    <AvatarPrimitive.Root
      className={clsx(
        styles.avatar,
        styles[`avatar_size_${props.size || "md"}`],
      )}
    >
      {props.src ? (
        <AvatarPrimitive.Image
          src={props.src}
          className={styles.avatar__image}
        />
      ) : null}
      <AvatarPrimitive.Fallback className={styles.avatar__fallback}>
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

/**
 * Create 2 letter avatar fallback (depending on  what is provided) \
 * Prioritizes full name over usernmae
 * @param username user selected name
 * @param fullName real name of the user
 * @returns 2 letter, uppercase avatar fallback
 */
function getAvatarFallback(username: string, fullName?: string) {
  let fallback = username.substring(0, 2);

  if (fullName) {
    // if full name w/ lastName is provided, use first and last initials
    // otherwise use first two letters of the name
    const [firstName, lastName] = fullName.split(" ");
    fallback =
      firstName && lastName
        ? firstName.charAt(0) + lastName.charAt(0)
        : fullName.substring(0, 2);
  }

  return fallback.toLocaleUpperCase();
}
