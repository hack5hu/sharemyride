const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// ⚠️ DISABLED: obfuscator-io-metro-plugin has a known bug (Issue #29) that causes
// Release builds to fail with "ENOENT: .jso/dist/undefined" on RN 0.84+.
// Track fix here: https://github.com/whoami-shubham/obfuscator-io-metro-plugin/issues/29
// Re-enable when the plugin ships a compatible version.
//
// const obfuscatorPlugin = require('obfuscator-io-metro-plugin')(
//   {
//     compact: true,
//     controlFlowFlattening: true,
//     controlFlowFlatteningThreshold: 0.75,
//     numbersToExpressions: true,
//     simplify: true,
//     stringArray: true,
//     stringArrayShuffle: true,
//     splitStrings: true,
//     stringArrayThreshold: 0.75,
//     stringArrayEncoding: ['base64'],
//     identifierNamesGenerator: 'hexadecimal',
//   },
//   {
//     runInDev: false,
//     logObfuscatedFiles: true,
//   }
// );

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
