const { getAliasConfig } = require('./scripts/aliasConfig');

const plugins = [
  [
    'module-resolver',
    {
      root: ['./'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: getAliasConfig(),
    },
  ],
  [
    'module:react-native-dotenv',
    {
      moduleName: '@env',
      path: '.env.local',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    },
  ],
  'react-native-reanimated/plugin',
];

if (process.env.BABEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
  plugins.unshift('transform-remove-console');
}

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins,
};
