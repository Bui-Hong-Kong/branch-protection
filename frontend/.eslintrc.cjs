/* ESLint — most widely used JS linter. Loose config for legacy Sock Shop front-end. */
module.exports = {
  root: true,
  env: {
    node: true,
    es2018: true,
    browser: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "script",
  },
  ignorePatterns: [
    "node_modules/",
    "public/js/",
    "public/css/",
    "public/fonts/",
    "test/",
  ],
  extends: ["eslint:recommended"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
  },
};
