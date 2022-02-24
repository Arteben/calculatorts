{
  parser: "@typescript-eslint/parse",
  'extends': [
    'eslint:recommended',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-trailing-spaces': 'error',
    quotes: [
      'error',
      'single',
    ],
    'comma-dangle': ['error', 'always-multiline']
  }
}
