/**
 * Size variants for widths, buttons, icon sizes, you name it!
 * Use `Extract` if you don't want to support all of them but ensure we reuse
 * correct values.
 * @example
 * // only support a subset of size variants
 * Extract<SizeVariant, "sm" | "md" | "lg">
 */
export type SizeVariant = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type ValueOf<T> = T[keyof T];

export type SpaceToken = ValueOf<typeof spaceTokens>;
export type ColorToken = ValueOf<typeof colorTokens>;
export type InteractiveToken = ValueOf<typeof interactiveTokens>;
export type Token = ValueOf<typeof tokens>;

export const colorTokens = {
  backgroundRoot: "var(--background-root)",
  backgroundDefault: "var(--background-default)",
  backgroundHigher: "var(--background-higher)",
  backgroundHighest: "var(--background-highest)",
  backgroundOverlay: "var(--background-overlay)",
  foregroundDefault: "var(--foreground-default)",
  foregroundDimmer: "var(--foreground-dimmer)",
  foregroundDimmest: "var(--foreground-dimmest)",
  outlineDimmest: "var(--outline-dimmest)",
  outlineDimmer: "var(--outline-dimmer)",
  outlineDefault: "var(--outline-default)",
  outlineStronger: "var(--outline-stronger)",
  outlineStrongest: "var(--outline-strongest)",
  primaryDimmest: "var(--primary-dimmest)",
  primaryDimmer: "var(--primary-dimmer)",
  primaryDefault: "var(--primary-default)",
  primaryStronger: "var(--primary-stronger)",
  primaryStrongest: "var(--primary-strongest)",
  positiveDimmest: "var(--positive-dimmest)",
  positiveDimmer: "var(--positive-dimmer)",
  positiveDefault: "var(--positive-default)",
  positiveStronger: "var(--positive-stronger)",
  positiveStrongest: "var(--positive-strongest)",
  negativeDimmest: "var(--negative-dimmest)",
  negativeDimmer: "var(--negative-dimmer)",
  negativeDefault: "var(--negative-default)",
  negativeStronger: "var(--negative-stronger)",
  negativeStrongest: "var(--negative-strongest)",
  redDimmest: "var(--red-dimmest)",
  redDimmer: "var(--red-dimmer)",
  redDefault: "var(--red-default)",
  redStronger: "var(--red-stronger)",
  redStrongest: "var(--red-strongest)",
  orangeDimmest: "var(--orange-dimmest)",
  orangeDimmer: "var(--orange-dimmer)",
  orangeDefault: "var(--orange-default)",
  orangeStronger: "var(--orange-stronger)",
  orangeStrongest: "var(--orange-strongest)",
  yellowDimmest: "var(--yellow-dimmest)",
  yellowDimmer: "var(--yellow-dimmer)",
  yellowDefault: "var(--yellow-default)",
  yellowStronger: "var(--yellow-stronger)",
  yellowStrongest: "var(--yellow-strongest)",
  limeDimmest: "var(--lime-dimmest)",
  limeDimmer: "var(--lime-dimmer)",
  limeDefault: "var(--lime-default)",
  limeStronger: "var(--lime-stronger)",
  limeStrongest: "var(--lime-strongest)",
  greenDimmest: "var(--green-dimmest)",
  greenDimmer: "var(--green-dimmer)",
  greenDefault: "var(--green-default)",
  greenStronger: "var(--green-stronger)",
  greenStrongest: "var(--green-strongest)",
  tealDimmest: "var(--teal-dimmest)",
  tealDimmer: "var(--teal-dimmer)",
  tealDefault: "var(--teal-default)",
  tealStronger: "var(--teal-stronger)",
  tealStrongest: "var(--teal-strongest)",
  blueDimmest: "var(--blue-dimmest)",
  blueDimmer: "var(--blue-dimmer)",
  blueDefault: "var(--blue-default)",
  blueStronger: "var(--blue-stronger)",
  blueStrongest: "var(--blue-strongest)",
  blurpleDimmest: "var(--blurple-dimmest)",
  blurpleDimmer: "var(--blurple-dimmer)",
  blurpleDefault: "var(--blurple-default)",
  blurpleStronger: "var(--blurple-stronger)",
  blurpleStrongest: "var(--blurple-strongest)",
  purpleDimmest: "var(--purple-dimmest)",
  purpleDimmer: "var(--purple-dimmer)",
  purpleDefault: "var(--purple-default)",
  purpleStronger: "var(--purple-stronger)",
  purpleStrongest: "var(--purple-strongest)",
  magentaDimmest: "var(--magenta-dimmest)",
  magentaDimmer: "var(--magenta-dimmer)",
  magentaDefault: "var(--magenta-default)",
  magentaStronger: "var(--magenta-stronger)",
  magentaStrongest: "var(--magenta-strongest)",
  pinkDimmest: "var(--pink-dimmest)",
  pinkDimmer: "var(--pink-dimmer)",
  pinkDefault: "var(--pink-default)",
  pinkStronger: "var(--pink-stronger)",
  pinkStrongest: "var(--pink-strongest)",
  greyDimmest: "var(--grey-dimmest)",
  greyDimmer: "var(--grey-dimmer)",
  greyDefault: "var(--grey-default)",
  greyStronger: "var(--grey-stronger)",
  greyStrongest: "var(--grey-strongest)",
  brownDimmest: "var(--brown-dimmest)",
  brownDimmer: "var(--brown-dimmer)",
  brownDefault: "var(--brown-default)",
  brownStronger: "var(--brown-stronger)",
  brownStrongest: "var(--brown-strongest)",
  black: "var(--black)",
  white: "var(--white)",
} as const;

