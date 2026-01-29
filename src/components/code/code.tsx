import clsx from "clsx";
import Prism from "prismjs";
import { useMemo } from "react";

import { Surface } from "../surface";
import { Text } from "../text";
import { View } from "../view";

// TODO investigate shiki

/**
 * Are you looking for themes?
 * You should define theme in [data-theme].
 *
 * I highly recommend using "postcss-nested-import", so you can do stuff like
 * [data-theme="light"] {
 *  @nested-import "prismjs/themes/prism.css";
 * }
 */

import styles from "./code.module.css";

interface CodeProps {
  /** Use a specific language (you must import the themes you need) */
  language?: string;

  /** Optional file name or title */
  title?: string;

  className?: string;

  children?: string;
}

function Code({
  language = "javascript",
  children = "",
  title,
  className,
}: CodeProps) {
  const html = useMemo(
    () =>
      Prism.highlight(
        children,
        Prism.languages[language] ?? Prism.languages.javascript,
        language,
      ),
    [children, language],
  );

  return (
    <View className={clsx(styles["code__root"], className)}>
      {title ? (
        <Surface elevated className={styles["code__title"]}>
          <Text size="sm" color="dimmer">
            {title}
          </Text>
        </Surface>
      ) : null}
      <Surface
        elevated
        className={clsx(styles["code"], title && styles["code_title"])}
      >
        <pre>
          <code
            className={styles["code__value"]}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          ></code>
        </pre>
      </Surface>
    </View>
  );
}

export { Code };

export declare namespace Code {
  export type Props = CodeProps;
}
