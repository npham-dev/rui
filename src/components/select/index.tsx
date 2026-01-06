import { Select as SelectPrimitive } from "@base-ui/react/select";
import clsx from "clsx";
import { type CSSProperties, type ReactNode } from "react";

import { textify } from "~/-utils";

import { Icon } from "../icon";
import { View } from "../view";

import transitionStyles from "../../styles/transitions.module.css";
import styles from "./select.module.css";

export function Select<Value>({
  placeholder,
  className,
  style,
  ...props
}: SelectPrimitive.Root.Props<Value, boolean> & {
  /**
   * Select placeholder if no value is chosen.
   *
   * Behaves differently depending on the type of select.
   * For a normal select, we simply render an item with a value of null.
   * For a `multiple` select, we replace the {@link https://base-ui.com/react/components/select#multiple-selection renderValue} function.
   */
  placeholder?: string;

  /** Apply styles to SelectPrimitive.trigger */
  className?: string;

  /** Apply styles to SelectPrimitive.trigger */
  style?: CSSProperties;
}) {
  return (
    <SelectPrimitive.Root {...props}>
      <View
        interactive="fill-outline"
        render={<SelectPrimitive.Trigger />}
        style={style}
        className={clsx(styles["select__trigger"], className)}
      >
        <SelectPrimitive.Value>
          {createRenderText(placeholder, props.items)}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon>
          <Icon
            name="arrow-down-s-line"
            className={styles["select__trigger-icon"]}
          />
        </SelectPrimitive.Icon>
      </View>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={4} alignItemWithTrigger={false}>
          <SelectPrimitive.Popup
            className={transitionStyles["transition_scale"]}
          >
            <SelectPrimitive.List className={styles["select__list"]}>
              {placeholder && !props.multiple ? (
                <SelectItem value={null} label={placeholder} />
              ) : null}

              {Array.isArray(props.items)
                ? props.items.map(({ value, label }) => (
                    <SelectItem key={value} value={value} label={label} />
                  ))
                : typeof props.items === "object"
                  ? Object.entries(props.items).map(([value, label]) => (
                      <SelectItem key={value} value={value} label={label} />
                    ))
                  : null}
              {/* TODO support record as well */}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

function SelectItem<T>(props: { value: T; label: string }) {
  return (
    <SelectPrimitive.Item
      className={styles["select__item"]}
      value={props.value}
    >
      <SelectPrimitive.ItemIndicator
        className={styles["select__item-indicator"]}
      >
        <Icon name="check-line" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className={styles["select__item-text"]}>
        {textify(props.label)}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * Create the renderText function for multiple selections
 * @param placeholder Default select value if nothing is selected
 * @param items Record or array of items defined by SelectPrimitive.Root
 * @returns renderText function
 */
function createRenderText<Value>(
  placeholder: string | undefined,
  items: SelectPrimitive.Root.Props<Value, true>["items"],
) {
  function findValue(value: string) {
    if (Array.isArray(items)) {
      return items.find((item) => item.value === value)?.label;
    } else if (typeof items === "object" && value in items) {
      return items[value as keyof typeof items] as ReactNode;
    }
  }

  function renderText(value: undefined | string | string[]) {
    if (!value || !items || value.length === 0) {
      return placeholder;
    }

    if (typeof value === "string") {
      return findValue(value);
    } else {
      return [
        findValue(value[0]) || value[0],
        value.length > 1 ? ` (+${value.length - 1} more)` : "",
      ];
    }
  }

  return renderText;
}
