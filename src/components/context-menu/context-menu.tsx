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
import { Separator } from "../separator";
import { Surface, type Background } from "../surface";
import { Text } from "../text";
import { View } from "../view";

import transitionStyles from "../../styles/transitions.module.css";
import styles from "./context-menu.module.css";

const ContextMenuContext = createContext<Background>("root");

interface ContextMenuRootProps extends ContextMenuPrimitive.Root.Props {
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
}

function ContextMenuRoot({
  trigger,
  background = "root",
  className,
  children,
  style,
  ...props
}: ContextMenuRootProps) {
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

interface ContextMenuItemProps extends ContextMenuPrimitive.Item.Props {
  /** Optional item icon to communicate purpose */
  icon?: Icon.Name;

  /** Indicate that this action can be triggered by a keyboard shortcut */
  shortcut?: string;
}

function ContextMenuItem({
  icon,
  shortcut,
  className,
  children,
  ...props
}: ContextMenuItemProps) {
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

interface ContextMenuSeparatorProps
  extends ContextMenuPrimitive.Separator.Props, Separator.Props {}

function ContextMenuSeparator(props: ContextMenuSeparatorProps) {
  return <Separator render={<ContextMenuPrimitive.Separator />} {...props} />;
}

interface ContextMenuGroupProps extends ContextMenuPrimitive.Group.Props {
  label?: string;
}

function ContextMenuGroup({
  label,
  children,
  ...props
}: ContextMenuGroupProps) {
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

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

type ContextMenuRadioItemProps = ContextMenuPrimitive.RadioItem.Props;

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenuRadioItemProps) {
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

type ContextMenuCheckboxItemProps = ContextMenuPrimitive.CheckboxItem.Props;

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenuCheckboxItemProps) {
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

interface ContextMenuMoreProps extends ContextMenuPrimitive.SubmenuRoot.Props {
  label: string;

  /** Optional item icon to communicate purpose */
  icon?: Icon.Name;

  /** Context menu content */
  children?: ReactNode;

  /** Apply className to ContextMenuPrimitive.Popup */
  className?: string;

  /** Apply styles to ContextMenuPrimitive.Popup  */
  style?: CSSProperties;
}

function ContextMenuMore({
  label,
  icon,
  children,
  className,
  style,
  ...props
}: ContextMenuMoreProps) {
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

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
  Group: ContextMenuGroup,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  CheckboxItem: ContextMenuCheckboxItem,
  More: ContextMenuMore,
});

export declare namespace ContextMenu {
  export type Props = ContextMenuRootProps;

  export namespace Item {
    export type Props = ContextMenuItemProps;
  }

  export namespace Separator {
    export type Props = ContextMenuSeparatorProps;
  }

  export namespace Group {
    export type Props = ContextMenuGroupProps;
  }

  export namespace RadioGroup {
    export type Props = ContextMenuPrimitive.RadioGroup.Props;
  }

  export namespace RadioItem {
    export type Props = ContextMenuRadioItemProps;
  }

  export namespace CheckboxItem {
    export type Props = ContextMenuCheckboxItemProps;
  }

  export namespace More {
    export type Props = ContextMenuMoreProps;
  }
}
