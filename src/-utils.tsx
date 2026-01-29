import type * as React from "react";

import { Text } from "~/components/text";

export function omit<T extends object>(
  record: T,
  keys: (keyof T)[],
): Omit<T, (typeof keys)[number]> {
  const shallowClone = { ...record };
  for (const key of keys) {
    delete shallowClone[key];
  }

  return shallowClone;
}

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
export function textify(
  node: React.ReactNode,
  props: Text.Props = {
    // TODO look for any regressions
    color: "inherit",
  },
) {
  return typeof node === "string" ? <Text {...props}>{node}</Text> : node;
}

/**
 * Merge many refs to pass to one element.
 *
 * Adapted from
 * https://github.com/gregberge/react-merge-refs/blob/main/src/index.tsx
 */
export function mergeRefs<T = unknown>(
  ...refs: Array<React.RefObject<T> | React.RefAttributes<T>["ref"] | undefined>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        (ref as React.RefObject<T | null>).current = value;
      }
    });
  };
}
