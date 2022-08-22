module.exports = {
  root: true,
  ignorePatterns: ["**/*.spec.ts"],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
};