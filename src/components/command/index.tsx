import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import clsx from "clsx";
import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";

import { textify } from "~/-utils";

import { Dialog, type BaseDialogProps } from "../dialog";
import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { Separator } from "../separator";
import { Text } from "../text";
import { View } from "../view";

import styles from "./command.module.css";

export type CommandDialogProps = DialogPrimitive.Root.Props &
  Omit<BaseDialogProps, "title" | "description" | "background"> & {
    placeholder?: string;
  };

export function CommandDialog({
  placeholder,
  children,
  ...props
}: CommandDialogProps) {
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

export function CommandGroup({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={clsx(styles["command__group"], className)}
      {...props}
    />
  );
}

export function CommandSeparator(
  props: ComponentProps<typeof CommandPrimitive.Separator>,
) {
  return <Separator render={<CommandPrimitive.Separator {...props} />} />;
}

export function CommandItem({
  shortcut,
  icon,
  className,
  children,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item> & {
  shortcut?: string;
  icon?: IconName;
}) {
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
