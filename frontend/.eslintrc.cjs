/* ESLint — most widely used JS linter. Tuned for legacy Sock Shop front-end. */
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
    // Express/request callbacks commonly leave unused (err, req, res, next, body).
    "no-unused-vars": [
      "error",
      { args: "none", varsIgnorePattern: "^_", caughtErrors: "none" },
    ],
    "no-console": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    // Legacy style in metrics / throw-then-return guards.
    "no-extra-semi": "off",
    "no-redeclare": "off",
    "no-unreachable": "off",
  },
};
