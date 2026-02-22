// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const localRules = require("./eslint-rules/require-readonly-inputs");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      local: { rules: { "require-readonly-inputs": localRules } },
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            constructors: "no-public",
          },
        },
      ],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@angular-eslint/prefer-output-readonly": "error",
      "local/require-readonly-inputs": "error",
      "@angular-eslint/prefer-signals": "error",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-decorated-field",
            "protected-decorated-field",
            "public-static-field",
            "public-instance-field",
            "private-static-field",
            "private-instance-field",
            "constructor",
            "public-static-method",
            "public-instance-method",
            "private-static-method",
            "private-instance-method",
          ],
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "memberLike",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
        {
          selector: "memberLike",
          modifiers: ["public"],
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "memberLike",
          modifiers: ["public", "readonly"],
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "forbid",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
