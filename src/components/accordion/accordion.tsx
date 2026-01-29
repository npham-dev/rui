import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import clsx from "clsx";
import type { ReactNode } from "react";

import { textify } from "~/-utils";

import { Icon } from "../icon";
import { Surface } from "../surface";
import { View } from "../view";

import styles from "./accordion.module.css";

interface AccordionItemProps extends AccordionPrimitive.Item.Props {
  /** The content to display in the accordion header trigger. */
  header: ReactNode;

  /** Apply className to the accordion trigger */
  className?: string;
}

function AccordionItem({
  header,
  children,
  className,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item className={styles["accordion"]} {...props}>
      <AccordionPrimitive.Header className={styles["accordion__header"]}>
        <Surface
          elevated
          render={
            <View
              interactive="list-item"
              render={
                <AccordionPrimitive.Trigger
                  className={clsx(styles["accordion__trigger"], className)}
                />
              }
            >
              {textify(header)}
              <Icon
                name="close-line"
                className={styles["accordion__trigger-icon"]}
              />
            </View>
          }
        />
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Panel className={styles["accordion__panel"]}>
        <View className={styles["accordion__panel-content"]}>
          {textify(children, {
            multiline: true,
          })}
        </View>
      </AccordionPrimitive.Panel>
    </AccordionPrimitive.Item>
  );
}

export const Accordion = Object.assign(AccordionPrimitive.Root, {
  Item: AccordionItem,
});

export declare namespace Accordion {
  export type Props = AccordionPrimitive.Root.Props;

  export namespace Item {
    export type Props = AccordionItemProps;
  }
}
