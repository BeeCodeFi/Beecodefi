import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  
  // Custom rules to enforce our coding standards
  {
    rules: {
      // ─────────────────────────────────────────────────────────────────────
      // Import Organization
      // ─────────────────────────────────────────────────────────────────────
      // Note: Automatic import sorting requires eslint-plugin-import
      // For now, we enforce manually via code review
      
      // ─────────────────────────────────────────────────────────────────────
      // Error Handling Standards
      // ─────────────────────────────────────────────────────────────────────
      
      // Require explicit error types in catch clauses
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      
      // Disallow console.log in production (use proper error handling)
      "no-console": [
        "warn",
        {
          "allow": ["warn", "error", "info"]
        }
      ],
      
      // ─────────────────────────────────────────────────────────────────────
      // React/Next.js Best Practices
      // ─────────────────────────────────────────────────────────────────────
      
      // Enforce consistent function component style
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "function-declaration",
          "unnamedComponents": "arrow-function"
        }
      ],
      
      // Require default export for page components
      // (Next.js convention)
      
      // Enforce proper hook dependencies
      "react-hooks/exhaustive-deps": "warn",
      
      // ─────────────────────────────────────────────────────────────────────
      // TypeScript Standards
      // ─────────────────────────────────────────────────────────────────────
      
      // Require explicit return types on functions (helps catch errors)
      "@typescript-eslint/explicit-function-return-type": "off", // Too strict for React
      
      // Disallow 'any' type (use 'unknown' instead)
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Require type annotations for error variables
      "@typescript-eslint/no-implicit-any-catch": "off", // Deprecated in newer TS
      
      // ─────────────────────────────────────────────────────────────────────
      // Code Quality
      // ─────────────────────────────────────────────────────────────────────
      
      // Disallow unused variables
      "no-unused-vars": "off", // Use TS version instead
      
      // Require await in async functions
      "require-await": "warn",
      
      // Note: @typescript-eslint/require-await requires parserOptions with type information
      // Disabled to avoid configuration complexity
      "@typescript-eslint/require-await": "off",
      
      // Prefer const over let when variables aren't reassigned
      "prefer-const": "error",
      
      // Disallow var declarations
      "no-var": "error",
      
      // ─────────────────────────────────────────────────────────────────────
      // Accessibility
      // ─────────────────────────────────────────────────────────────────────
      
      // Enforce accessibility rules (already included in next/core-web-vitals)
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      
      // ─────────────────────────────────────────────────────────────────────
      // Performance
      // ─────────────────────────────────────────────────────────────────────
      
      // Warn on large inline objects/arrays in JSX (can cause re-renders)
      "react/jsx-no-constructed-context-values": "warn",
    }
  },
  
  // Override default ignores of eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    ".vercel/**",
    "*.config.{js,ts,mjs}",
  ]),
]);

export default eslintConfig;
