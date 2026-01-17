/// <reference types="vitest/config" />
// https://vite.dev/config/

import { fileURLToPath } from "node:url";
import path from "path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { glob } from "glob";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import tsconfigPaths from "vite-tsconfig-paths";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const IGNORE_STORIES = ["src/**/*.stories.tsx", "src/stories/**/*"];

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    libInjectCss(),
    react(),
    dts({
      include: ["src"],
      exclude: IGNORE_STORIES,
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  build: {
    minify: "esbuild",
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
      },
      formats: ["es"],
    },
    assetsInlineLimit: 0,
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "remixicon/fonts/remixicon.symbol.svg",
      ],
      input: Object.fromEntries(
        glob
          .sync(
            [
              "src/**/!(*.d).{ts,tsx}",
              "src/styles/core.css",
              "src/styles/reset.css",
              "src/integrations/tailwind.css",
            ],
            {
              ignore: IGNORE_STORIES,
            },
          )
          .map((file) => [
            path.relative(
              "src",
              file.substring(0, file.length - path.extname(file).length),
            ),
            path.resolve(__dirname, file),
          ]),
      ),
      output: {
        // for Next.js support
        // https://github.com/vitejs/vite/issues/1579
        intro: (chunk) => {
          if (
            chunk.fileName.startsWith("components") &&
            chunk.fileName.endsWith("index.js")
          ) {
            return `"use client";`;
          }
          return "";
        },
        globals: {
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
        },
      },
    },
    copyPublicDir: false,
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
