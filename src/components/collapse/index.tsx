import { mergeProps, useRender } from "@base-ui/react";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import styles from "./collapse.module.css";

interface CollapseProps extends useRender.ComponentProps<"div"> {
  /** Shrink or expand the div. Defaults to true. */
  expand?: boolean;

  children?: ReactNode;

  /** Supplied as a dependency to recalculate the height of the children */
  recalculate?: unknown;
}

export function Collapse({
  expand = true,
  render,
  recalculate,
  ...props
}: CollapseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // calculate height of children
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const clonedRef = ref.current.cloneNode(true) as HTMLElement;
    clonedRef.removeAttribute("style");
    clonedRef.style.width = `${ref.current.offsetWidth}px`;
    clonedRef.className = styles["collapse_hidden"];
    document.body.appendChild(clonedRef);
    setHeight(clonedRef.offsetHeight);
    clonedRef.remove();
  }, [recalculate]);

  const element = useRender({
    defaultTagName: "div",
    render,
    ref,
    props: mergeProps(props, {
      "aria-hidden": !expand,
      className: clsx(styles["collapse"], expand && styles["collapse_expand"]),
      style: { "--collapse-height": `${height}px` },
    }),
  });

  return element;
}
