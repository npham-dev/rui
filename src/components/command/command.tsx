import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Command as CommandPrimitive } from "@npham-dev/cmdk";
import clsx from "clsx";
import type { ComponentProps } from "react";

import { textify } from "~/-utils";

import { Dialog, type BaseDialogProps } from "../dialog";
import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { Separator } from "../separator";
import { Text } from "../text";
import { View } from "../view";

import styles from "./command.module.css";

type CommandRootProps = DialogPrimitive.Root.Props &
  Omit<BaseDialogProps, "title" | "description" | "background"> & {
    placeholder?: string;
  };

function CommandRoot({ placeholder, children, ...props }: CommandRootProps) {
  return (
    <Dialog
      width="sm"
      background="default"
      className={styles["command"]}
      closable
      {...props}
    >
      <CommandPrimitive>
        <View className={styles["command__input-root"]}>
          <View
            interactive="fill-outline"
            className={styles["command__input"]}
            render={<CommandPrimitive.Input placeholder={placeholder} />}
          />
          <Icon name="search-line" className={styles["command__input-icon"]} />
        </View>

        <CommandPrimitive.List className={styles["command__list"]}>
          <CommandPrimitive.Empty>
            <View className={styles["command__empty"]}>
              <Text color="dimmer">No results found.</Text>
            </View>
          </CommandPrimitive.Empty>

          {children}
        </CommandPrimitive.List>
      </CommandPrimitive>
    </Dialog>
  );
}

type CommandGroupProps = ComponentProps<typeof CommandPrimitive.Group>;

function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      className={clsx(styles["command__group"], className)}
      {...props}
    />
  );
}

type CommandSeparatorProps = ComponentProps<typeof CommandPrimitive.Separator>;

function CommandSeparator(props: CommandSeparatorProps) {
  return <Separator render={<CommandPrimitive.Separator {...props} />} />;
}

type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item> & {
  shortcut?: string;
  icon?: IconName;
};

function CommandItem({
  shortcut,
  icon,
  className,
  children,
  ...props
}: CommandItemProps) {
  return (
    <View
      interactive="list-item"
      className={clsx(styles["command__item"], className)}
      render={<CommandPrimitive.Item {...props} />}
    >
      {icon ? <Icon name={icon} /> : undefined}
      {textify(children)}
      {shortcut ? (
        <Text
          className={clsx(styles["command__shortcut"])}
          color="dimmer"
          size="sm"
        >
          {shortcut}
        </Text>
      ) : null}
    </View>
  );
}

export const Command = Object.assign(CommandRoot, {
  Group: CommandGroup,
  Separator: CommandSeparator,
  Item: CommandItem,
});

export declare namespace Command {
  export type Props = CommandRootProps;

  export namespace Group {
    export type Props = CommandGroupProps;
  }

  export namespace Separator {
    export type Props = CommandSeparatorProps;
  }

  export namespace Item {
    export type Props = CommandItemProps;
  }
}
