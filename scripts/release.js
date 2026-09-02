/**
 * ============================================================================
 * 🚀 SHAREMYRIDE UNIFIED RELEASE ORCHESTRATOR
 * ============================================================================
 *
 * This script is the single entry point for all mobile app release flows:
 * - Production Release (Android AAB + iOS Pods in parallel)
 * - Dev / UAT Release (Android APK + iOS Pods in parallel)
 * - Platform-specific builds (AAB only, APK only, iOS only, OTA bundle)
 *
 * Features:
 * ✅ Parallel Builds: Compiles Android and syncs iOS at the same time.
 * ✅ Split Terminal Dashboard: Live interactive TUI showing both logs side-by-side.
 * ✅ Automatic Versioning: Semantic version bumping & Changelog generation.
 * ✅ Native Sync: Automatically increments Android versionCode and iOS build numbers.
 * ✅ Deep Clean: Cleans CMake and Gradle caches before release builds.
 */

const { rl, gradlew, run } = require('./release/utils');
const { runParallel } = require('./release/dashboard');
const { cleanAndroid, setBuildEnv, revealInFinder, AAB_PATH, APK_PATH } = require('./release/android');
const { cleanIos, getIosArchiveCommand, buildIosArchive, getArchivePath } = require('./release/ios');
const { handleStallionOtaRelease } = require('./release/stallion');
const {
  autoBumpVersion,
  handleAndroidVersionCode,
  handleIosBuildNumber,
} = require('./release/versioning');

/**
 * Main release pipeline controller.
 */
const main = async () => {
  // Ensure production compiler optimizations in Babel/Metro
  process.env.NODE_ENV = 'production';
  process.env.BABEL_ENV = 'production';

  const target = process.argv[2];

  if (!target) {
    console.error(
      '❌ Please pass a target: prod (both), dev (both), aab, apk, ios, or ota',
    );
    process.exit(1);
  }

  try {
    // Reset APK build environment flag by default
    setBuildEnv(false);

    // ------------------------------------------------------------------------
    // 📲 1. STALLION OTA RELEASE (Over-The-Air JavaScript & Asset Updates)
    // ------------------------------------------------------------------------
    if (target === 'ota') {
      await handleStallionOtaRelease();
    }

    // ------------------------------------------------------------------------
    // 🌟 2. UNIFIED PRODUCTION RELEASE (Android AAB + iOS Archive in Parallel)
    // ------------------------------------------------------------------------
    else if (
      target === 'prod' ||
      target === 'both' ||
      target === 'all' ||
      target === 'production' ||
      target === 'dry-run'
    ) {
      console.log('\n🌟 --- Unified Production Release (Android + iOS) ---');

      // Phase 1: Interactive version bump, Android versionCode & iOS build number
      await autoBumpVersion();
      await handleAndroidVersionCode();
      await handleIosBuildNumber();

      // Phase 2: Deep clean Android CMake/Gradle caches and iOS build artifacts
      cleanAndroid();
      cleanIos();

      // Phase 3: Run Android AAB compilation and iOS Xcode Archive concurrently in TUI
      await runParallel([
        {
          name: '🤖 Android AAB',
          cmd: `cd android && ${gradlew} bundleRelease --no-daemon`,
        },
        {
          name: '🍎 iOS Archive',
          cmd: getIosArchiveCommand(),
        },
      ]);

      const archivePath = getArchivePath();
      console.log('\n🎉 --- Production Builds Ready! ---');
      console.log(`🤖 Android AAB: ${AAB_PATH}`);
      console.log(`🍎 iOS Archive: ${archivePath}`);

      // Auto-reveal Android AAB in Finder for instant Drag-and-Drop
      revealInFinder(AAB_PATH);

      // Open iOS archive in Xcode Organizer
      console.log('💡 Opening iOS archive in Xcode Organizer...');
      run(`open "${archivePath}" || true`);
    }

    // ------------------------------------------------------------------------
    // 🧪 3. UNIFIED DEV / UAT RELEASE (Android APK + iOS CocoaPods in Parallel)
    // ------------------------------------------------------------------------
    else if (target === 'dev' || target === 'uat') {
      console.log('\n🧪 --- Unified Dev / UAT Release (Android + iOS) ---');

      // Phase 1: Bump version with 'uat' pre-release tag
      await autoBumpVersion('uat');
      await handleAndroidVersionCode();
      await handleIosBuildNumber();

      // Phase 2: Prepare Android APK environment & clean caches
      cleanAndroid();
      cleanIos();
      setBuildEnv(true);

      // Phase 3: Run Android APK assembly and iOS Pod installation concurrently in TUI
      await runParallel([
        {
          name: '🤖 Android APK',
          cmd: `cd android && ${gradlew} assembleRelease --no-daemon -PreactNativeArchitectures=armeabi-v7a,arm64-v8a && cd ..`,
        },
        {
          name: '🍎 iOS Pods',
          cmd: 'cd ios && pod install',
        },
      ]);

      console.log('\n🎉 --- Dev / UAT Builds Ready! ---');
      console.log(`🤖 Android APK: ${APK_PATH}`);
      revealInFinder(APK_PATH);
      console.log(
        '🍎 iOS: Open ios/shareMyRide.xcworkspace in Xcode for Development/AdHoc Archive',
      );
    }

    // ------------------------------------------------------------------------
    // 📦 4. ANDROID PRODUCTION AAB (Android Only)
    // ------------------------------------------------------------------------
    else if (target === 'aab') {
      console.log('\n📦 --- Production AAB Build (Android Only) ---');
      await autoBumpVersion();
      await handleAndroidVersionCode();
      cleanAndroid();
      run(`cd android && ${gradlew} bundleRelease --no-daemon`);
      console.log(`✅ AAB generated at: ${AAB_PATH}`);
      revealInFinder(AAB_PATH);
    }

    // ------------------------------------------------------------------------
    // 📱 5. ANDROID UAT APK (Android Only)
    // ------------------------------------------------------------------------
    else if (target === 'apk') {
      console.log('\n📱 --- UAT APK Build (Android Only) ---');
      await autoBumpVersion('uat');
      await handleAndroidVersionCode();
      cleanAndroid();
      setBuildEnv(true);
      run(
        `cd android && ${gradlew} assembleRelease --no-daemon -PreactNativeArchitectures=armeabi-v7a,arm64-v8a && cd ..`,
      );
      console.log(`✅ APK generated at: ${APK_PATH}`);
      revealInFinder(APK_PATH);
    }

    // ------------------------------------------------------------------------
    // 🍎 6. IOS RELEASE ARCHIVE (iOS Only)
    // ------------------------------------------------------------------------
    else if (target === 'ios') {
      console.log('\n🍎 --- iOS Headless Release Archive (iOS Only) ---');
      await autoBumpVersion();
      await handleIosBuildNumber();
      buildIosArchive();
    }

    // ------------------------------------------------------------------------
    // ❌ UNKNOWN TARGET
    // ------------------------------------------------------------------------
    else {
      console.error('❌ Unknown command.');
    }
  } catch (error) {
    console.error('\n❌ Release process failed!', error.message);
  } finally {
    setBuildEnv(false);
    rl.close();
  }
};

main();
