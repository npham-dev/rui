import { mergeProps, useRender } from "@base-ui/react";

import { Icon } from "../icon";

import styles from "./anchor.module.css";

export type AnchorProps = useRender.ComponentProps<"a"> & {
  /**
   * Open this link in a new tab
   */
  external?: boolean;
};

export function Anchor({ external, render, children, ...props }: AnchorProps) {
  const element = useRender({
    defaultTagName: "a",
    render,
    props: mergeProps(
      {
        className: styles.anchor,
        ...(external
          ? {
              target: "_blank",
              rel: "noreferrer",
            }
          : {}),
        children: (
          <>
            {children}
            {external ? (
              <Icon
                name="external-link-line"
                size="sm"
                className={styles.anchor__icon}
              />
            ) : null}
          </>
        ),
      },
      props,
    ),
  });

  return element;
}
