import "@ianvs/prettier-plugin-sort-imports";

/**
 * @filename prettier.config.mjs
 * @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
export default {
  singleQuote: false,
  semi: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-css-order"],
  importOrder: ["^@core/(.*)$", "", "^[./]"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  cssDeclarationSorterOrder: "concentric-css",
};
