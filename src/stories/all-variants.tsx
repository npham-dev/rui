import { cloneElement, type CSSProperties, type ReactElement } from "react";

import { Surface } from "~/components/surface";
import { Text } from "~/components/text";
import { View } from "~/components/view";
import { tokens } from "~/styles/tokens";

export function AllVariants(props: {
  /** What's the variant actually called. */
  variantName: string;
  /** Possible values for the variant. */
  variants: string[];
  /** Element that we'll clone with different variants. */
  element: ReactElement;
  /** Override styles on wrapper. */
  style?: CSSProperties;
}) {
  return (
    <Surface
      elevated
      style={{
        flexDirection: "column",
        gap: tokens.space16,
        padding: tokens.space16,
        ...props.style,
      }}
    >
      {props.variants.map((variant) => (
        <View key={variant} style={{ gap: tokens.space2 }}>
          <Text color="dimmest" size="sm">
            {variant}
          </Text>
          {cloneElement(props.element, {
            [props.variantName]: variant,
          })}
        </View>
      ))}
    </Surface>
  );
}
