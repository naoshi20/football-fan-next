module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ], // eslint-config-prettierプラグインでconflictを防ぐ
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['/*.js'],
  rules: {
    'no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
