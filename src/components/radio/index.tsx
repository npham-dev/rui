import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import clsx from "clsx";
import { createContext, useContext } from "react";

import { Text } from "../text";
import { View, type Color } from "../view";

import radioGroupStyles from "./radio-group.module.css";
import radioStyles from "./radio.module.css";

const RadioContext = createContext<Color>("primary");

export function RadioGroup({
  color = "primary",
  className,
  ...props
}: RadioGroupPrimitive.Props & {
  /** Optional color for child radio elements. Defaults to "primary". */
  color?: Color;
}) {
  return (
    <RadioContext.Provider value={color}>
      <RadioGroupPrimitive
        className={clsx(radioGroupStyles["radio-group"], className)}
        {...props}
      />
    </RadioContext.Provider>
  );
}

export function Radio({
  color,
  label,
  className,
  ...props
}: RadioPrimitive.Root.Props & {
  /** Optional label. If one is provided, we wrap radio in a label element. Otherwise, we just return a standard radio. */
  label?: string;

  /** Optional color. Defaults to the radio group color, often primary. */
  color?: Color;
}) {
  const colorContext = useContext(RadioContext);
  const normalizedColor: Color = color || colorContext || "primary";

  const radio = (
    <View
      render={<RadioPrimitive.Root {...props} />}
      interactive="fill-outline"
      color={normalizedColor}
      className={clsx(radioStyles["radio"], className)}
    >
      <RadioPrimitive.Indicator className={radioStyles["radio__indicator"]} />
    </View>
  );

  if (label) {
    return (
      <label className={radioStyles["radio__label"]}>
        {radio} <Text>{label}</Text>
      </label>
    );
  }

  return radio;
}
