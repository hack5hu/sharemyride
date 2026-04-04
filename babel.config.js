const { getAliasConfig } = require('./scripts/aliasConfig');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // The 'react-native-reanimated/plugin' MUST be last
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: getAliasConfig(),
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
