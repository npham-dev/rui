# @koide-labs/ui

Accessible, fresh, and simple.

- Consistent design with CSS Modules
- Token-first development for site-wide theming
- Accessible components with [Base UI](https://base-ui.com/)

## Installation

```bash
pnpm add @koide-labs/ui remixicon

# only for react-markdown integration
pnpm add react-markdown
```

Because we import CSS modules for each component, you must add this to your Vite config.

```ts
import { defineConfig } from "vite";

export default defineConfig({
  ssr: {
    noExternal: ["@koide-labs/ui"],
  },
});
```

Then, include the necessary fonts.

- IBM Plex Sans
- IBM Plex Mono

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossorigin="anonymous"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
/>
```

## Styling

I highly recommend using TailwindCSS.

```css
@import "tailwindcss" important;
@import "@koide-labs/ui/integrations/tailwind.css";
@import "@koide-labs/ui/styles/core.css";
```

## Development

Run the Storybook development server.

```
pnpm run storybook
```
