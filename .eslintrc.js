module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-new': 'off',
    'dot-notation': 'off',
    'consistent-return': 'off',
    'no-else-return': 'off',
    'no-lonely-if': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    radix: 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
  },
};
