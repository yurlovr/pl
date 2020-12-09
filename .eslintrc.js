module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'max-len': [
      'warn',
    ],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 2,
    }],
    'import/extensions': ['warn', {
      vue: 'never',
    }],
    'import/prefer-default-export': ['off'],
    'no-shadow': ['off'],
    'no-param-reassign': ['error', { props: false }],
    'import/no-extraneous-dependencies': ['off'],
    'no-return-assign': ['off']
  },
};
