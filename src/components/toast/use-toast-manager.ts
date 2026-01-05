import {
  Toast,
  type ToastManagerAddOptions,
  type UseToastManagerReturnValue,
} from "@base-ui/react/toast";

import type { Override } from "~/-types";

import type { ButtonProps } from "../button";

/**
 * A whole lot of useless effort
 * Basically I want "actionProps" to be "action"
 * And I want "action" to use ButtonProps with text
 */

type ActionProps = {
  type?: "info" | "error" | "warning" | "success" | (string & {});
  action?: ButtonProps;
};

type FrameworkAddOptions<Data extends object> = Omit<
  ToastManagerAddOptions<Data>,
  "actionProps"
> &
  ActionProps;

type FrameworkUpdateOptions<Data extends object> = Partial<
  FrameworkAddOptions<Data>
>;

type FrameworkPromiseOptions<Value, Data extends object> = {
  loading: string | FrameworkUpdateOptions<Data>;
  success:
    | string
    | FrameworkUpdateOptions<Data>
    | ((result: Value) => string | FrameworkUpdateOptions<Data>);
  error:
    | string
    | FrameworkUpdateOptions<Data>
    | ((error: unknown) => string | FrameworkUpdateOptions<Data>);
};

type FrameworkToastManager = Override<
  UseToastManagerReturnValue,
  {
    toasts: Array<UseToastManagerReturnValue["toasts"][number] & ActionProps>;
    add<Data extends object>(options: FrameworkAddOptions<Data>): string;
    update<Data extends object>(
      id: string,
      updates: FrameworkUpdateOptions<Data>,
    ): void;
    promise<Value, Data extends object>(
      promise: Promise<Value>,
      options: FrameworkPromiseOptions<Value, Data>,
    ): Promise<Value>;
  }
>;

export function useToastManager() {
  const toastManager = Toast.useToastManager();
  return toastManager as unknown as FrameworkToastManager;
}
