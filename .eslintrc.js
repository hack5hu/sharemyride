module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:storybook/recommended'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-native/no-inline-styles': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: [
              'Text',
              'View',
              'TouchableOpacity',
              'TextInput',
              'Button',
              'ActivityIndicator',
            ],
            message:
              'Please use atoms from src/components/atoms/ (Typography, Box, Surface, Input, Button) instead of raw React Native components.',
          },
        ],
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
