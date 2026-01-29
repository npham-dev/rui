import clsx from "clsx";

import { Avatar } from "../avatar";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { View, type Color } from "../view";

import styles from "./stacked-avatars.module.css";

export interface StackedAvatarsProps {
  /** User objects */
  users: Array<
    Avatar.Props & {
      /** Ring color around the avatar */
      color: Color;
    }
  >;

  /** The maximum number of user to display. Defaults to 3. */
  visibleUsers?: number;

  /** The size of the avatars. Defaults to "md". */
  size?: Avatar.Props["size"];
}

export function StackedAvatars({
  users,
  visibleUsers = 3,
  size = "md",
}: StackedAvatarsProps) {
  return (
    <Tooltip
      className={styles["stacked-avatars__tooltip-content"]}
      trigger={
        <View className={styles["stacked-avatars"]}>
          {users
            .slice(0, visibleUsers)
            .map(({ color, className, ...user }, index) => (
              <View color={color} key={user.username}>
                <Avatar
                  size={size}
                  className={clsx(
                    styles["stacked-avatars__avatar"],
                    styles["stacked-avatars__avatar_color"],
                    className,
                  )}
                  style={{ zIndex: index }}
                  {...user}
                />
              </View>
            ))}
          {users.length > visibleUsers && (
            <View
              className={clsx(
                styles["stacked-avatars__visible"],
                styles[`stacked-avatars__visible_size_${size}`],
              )}
              style={{ zIndex: visibleUsers + 1 }}
            >
              <Text size="sm">+{users.length - visibleUsers}</Text>
            </View>
          )}
        </View>
      }
    >
      {users.map(({ color, className, ...user }) => (
        <View
          key={user.username}
          color={color}
          className={styles["stacked-avatars__tooltip-user"]}
        >
          <Avatar
            key={user.username}
            className={clsx(styles["stacked-avatars__avatar_color"], className)}
            {...user}
            size="sm"
          />
          <Text
            color="dimmer"
            className={styles["stacked-avatars__tooltip-text"]}
          >
            {user.username}
          </Text>
        </View>
      ))}
    </Tooltip>
  );
}
