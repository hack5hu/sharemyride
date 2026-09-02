const fs = require('fs');
const path = require('path');
const { run, gradlew } = require('./utils');

/**
 * ============================================================================
 * 🤖 ANDROID BUILD UTILITIES
 * ============================================================================
 *
 * Provides cache cleaning and environment switching routines tailored for
 * React Native Android builds with TurboModules, CMake, and Prefabs.
 */

/**
 * Toggles the APK build flag in `src/constants/buildEnv.json`.
 * Used at runtime by the app to identify APK builds vs production AAB builds.
 *
 * @param {boolean} isApk - True if building APK, false for standard/AAB.
 */
const setBuildEnv = isApk => {
  const envPath = path.join(__dirname, '../../src/constants/buildEnv.json');
  fs.writeFileSync(envPath, JSON.stringify({ isApkBuild: isApk }, null, 2));
};

/**
 * Performs a deep cleanup of Android build caches, CMake artifacts, and stops daemons.
 *
 * Why this is necessary:
 * When switching between Debug/UAT/Release architectures, CMake (.cxx) and Prefab
 * caches in `android/.cxx` and `node_modules/.../android/.cxx` can cause symbol
 * mismatch and duplicate linking failures.
 */
const cleanAndroid = () => {
  console.log('\n🧹 Deep-cleaning Android build caches...');
  // 1. Stop any active Gradle daemon processes
  run(`cd android && ${gradlew} --stop || true`);

  // 2. Remove all project & node_modules build / cxx folders
  run(
    [
      'rm -rf android/.gradle android/.cxx android/app/.cxx android/app/build android/build',
      'find node_modules -path "*/android/.cxx" -type d -exec rm -rf {} + 2>/dev/null || true',
      'find node_modules -path "*/android/build" -type d -maxdepth 4 -exec rm -rf {} + 2>/dev/null || true',
    ].join(' && '),
  );
  console.log('✅ Android caches cleaned.');
};

module.exports = {
  setBuildEnv,
  cleanAndroid,
};
