import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import clsx from "clsx";

import { Button } from "../button";
import { IconButton } from "../icon-button";
import { Surface } from "../surface";
import { Text } from "../text";
import { View } from "../view";
import type { BaseDialogProps } from "./dialog.types";

import transitionStyles from "../../styles/transitions.module.css";
import styles from "./dialog.module.css";

interface DialogRootProps
  extends Omit<DialogPrimitive.Root.Props, "children">, BaseDialogProps {
  /**
   * Show close icon
   */
  closable?: boolean;
}

function DialogRoot({
  title,
  description,
  trigger,
  width = "md",
  background = "root",
  centered,
  closable,
  children,
  className,
  ...props
}: DialogRootProps) {
  return (
    <DialogPrimitive.Root {...props}>
      {trigger ? <DialogPrimitive.Trigger render={trigger} /> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={clsx(
            styles["dialog__backdrop"],
            transitionStyles["transition_opacity"],
          )}
        />
        <DialogPrimitive.Popup
          className={clsx(
            styles["dialog__popup"],
            centered && styles["dialog__popup_centered"],
            transitionStyles["transition_scale"],
          )}
        >
          <Surface
            background={background}
            className={clsx(
              styles["dialog__content"],
              styles[`dialog__content_width_${width}`],
              className,
            )}
          >
            {title || description ? (
              <View className={styles["dialog__header"]}>
                {title ? (
                  <Text render={<DialogPrimitive.Title />} size="2xl">
                    {title}
                  </Text>
                ) : null}
                {description ? (
                  <Text
                    multiline
                    color="dimmer"
                    render={<DialogPrimitive.Description />}
                  >
                    {description}
                  </Text>
                ) : null}
              </View>
            ) : null}

            {children}

            {closable ? (
              <DialogPrimitive.Close
                data-framework-close
                className={styles["dialog__close"]}
                render={
                  <IconButton
                    size="sm"
                    icon="close-line"
                    alt="Close"
                    interactive="no-fill"
                  />
                }
              />
            ) : null}
          </Surface>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

type DialogCloseProps = Button.Props;

function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close render={<Button {...props} />} />;
}

export const Dialog = Object.assign(DialogRoot, {
  Close: DialogClose,
});

export declare namespace Dialog {
  export type Props = DialogRootProps;

  export namespace DialogClose {
    export type Props = DialogCloseProps;
  }
}
