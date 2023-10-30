module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb'],

  plugins: ['react', 'prettier', 'react-hooks'],

  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
        jsx: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021, // Use o ano em vez de 'latest'
    sourceType: 'module',
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  rules: {
    'prettier/prettier': 2,
    'react/jsx-filename-extension': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 0,
  },
};
