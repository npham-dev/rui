import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import clsx from "clsx";

import { Button } from "../button";
import { Heading } from "../heading";
import { IconButton } from "../icon-button";
import { Surface } from "../surface";
import { Text } from "../text";
import { View, type Color } from "../view";
import { useToastManager } from "./use-toast-manager";

import styles from "./toast.module.css";

export const ToastProvider = ToastPrimitive.Provider;

const toastTypeColor: Record<string, Color> = {
  info: "blue",
  error: "red",
  warning: "yellow",
  success: "green",
};

export function ToastViewport() {
  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport className={styles["toast__viewport"]}>
        <ToastList />
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
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
          styles["toast"],
          color
            ? styles[`toast_variant_colorway`]
            : styles["toast_variant_neutral"],
        )}
        render={<Surface background="default" color={color} />}
      >
        <View
          render={<ToastPrimitive.Content />}
          className={styles["toast__content"]}
        >
          <View className={styles["toast__row"]}>
            <View className={styles["toast__header"]}>
              {toast.title ? (
                <Heading
                  level={2}
                  size="lg"
                  color="inherit"
                  className={styles["toast__title"]}
                >
                  {toast.title}
                </Heading>
              ) : null}

              <ToastPrimitive.Description
                render={<Text multiline color={color ? "inherit" : "dimmer"} />}
                className={styles["toast__description"]}
              />
            </View>

            {/* close icon will appear over content UNLESS we disable aboslute positioning */}
            <ToastPrimitive.Close
              render={
                <IconButton
                  className={toast.title ? styles["toast__close"] : undefined}
                  interactive={color ? `${color}_no-fill` : "no-fill"}
                  icon="close-line"
                  size="sm"
                  alt="Close"
                />
              }
            />
          </View>
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
