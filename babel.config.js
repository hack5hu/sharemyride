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
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    }],
    'react-native-reanimated/plugin',
  ],
};
