import fs from "fs/promises";
import path from "path";
import process from "process";
import url from "url";
import * as prettier from "prettier";
import remixicon from "remixicon/fonts/remixicon.glyph.json";

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const PRETTIER_CONFIG = path.resolve(__dirname, "../prettier.config.mjs");
const EXPORT_FILE = path.resolve(
  __dirname,
  "../src/components/icon/icon-names.ts",
);

async function buildIconTypes() {
  const text = `export type IconName = ${Object.keys(remixicon)
    .map((icon) => `"${icon}"`)
    .join("|")};`;
  const options = await prettier.resolveConfig(PRETTIER_CONFIG);
  const formatted = await prettier.format(text, {
    ...options,
    parser: "typescript",
  });
  await fs.writeFile(EXPORT_FILE, formatted);
}

buildIconTypes()
  .then(() => {
    console.info("Built icon types.");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    console.error("Failed to build icon types.");
    process.exit(1);
  });
