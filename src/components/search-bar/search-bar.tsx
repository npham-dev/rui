import clsx from "clsx";
import React from "react";

import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { Input } from "../input";
import { Spinner } from "../spinner";
import { View } from "../view";

import styles from "./search-bar.module.css";

interface SearchBarProps extends React.ComponentPropsWithoutRef<"input"> {
  /**
   * Is the search bar loading or processing?
   */
  loading?: boolean;

  /**
   * Called when the input is cleared
   */
  onClear?: () => void;
}

function SearchBar({ loading, onClear, className, ...props }: SearchBarProps) {
  return (
    <View className={clsx(styles["search-bar"], className)}>
      <Input className={styles["search-bar__input"]} {...props} />

      {!loading && !props.value ? (
        <View className={styles["search-bar__icon"]}>
          <Icon name="search-line" />
        </View>
      ) : null}

      {loading ? <Spinner className={styles["search-bar__icon"]} /> : null}

      {!loading && props.value ? (
        <View
          className={clsx(
            styles["search-bar__icon"],
            styles["search-bar__icon_close"],
          )}
        >
          <IconButton
            icon="close-line"
            alt="Clear"
            size="sm"
            disabled={props.disabled}
            onClick={onClear}
          />
        </View>
      ) : null}
    </View>
  );
}

export { SearchBar };

export declare namespace SearchBar {
  export type Props = SearchBarProps;
}
