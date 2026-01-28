import { mergeProps, useRender } from "@base-ui/react";

import styles from "./anchor.module.css";

export type AnchorProps = useRender.ComponentProps<"a"> & {
  /**
   * Open this link in a new tab
   */
  external?: boolean;
};

export function Anchor({ external, render, ...props }: AnchorProps) {
  const element = useRender({
    defaultTagName: "a",
    render,
    props: mergeProps(props, {
      className: styles["anchor"],
      ...(external
        ? {
            target: "_blank",
            rel: "noreferrer",
          }
        : {}),
    }),
  });

  return element;
}
