import type { ReactNode } from "react";

import { Text, type TextProps } from "./components/text";

export function pick<T extends Record<string, string>, K extends keyof T>(
  record: T,
  keys: Array<K>,
) {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in record) {
      result[key] = record[key];
    }
  }
  return result;
}

/**
 * Convert a ReactNode into a Text element if it's a string
 * This allows us to accept ReactNode props but properly convert them into text
 * @param node ReactNode to conver to text
 * @param props optional text props
 * @returns ReactNode or Text
 */
export function textify(node: ReactNode, props: TextProps = {}) {
  return typeof node === "string" ? <Text {...props}>{node}</Text> : node;
}
