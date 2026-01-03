import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { textify } from "~/-utils";
import { cn } from "~/lib/cn";
import type { ComponentProps, ReactNode } from "react";

import { Icon } from "../icon";
import { Surface } from "../surface";
import { View } from "../view";
import styles from "./accordion.module.css";

export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = Omit<
  ComponentProps<typeof AccordionPrimitive.Item>,
  "render"
> & {
  /** The content to display in the accordion header trigger. */
  header: ReactNode;

  /** The content to display within the expandable accordion panel. */
  content: ReactNode;

  /** Apply className to the accordion trigger */
  className?: string;
};

export function AccordionItem({
  header,
  content,
  className,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item className={styles.accordion} {...props}>
      <AccordionPrimitive.Header className={styles.accordion__header}>
        <Surface
          elevated
          render={
            <View
              interactive="list-item"
              render={
                <AccordionPrimitive.Trigger
                  className={cn(styles.accordion__trigger, className)}
                >
                  {textify(header)}
                  <Icon
                    name="close-line"
                    className={styles["accordion__trigger-icon"]}
                  />
                </AccordionPrimitive.Trigger>
              }
            />
          }
        />
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Panel className={styles.accordion__panel}>
        <View className={styles["accordion__panel-content"]}>
          {textify(content, {
            multiline: true,
          })}
        </View>
      </AccordionPrimitive.Panel>
    </AccordionPrimitive.Item>
  );
}
