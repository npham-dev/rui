import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import clsx from "clsx";

import { Button } from "../button";
import type { BaseDialogProps } from "../dialog";
import { Surface } from "../surface";
import { Text } from "../text";
import { View } from "../view";
import { getButtonProps } from "./alert-dialog.utils";

import transitionStyles from "../../styles/transitions.module.css";
import dialogStyles from "../dialog/dialog.module.css";
import styles from "./alert-dialog.module.css";

/**
 * General guidance:
 *
 * Should you have nested modals? Absolutely not. It's confusing to navigate and
 * obliterates the stacking context by putting multiple root surfaces on top of
 * each other.
 *
 * Should you have payloads? Probably not... Currently unsupported but that
 * style of generalization feels kind of anti-composition
 */
interface AlertDialogRootProps
  extends Omit<AlertDialogPrimitive.Root.Props, "children">, BaseDialogProps {
  /**
   *
   * The actions to display in the alert dialog. You must have at least two
   * actions. By default, actions will be `interactive` and the last action will
   * have `colorway` "negative_fill".
   *
   */
  actions: Array<Button.Props>;
}

function AlertDialogRoot({
  title,
  description,
  children,
  actions,
  trigger,
  width = "md",
  background = "root",
  centered = false,
  className,
  ...props
}: AlertDialogRootProps) {
  if (actions.length < 2) {
    console.error("You must have at least two actions.");
  }

  return (
    <AlertDialogPrimitive.Root {...props}>
      {trigger ? <AlertDialogPrimitive.Trigger render={trigger} /> : null}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Backdrop
          className={clsx(
            dialogStyles["dialog__backdrop"],
            transitionStyles["transition_opacity"],
          )}
        />
        <AlertDialogPrimitive.Popup
          className={clsx(
            dialogStyles["dialog__popup"],
            centered && dialogStyles["dialog__popup_centered"],
            transitionStyles["transition_scale"],
          )}
        >
          <Surface
            background={background}
            className={clsx(
              dialogStyles["dialog__content"],
              dialogStyles[`dialog__content_width_${width}`],
              className,
            )}
          >
            {title || description ? (
              <View className={dialogStyles["dialog__header"]}>
                {title ? (
                  <Text render={<AlertDialogPrimitive.Title />} size="2xl">
                    {title}
                  </Text>
                ) : null}
                {description ? (
                  <Text
                    multiline
                    color="dimmer"
                    render={<AlertDialogPrimitive.Description />}
                  >
                    {description}
                  </Text>
                ) : null}
              </View>
            ) : null}
            {children}
            <View className={styles["alert-dialog__actions"]}>
              {actions.map(({ children, ...action }, i) => (
                <AlertDialogClose
                  key={i}
                  {...getButtonProps(action, i + 1 === actions.length)}
                >
                  {children}
                </AlertDialogClose>
              ))}
            </View>
          </Surface>
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}

type AlertDialogCloseProps = Button.Props;

function AlertDialogClose(props: AlertDialogCloseProps) {
  return <AlertDialogPrimitive.Close render={<Button {...props} />} />;
}

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Close: AlertDialogClose,
});

export declare namespace AlertDialog {
  export type Props = AlertDialogRootProps;

  export namespace Close {
    export type Props = AlertDialogCloseProps;
  }
}
