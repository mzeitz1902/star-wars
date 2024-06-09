import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import plugin from "eslint-plugin-cypress/flat";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  plugin.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-namespace": "off",
    },
  },
];
