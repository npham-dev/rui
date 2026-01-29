import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import clsx from "clsx";

import { Button } from "../button";
import { Heading } from "../heading";
import { IconButton } from "../icon-button";
import { Surface } from "../surface";
import { Text } from "../text";
import { View, type Color } from "../view";
import { useToastManager } from "./use-toast-manager";

import styles from "./toaster.module.css";

const toastTypeColor: Record<string, Color> = {
  info: "blue",
  error: "red",
  warning: "yellow",
  success: "green",
};

type ToasterProps = ToastPrimitive.Provider.Props;

function Toaster({ children, ...props }: ToasterProps) {
  return (
    <ToastPrimitive.Provider {...props}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport className={styles["toast__viewport"]}>
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}

// TODO we're not using the toast primitives here...
// TODO specify toast background in viewport?

function ToastList() {
  const toastManager = useToastManager();
  return toastManager.toasts.map((toast) => {
    const color =
      toast.type && toast.type in toastTypeColor
        ? toastTypeColor[toast.type]
        : undefined;

    return (
      <ToastPrimitive.Root
        key={toast.id}
        toast={toast}
        className={clsx(
          styles["toaster"],
          color
            ? styles[`toaster_variant_colorway`]
            : styles["toaster_variant_neutral"],
        )}
        render={<Surface background="default" color={color} />}
      >
        <View
          render={<ToastPrimitive.Content />}
          className={styles["toaster__content"]}
        >
          <View
            className={clsx(
              styles["toaster__header"],
              !toast.title && styles["toaster__header_pad"],
            )}
          >
            <ToastPrimitive.Title
              render={
                <Heading
                  level={2}
                  size="lg"
                  color="inherit"
                  className={styles["toaster__title"]}
                />
              }
            />
            <ToastPrimitive.Description
              render={<Text multiline color={color ? "inherit" : "dimmer"} />}
              className={styles["toaster__description"]}
            />
          </View>
          <ToastPrimitive.Close
            render={
              <IconButton
                interactive={color ? `${color}_no-fill` : "no-fill"}
                icon="close-line"
                size="sm"
                alt="Close"
                className={styles["toaster__close"]}
              />
            }
          />
          {toast.action ? (
            <Button
              {...toast.action}
              interactive={color ? `${color}_fill` : true}
            >
              {toast.action.children}
            </Button>
          ) : null}
        </View>
      </ToastPrimitive.Root>
    );
  });
}

export { Toaster };

export declare namespace Toaster {
  export type Props = ToasterProps;
}
