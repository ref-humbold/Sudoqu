import eslintJs from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintTs from "typescript-eslint";

import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default defineConfig([
  globalIgnores(["**/node_modules", "**/dist"]),
  eslintJs.configs.recommended,
  eslintTs.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs["recommended-latest"],
  prettierPlugin,
  {
    name: "Custom",
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "eqeqeq": [
        "warn",
        "always",
        {
          null: "ignore"
        }
      ],
      "no-console": "warn",
      "no-empty-function": "off",
      "no-use-before-define": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "warn",
      "prefer-destructuring": "warn",
      "quotes": ["warn", "double"],
      "semi": ["error", "always"],
      "space-before-function-paren": [
        "warn",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always"
        }
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto"
        }
      ],
      "@typescript-eslint/array-type": [
        "warn",
        {
          default: "array"
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "warn",
        {
          accessibility: "explicit",

          overrides: {
            constructors: "no-public"
          }
        }
      ],

      "@typescript-eslint/explicit-module-boundary-types": [
        "warn",
        {
          allowArgumentsExplicitlyTypedAsAny: true
        }
      ],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/prefer-readonly": "warn",
      "react/display-name": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
]);
