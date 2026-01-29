import clsx from "clsx";
import { format } from "date-fns/format";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useState } from "react";

import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { View } from "../view";

import styles from "./timestamp.module.css";

const A_LONG_TIME_AGO_DATE = new Date(0);

interface TimestampProps {
  date: string | number | Date;

  /**
   * By default (`'relative'`), the timestamp will show a relative
   * date and an absolute date on hover.
   *
   * Passing `'absolute'` will show the absolute date instead. During server
   * side rendering, this option is not respected, it will use relative date/time
   * instead to avoid hydration issues.
   *
   * This value can also be set to `'switch'` which will show the relative
   * date but allow the user to switch to absolute by clicking on the component
   * by clicking on the timestamp, all "switch" timestamps are synchronized
   * with a global boolean.
   */
  dateFormat?: "relative" | "absolute" | "switch";

  color?: Text.Props["color"];

  size?: Text.Props["size"];

  className?: string;
}

const Timestamp = ({
  date,
  dateFormat: initialDateFormat = "relative",
  color,
  size,
  className,
}: TimestampProps) => {
  const switchable = initialDateFormat === "switch";
  const [showAbsolute, setShowAbsolute] = useState(
    () => initialDateFormat === "absolute",
  );

  const { triggerDate, contentDate } = getDate(date, showAbsolute);
  const triggerText = (
    <Text
      color={color}
      size={size}
      className={clsx(styles["timestamp"], className)}
    >
      {triggerDate}
    </Text>
  );

  return (
    <Tooltip
      trigger={
        switchable ? (
          <View
            render={<button />}
            className={styles["timestamp_interactive"]}
            onClick={() => setShowAbsolute((absolute) => !absolute)}
            interactive="no-fill"
            role="switch"
            tabIndex={0}
            aria-checked={showAbsolute}
            onKeyDown={(e) => {
              if (e.code === "Space" || e.code === "Enter") {
                e.preventDefault();
                setShowAbsolute((absolute) => !absolute);
              }
            }}
          >
            {triggerText}
          </View>
        ) : (
          <span>{triggerText}</span>
        )
      }
    >
      {contentDate}
    </Tooltip>
  );
};

/**
 * Get the absolute and relative dates \
 * Also assigns them to the correct properties (content vs trigger)
 * @param date Timestamp
 * @param showAbsolute Show the absolute date if true, relative if false
 * @returns The dates of the tooltip content and tooltip trigger
 */
function getDate(date: TimestampProps["date"], showAbsolute: boolean) {
  const absoluteDate = toAbsoluteDate(date);
  const relativeDate = toRelativeDate(date);

  // default is relative date
  let contentDate = absoluteDate;
  let triggerDate = relativeDate;

  // if absolute, swap the dates
  if (showAbsolute) {
    contentDate = relativeDate;
    triggerDate = absoluteDate;
  }

  return {
    contentDate,
    triggerDate,
  };
}

function toAbsoluteDate(date: TimestampProps["date"]) {
  return format(new Date(date), "h:mm bbb, MMM dd, yyyy");
}

function toRelativeDate(date: TimestampProps["date"]) {
  const asDate = new Date(date);
  if (asDate <= A_LONG_TIME_AGO_DATE) {
    return "a long time ago";
  }

  return formatDistanceToNow(asDate, { addSuffix: true });
}

export { Timestamp };

export declare namespace Timestamp {
  export type Props = TimestampProps;
}
