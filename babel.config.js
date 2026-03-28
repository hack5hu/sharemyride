const { getAliasConfig } = require('./scripts/aliasConfig');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // The 'react-native-reanimated/plugin' MUST be last
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: getAliasConfig(),
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
