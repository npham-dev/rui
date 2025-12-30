/**
 * @filename lint-staged.config.cjs
 * @type {import("lint-staged").Configuration}
 */
export default {
  "*": ["npm run format"],
  // https://github.com/lint-staged/lint-staged?tab=readme-ov-file#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
  "**/*.{ts,tsx}?(x)": () => ["npm run typecheck"],
  "**/*.{ts,tsx}": ["npm run lint:ts"],
  "**/*.css": ["npm run lint:style"],
};
