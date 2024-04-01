module.exports = {
  root: true,
  env: { browser: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    '@feature-sliced',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'apps/backend'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/exhaustive-deps': ['error'],
    'no-nested-ternary': ['error'],
    "import/no-internal-modules": [ "error", {
      "allow": [ "/**/*"],
    } ]
  },
};
