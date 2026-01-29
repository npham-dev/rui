import { mergeProps, useRender } from "@base-ui/react";

import styles from "./anchor.module.css";

interface AnchorProps extends useRender.ComponentProps<"a"> {
  /**
   * Open this link in a new tab
   */
  external?: boolean;
}

function Anchor({ external, render, ...props }: AnchorProps) {
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

export { Anchor };

export declare namespace Anchor {
  export type Props = AnchorProps;
}