export const interactiveTokens = {
  surfaceBackground: "var(--surface-background)",
  interactiveBackground: "var(--surface-interactive-background)",
  interactiveBackgroundActive: "var(--surface-interactive-background--active)",
  interactiveBorder: "var(--surface-interactive-border)",
  interactiveBorderHover: "var(--surface-interactive-border--hover)",
} as const;

export const colorwayTokens = {
  colorwayDimmest: "var(--view-colorway-dimmest)",
  colorwayDimmer: "var(--view-colorway-dimmer)",
  colorwayDefault: "var(--view-colorway-default)",
  colorwayStronger: "var(--view-colorway-stronger)",
  colorwayStrongest: "var(--view-colorway-strongest)",
} as const;

export const spaceTokens = {
  space1: "var(--space-1)",
  space2: "var(--space-2)",
  space4: "var(--space-4)",
  space6: "var(--space-6)",
  space8: "var(--space-8)",
  space12: "var(--space-12)",
  space16: "var(--space-16)",
  space20: "var(--space-20)",
  space24: "var(--space-24)",
  space28: "var(--space-28)",
  space32: "var(--space-32)",
  space40: "var(--space-40)",
  space48: "var(--space-48)",
  space56: "var(--space-56)",
  space64: "var(--space-64)",
  space80: "var(--space-80)",
  space96: "var(--space-96)",
  space128: "var(--space-128)",
  space256: "var(--space-256)",
  spaceDefault: "var(--space-default)",
} as const;

export const borderTokens = {
  borderRadius1: "var(--border-radius-1)",
  borderRadius2: "var(--border-radius-2)",
  borderRadius4: "var(--border-radius-4)",
  borderRadius8: "var(--border-radius-8)",
  borderRadius12: "var(--border-radius-12)",
  borderRadius16: "var(--border-radius-16)",
  borderRadiusDefault: "var(--border-radius-default)",
  borderRadiusRound: "var(--border-radius-round)",
  borderWidthDefault: "var(--border-width-default)",
} as const;

export const shadowTokens = {
  shadow1: "var(--shadow-1)",
  shadow2: "var(--shadow-2)",
  shadow3: "var(--shadow-3)",
  shadowDefault: "var(--shadow-default)",
} as const;

export const typographyTokens = {
  fontFamilyDefault: "var(--font-family-default)",
  fontFamilyCode: "var(--font-family-code)",

  fontSizeSmall: "var(--font-size-small)",
  fontSizeDefault: "var(--font-size-default)",
  fontSizeSubheadDefault: "var(--font-size-subhead-default)",
  fontSizeSubheadBig: "var(--font-size-subhead-big)",
  fontSizeHeaderDefault: "var(--font-size-header-default)",
  fontSizeHeaderBig: "var(--font-size-header-big)",

  lineHeightSmall: "var(--line-height-small)",
  lineHeightDefault: "var(--line-height-default)",
  lineHeightSubheadDefault: "var(--line-height-subhead-default)",
  lineHeightSubheadBig: "var(--line-height-subhead-big)",
  lineHeightHeaderDefault: "var(--line-height-header-default)",
  lineHeightHeaderBig: "var(--line-height-header-big)",
  lineHeightSingle: "var(--line-height-single)",
  lineHeightInput: "var(--line-height-input)",

  fontWeightRegular: "var(--font-weight-regular)",
  fontWeightMedium: "var(--font-weight-medium)",
  fontWeightBold: "var(--font-weight-bold)",
} as const;

export const transitionTokens = {
  transitionDurationSnappy: "var(--transition-duration-snappy)",
  transitionTimingFunctionSnappy: "var(--transition-timing-function-snappy)",
  transitionDurationChill: "var(--transition-duration-chill)",
  transitionTimingFunctionChill: "var(--transition-timing-function-chill)",
} as const;

export const tokens = {
  ...colorTokens,
  ...colorwayTokens,
  ...interactiveTokens,
  ...borderTokens,
  ...spaceTokens,
  ...shadowTokens,
  ...typographyTokens,
  ...transitionTokens,
} as const;

type InvertedRecord<T extends Record<string, string>> = Record<
  T[keyof T],
  keyof T
>;

function invertRecord<T extends Record<string, string>>(record: T) {
  return Object.entries(record).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value]: key,
    }),
    {},
  ) as InvertedRecord<T>;
}

const invertedTokens = invertRecord({
  ...borderTokens,
  ...spaceTokens,
});

const rawTokenValues = {
  borderRadius1: 1,
  borderRadius2: 2,
  borderRadius4: 4,
  borderRadius8: 8,
  borderRadius12: 12,
  borderRadius16: 16,
  borderRadiusDefault: 8,
  borderRadiusRound: 1028,
  borderWidthDefault: 1,
  space1: 1,
  space2: 2,
  space4: 4,
  space6: 6,
  space8: 8,
  space12: 12,
  space16: 16,
  space20: 20,
  space24: 24,
  space28: 28,
  space32: 32,
  space40: 40,
  space48: 48,
  space56: 56,
  space64: 64,
  space80: 80,
  space96: 96,
  space128: 128,
  space256: 256,
  spaceDefault: 8,
} as const;

/**
 * Get the actual value from a CSS variable \
 * You really can't get color values reliably without extracting them from the DOM because of theming
 * @param token (CSS variable)
 * @returns Raw value, or null if one is not found
 *
 * @example
 * getTokenValue(tokens.space80)
 * getTokenValue("var(--space-80)")
 */
export function getTokenValue(token: keyof typeof invertedTokens) {
  // TODO create JS values alongside css themes
  // something like getTokenValue(token.primaryDefault, "light")
  // or try dom extraction?
  const tokenKey = invertedTokens[token];
  return rawTokenValues[tokenKey];
}
