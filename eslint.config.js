// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const requireReadonlyInputs = require("./eslint-rules/require-readonly-inputs");
const memberOrdering = require("./eslint-rules/member-ordering"); // ← dodaj

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
      local: {
        rules: {
          "require-readonly-inputs": requireReadonlyInputs,
          "member-ordering": memberOrdering,
        },
      },
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: [],
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
      // "@typescript-eslint/member-ordering": [
      //   "error",
      //   {
      //     default: [
      //       // Pola dekorowane (input, output, viewChild itp.)
      //       "public-decorated-field",
      //       "protected-decorated-field",
      //       "private-decorated-field",
      //
      //       // Gettery / settery
      //       "public-get",
      //       "public-set",
      //       "protected-get",
      //       "protected-set",
      //       "private-get",
      //       "private-set",
      //
      //       // Pola statyczne
      //       "public-static-field",
      //       "protected-static-field",
      //       "private-static-field",
      //
      //       // Pola instancji (inject-y najpierw, potem publiczne)
      //       "private-instance-field",
      //       "protected-instance-field",
      //       "public-instance-field",
      //
      //       // Konstruktor
      //       "constructor",
      //
      //       // Metody statyczne
      //       "public-static-method",
      //       "protected-static-method",
      //       "private-static-method",
      //
      //       // Metody instancji
      //       "public-instance-method",
      //       "protected-instance-method",
      //       "private-instance-method",
      //     ],
      //   },
      // ],
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
        {
          selector: "memberLike",
          modifiers: ["public", "static"],
          format: ["PascalCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "objectLiteralProperty",
          format: null,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@angular-eslint/no-empty-lifecycle-method": "error",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-output-rename": "error",
      "no-console": "error",
      "no-debugger": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./*"],
        },
      ],
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      eqeqeq: "error",
      "@typescript-eslint/array-type": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
      "@angular-eslint/template/click-events-have-key-events": "off",
      "local/member-ordering": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/interactive-supports-focus": "off",
      "@angular-eslint/template/click-events-have-key-events": "off",
    },
  },
);
