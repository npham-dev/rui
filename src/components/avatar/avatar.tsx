import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import clsx from "clsx";

import type { Size } from "~/styles/tokens";

import { getAvatarFallback } from "./avatar.utils";

import styles from "./avatar.module.css";

interface AvatarProps extends AvatarPrimitive.Root.Props {
  /**
   * Avatar url; if not provided, uses fallback based on username or fullName.
   */
  image?: string | null;

  /**
   * Used for initials if avatar image is not provided.
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

function Avatar({
  image,
  username,
  fullName,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const fallback = getAvatarFallback(username, fullName);
  return (
    <AvatarPrimitive.Root
      className={clsx(
        styles["avatar"],
        styles[`avatar_size_${size}`],
        className,
      )}
      {...props}
    >
      {image ? (
        <AvatarPrimitive.Image
          src={image}
          className={styles["avatar__image"]}
        />
      ) : null}
      <AvatarPrimitive.Fallback className={styles["avatar__fallback"]}>
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export { Avatar };

export declare namespace Avatar {
  export type Props = AvatarProps;
}
