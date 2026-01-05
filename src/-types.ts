export type ValueOf<T> = T[keyof T];

export type Override<T, U> = Omit<T, keyof U> & U;

export type InvertRecord<T extends Record<string, string>> = Record<
  T[keyof T],
  keyof T
>;
