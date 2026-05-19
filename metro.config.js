const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Obfuscator options based on javascript-obfuscator API
const obfuscatorPlugin = require('obfuscator-io-metro-plugin')(
  {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 0.75,
    stringArrayEncoding: ['base64'],
    identifierNamesGenerator: 'hexadecimal',
  },
  {
    runInDev: false, // Do not obfuscate during development for fast reload
    logObfuscatedFiles: true,
  }
);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), obfuscatorPlugin, config);
