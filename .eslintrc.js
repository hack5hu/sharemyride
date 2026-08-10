module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:storybook/recommended'],
  rules: {
    // 1. Restrict RN Primitives & Forbidden Imports (View, Text, TouchableOpacity, TextInput, Image, FlatList, Alert, StyleSheet)
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: [
              'View',
              'Text',
              'TouchableOpacity',
              'TextInput',
              'Image',
              'FlatList',
              'Alert',
              'StyleSheet',
            ],
            message:
              'Forbidden import! Use atoms from "@/components/atoms", FlashList from "@shopify/flash-list", styled-components, or showNotification instead (Rules #4, #8 & #12 in AGENTS.md).',
          },
        ],
      },
    ],

    // 2. Restrict Direct Method Calls (Alert.alert)
    'no-restricted-properties': [
      'error',
      {
        object: 'Alert',
        property: 'alert',
        message:
          'Never use Alert.alert. Use showNotification or ConfirmationModal instead (Rule #12 in AGENTS.md).',
      },
    ],

    // 3. Restrict Inline Style Attributes (style={{ ... }})
    'no-restricted-syntax': [
      'warn',
      {
        selector:
          'JSXAttribute[name.name="style"][value.type="JSXExpressionContainer"][value.expression.type="ObjectExpression"]',
        message:
          'Inline styles are forbidden. Use styled-components instead (Rule #8 in AGENTS.md).',
      },
    ],

    // 4. Strict TypeScript: Warn on any usage
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    // 5. File Length Limit (Hard cap 200 lines per file)
    'max-lines': [
      'warn',
      {
        max: 200,
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    // 6. No console.log (allow warn and error)
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // 7. Unused Variables (ignore variables starting with _)
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // 8. Disallow inline styles & color literals from react-native plugin
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
  },
  overrides: [
    {
      files: ['src/components/atoms/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      files: [
        'src/components/atoms/**/*.stories.tsx',
        'src/components/molecules/**/*.stories.tsx',
        'src/components/organisms/**/*.stories.tsx',
      ],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['src//**/*.stories.tsx'],
      rules: {
        'no-restricted-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-console': 'off',
      },
    },
  ],
};
