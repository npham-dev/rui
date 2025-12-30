/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-selector-bem-pattern"],
  /**
   * I kind of want to ignore globals since we break a shit ton of rules
   * https://stylelint.io/user-guide/configure#ignorefiles
   */
  ignoreFiles: ["src/styles/**/*.css"],
  rules: {
    /**
     * We want to use BEM instead
     * Defined here:
     * https://github.com/postcss/postcss-bem-linter?tab=readme-ov-file
     * https://en.bem.info/methodology/naming-convention/
     */
    "selector-class-pattern": null,
    "plugin/selector-bem-pattern": {
      preset: "bem",
      implicitComponents: true,
    },
    "max-nesting-depth": [
      1,
      {
        ignore: ["pseudo-classes", "blockless-at-rules"],
      },
    ],
  },
};
