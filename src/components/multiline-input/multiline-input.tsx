import type { useRender } from "@base-ui/react";
import autosize from "autosize";
import clsx from "clsx";
import { useEffect, useRef } from "react";

import { mergeRefs } from "~/-utils";

import { View } from "../view";

import styles from "../input/input.module.css";

interface MultilineInputProps extends useRender.ComponentProps<"textarea"> {
  /** Automatically resize textarea. Defaults to false. */
  autosize?: boolean;
}

function MultilineInput({
  autosize = false,
  className,
  ref,
  ...props
}: MultilineInputProps) {
  const autosizeRef = useAutosize(autosize);

  return (
    <View
      interactive="fill-outline"
      render={
        <textarea
          className={clsx(
            styles["input"],
            autosize && styles["input_autosize"],
            className,
          )}
          ref={mergeRefs(ref, autosizeRef)}
          {...props}
        ></textarea>
      }
    />
  );
}

function useAutosize(enabled: boolean) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) {
      return;
    }
    autosize(element);
    return () => {
      autosize.destroy(element);
    };
  }, [enabled]);

  return ref;
}

export { MultilineInput };

export declare namespace MultilineInput {
  export type Props = MultilineInputProps;
}
