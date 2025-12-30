import type { Preview } from "@storybook/react-vite";

import "../src/styles/core.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  decorators: [
    (Story) => {
      document.body.dataset.theme = "light";

      return (
        <div className="root">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
