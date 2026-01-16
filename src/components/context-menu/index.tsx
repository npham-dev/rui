import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import clsx from "clsx";
import {
  createContext,
  useContext,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import { textify } from "~/-utils";
import { tokens } from "~/styles/tokens";

import { Icon } from "../icon";
import type { IconName } from "../icon/icon-names";
import { Separator, type SeparatorProps } from "../separator";
import { Surface, type Background } from "../surface";
import { Text } from "../text";
import { View } from "../view";

import transitionStyles from "../../styles/transitions.module.css";
import styles from "./context-menu.module.css";

export type ContextMenuProps = ContextMenuPrimitive.Root.Props & {
  /** Specify trigger to open context menu. */
  trigger?: ReactElement;

  /** Surface background popup should use. Defaults to "root". Propogates to submenus. */
  background?: Background;

  /** Context menu content */
  children?: ReactNode;

  /** Apply className to ContextMenuPrimitive.Popup */
  className?: string;

  /** Apply styles to ContextMenuPrimitive.Popup  */
  style?: CSSProperties;
};

const ContextMenuContext = createContext<Background>("root");

export function ContextMenu({
  trigger,
  background = "root",
  className,
  children,
  style,
  ...props
}: ContextMenuProps) {
  return (
    <ContextMenuContext.Provider value={background}>
      <ContextMenuPrimitive.Root {...props}>
        {trigger ? <ContextMenuPrimitive.Trigger render={trigger} /> : null}
        <ContextMenuPrimitive.Portal>
          <ContextMenuPrimitive.Positioner>
            <ContextMenuPrimitive.Popup
              render={<Surface background={background} />}
              className={clsx(
                styles["context-menu"],
                transitionStyles["transition_fade-out"],
                className,
              )}
              style={style}
            >
              {children}
            </ContextMenuPrimitive.Popup>
          </ContextMenuPrimitive.Positioner>
        </ContextMenuPrimitive.Portal>
      </ContextMenuPrimitive.Root>
    </ContextMenuContext.Provider>
  );
}

export function ContextMenuItem({
  icon,
  shortcut,
  className,
  children,
  ...props
}: ContextMenuPrimitive.Item.Props & {
  /** Optional item icon to communicate purpose */
  icon?: IconName;

  /** Indicate that this action can be triggered by a keyboard shortcut */
  shortcut?: string;
}) {
  return (
    <View
      render={<ContextMenuPrimitive.Item {...props} />}
      interactive="list-item"
      className={clsx(styles["context-menu__item"], className)}
    >
      {icon ? (
        <Icon name={icon} className={styles["context-menu__item-icon"]} />
      ) : null}
      {textify(children)}
      {shortcut ? (
        <Text
          className={styles["context-menu__item-shortcut"]}
          color="dimmest"
          size="sm"
        >
          {shortcut}
        </Text>
      ) : null}
    </View>
  );
}

export function ContextMenuSeparator(
  props: ContextMenuPrimitive.Separator.Props & SeparatorProps,
) {
  return <Separator render={<ContextMenuPrimitive.Separator />} {...props} />;
}

export function ContextMenuGroup({
  label,
  children,
  ...props
}: ContextMenuPrimitive.Group.Props & {
  label?: string;
}) {
  return (
    <ContextMenuPrimitive.Group {...props}>
      {label ? (
        <Text
          render={<ContextMenuPrimitive.GroupLabel />}
          className={styles["context-menu__label"]}
          color="dimmest"
          size="sm"
        >
          {label}
        </Text>
      ) : null}
      {children}
    </ContextMenuPrimitive.Group>
  );
}

export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenuPrimitive.RadioItem.Props) {
  return (
    <View
      interactive="list-item"
      render={<ContextMenuPrimitive.RadioItem {...props} />}
      className={clsx(styles["context-menu__item"], className)}
    >
      <ContextMenuPrimitive.RadioItemIndicator
        className={styles["context-menu__item-icon"]}
      >
        <Icon name="checkbox-circle-line" color={tokens.primaryDefault} />
      </ContextMenuPrimitive.RadioItemIndicator>
      {textify(children)}
    </View>
  );
}

export function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenuPrimitive.RadioItem.Props) {
  return (
    <View
      interactive="list-item"
      render={<ContextMenuPrimitive.CheckboxItem {...props} />}
      className={clsx(styles["context-menu__item"], className)}
    >
      <ContextMenuPrimitive.CheckboxItemIndicator
        className={styles["context-menu__item-icon"]}
      >
        <Icon name="check-line" color={tokens.primaryDefault} />
      </ContextMenuPrimitive.CheckboxItemIndicator>
      {textify(children)}
    </View>
  );
}

export function ContextMenuMore({
  label,
  icon,
  children,
  className,
  style,
  ...props
}: ContextMenuPrimitive.SubmenuRoot.Props & {
  label: string;

  /** Optional item icon to communicate purpose */
  icon?: IconName;

  /** Context menu content */
  children?: ReactNode;

  /** Apply className to ContextMenuPrimitive.Popup */
  className?: string;

  /** Apply styles to ContextMenuPrimitive.Popup  */
  style?: CSSProperties;
}) {
  const background = useContext(ContextMenuContext);

  return (
    <ContextMenuPrimitive.SubmenuRoot {...props}>
      <View
        render={<ContextMenuPrimitive.SubmenuTrigger />}
        className={styles["context-menu__item"]}
      >
        {icon ? (
          <Icon name={icon} className={styles["context-menu__item-icon"]} />
        ) : null}
        {textify(label)}
        <Icon
          name="arrow-right-line"
          className={styles["context-menu__item-shortcut"]}
        />
      </View>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Positioner alignOffset={-4} sideOffset={-4}>
          <ContextMenuPrimitive.Popup
            render={<Surface background={background} />}
            className={clsx(
              styles["context-menu"],
              transitionStyles["transition_scale"],
              className,
            )}
            style={style}
          >
            {children}
          </ContextMenuPrimitive.Popup>
        </ContextMenuPrimitive.Positioner>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.SubmenuRoot>
  );
}
