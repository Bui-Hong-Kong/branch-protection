/* ESLint — Express BFF (legacy CommonJS). React app lives under web/ (tsc). */
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
    "web/",
    "public/",
    "test/",
  ],
  extends: ["eslint:recommended"],
  rules: {
    "no-unused-vars": [
      "error",
      { args: "none", varsIgnorePattern: "^_", caughtErrors: "none" },
    ],
    "no-console": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-extra-semi": "off",
    "no-redeclare": "off",
    "no-unreachable": "off",
  },
};
