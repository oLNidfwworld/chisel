// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "vue/html-self-closing": [
        "warn",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
        },
      ],
      "vue/no-multiple-template-root": ["off"],
      "no-irregular-whitespace": ["off"],
    },
  },
);
