const { execSync } = require('child_process');
const readline = require('readline');
const releaseIt = require('release-it').default;
const fs = require('fs');
const path = require('path');

// ==========================================
// 🛠️ CONFIGURATION
// ==========================================
const STALLION_UPLOAD_PATH = 'zyncride/zyncride/zyncride';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = q => new Promise(resolve => rl.question(q, resolve));

// Cross-platform check so this works on Mac and Windows
const isWin = process.platform === 'win32';
const gradlew = isWin ? 'gradlew.bat' : './gradlew';

const run = cmd => {
  console.log(`\n> Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

const setBuildEnv = isApk => {
  const envPath = path.join(__dirname, '../src/constants/buildEnv.json');
  fs.writeFileSync(envPath, JSON.stringify({ isApkBuild: isApk }, null, 2));
};

// Deep-clean Android build caches + stop stale Gradle daemons.
// Without this, prefab/CMake caches cause persistent build failures.
const cleanAndroid = () => {
  console.log('\n🧹 Deep-cleaning Android build caches...');
  run(`cd android && ${gradlew} --stop || true`);
  run(
    [
      'rm -rf android/.gradle android/.cxx android/app/.cxx android/app/build android/build',
      'find node_modules -path "*/android/.cxx" -type d -exec rm -rf {} + 2>/dev/null || true',
      'find node_modules -path "*/android/build" -type d -maxdepth 4 -exec rm -rf {} + 2>/dev/null || true',
    ].join(' && '),
  );
  console.log('✅ Android caches cleaned.');
};

// Uses release-it to handle semantic versioning, changelog, and git tagging
const autoBumpVersion = async (preReleaseId = null) => {
  console.log('\n--- 🚀 Auto-Bumping Version with release-it ---');

  const answer = await ask(
    'Do you want to bump the version and run release-it? (y/N) [default: N]: ',
  );

  if (
    answer.trim().toLowerCase() !== 'y' &&
    answer.trim().toLowerCase() !== 'yes'
  ) {
    console.log('⏭️ Skipping version bump.');
    return;
  }

  const options = {
    plugins: {
      '@release-it/conventional-changelog': {
        preset: 'angular',
        infile: 'CHANGELOG.md',
      },
    },
    git: {
      requireCleanWorkingDir: false,
      commitMessage: 'chore: release v${version}',
      tagName: 'v${version}',
    },
    hooks: {
      // After package.json is bumped (but before git commit), sync to native files
      'after:bump': 'npx react-native-version -L --never-amend 2>/dev/null',
    },
    npm: {
      publish: false, // We are not publishing this app to the NPM registry
    },
  };

  if (preReleaseId) {
    options.preRelease = preReleaseId;
  }

  await releaseIt(options);

  console.log('✅ Version bumped, synced natively, and committed/tagged!');
};

// Manages Android versionCode interactively so Google Play never rejects duplicate build codes
const handleAndroidVersionCode = async () => {
  const buildGradlePath = path.join(__dirname, '../android/app/build.gradle');
  if (!fs.existsSync(buildGradlePath)) return;

  let content = fs.readFileSync(buildGradlePath, 'utf8');
  const match = content.match(/versionCode\s+(\d+)/);
  if (!match) return;

  const currentCode = parseInt(match[1], 10);
  const nextCode = currentCode + 1;

  console.log(`\n📱 Current Android versionCode: ${currentCode}`);
  const answer = await ask(
    `Update versionCode? [Press Enter for ${nextCode}, enter custom number, or 'n' to keep ${currentCode}]: `,
  );

  const trimmed = answer.trim().toLowerCase();
  let targetCode = currentCode;

  if (trimmed === '' || trimmed === 'y' || trimmed === 'yes') {
    targetCode = nextCode;
  } else if (trimmed === 'n' || trimmed === 'no') {
    console.log(`⏭️ Keeping versionCode at ${currentCode}.`);
    return;
  } else {
    const parsed = parseInt(trimmed, 10);
    if (!isNaN(parsed) && parsed > 0) {
      targetCode = parsed;
    } else {
      console.log(`⚠️ Invalid input. Keeping versionCode at ${currentCode}.`);
      return;
    }
  }

  content = content.replace(/(versionCode\s+)\d+/, `$1${targetCode}`);
  fs.writeFileSync(buildGradlePath, content, 'utf8');
  console.log(`✅ Android versionCode updated to: ${targetCode}`);
};

// Manages iOS build number (CFBundleVersion) interactively
const handleIosBuildNumber = async () => {
  const infoPlistPath = path.join(__dirname, '../ios/shareMyRide/Info.plist');
  if (!fs.existsSync(infoPlistPath)) return;

  let content = fs.readFileSync(infoPlistPath, 'utf8');
  const match = content.match(/<key>CFBundleVersion<\/key>\s*<string>(\d+)<\/string>/);
  if (!match) return;

  const currentBuild = parseInt(match[1], 10);
  const nextBuild = currentBuild + 1;

  console.log(`\n🍎 Current iOS build number (CFBundleVersion): ${currentBuild}`);
  const answer = await ask(
    `Update build number? [Press Enter for ${nextBuild}, enter custom number, or 'n' to keep ${currentBuild}]: `,
  );

  const trimmed = answer.trim().toLowerCase();
  let targetBuild = currentBuild;

  if (trimmed === '' || trimmed === 'y' || trimmed === 'yes') {
    targetBuild = nextBuild;
  } else if (trimmed === 'n' || trimmed === 'no') {
    console.log(`⏭️ Keeping build number at ${currentBuild}.`);
    return;
  } else {
    const parsed = parseInt(trimmed, 10);
    if (!isNaN(parsed) && parsed > 0) {
      targetBuild = parsed;
    } else {
      console.log(`⚠️ Invalid input. Keeping build number at ${currentBuild}.`);
      return;
    }
  }

  content = content.replace(
    /(<key>CFBundleVersion<\/key>\s*<string>)\d+(<\/string>)/,
    `$1${targetBuild}$2`,
  );
  fs.writeFileSync(infoPlistPath, content, 'utf8');
  console.log(`✅ iOS build number updated to: ${targetBuild}`);
};

const main = async () => {
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
    setBuildEnv(false); // Default to false

    if (target === 'ota') {
      console.log('\n🚀 --- Stallion OTA Release ---');
      const platform = await ask(
        'Which platform? (android / ios / both) [default: android]: ',
      );
      const notes = await ask('Enter release notes: ');

      const selectedPlatform =
        platform.trim() === 'both'
          ? ['android', 'ios']
          : (platform.trim() || 'android').split(',');
      const escapedNotes = notes.replace(/"/g, '\\"');

      for (const p of selectedPlatform) {
        run(
          `$(yarn global bin)/stallion publish-bundle --upload-path=${STALLION_UPLOAD_PATH} --platform=${p.trim()} --release-note="${escapedNotes}"`,
        );
      }
    } else if (target === 'prod' || target === 'all' || target === 'production') {
      console.log('\n🌟 --- Unified Production Release (Android + iOS) ---');
      await autoBumpVersion();
      await handleAndroidVersionCode();
      await handleIosBuildNumber();
      cleanAndroid();
      run(`cd android && ${gradlew} bundleRelease --no-daemon`);
      run('cd ios && pod install');
      console.log('\n🎉 --- Production Builds Ready! ---');
      console.log(
        '🤖 Android AAB: android/app/build/outputs/bundle/release/app-release.aab',
      );
      console.log(
        '🍎 iOS: Open ios/shareMyRide.xcworkspace in Xcode and click Product -> Archive',
      );
    } else if (target === 'dev' || target === 'uat') {
      console.log('\n🧪 --- Unified Dev / UAT Release (Android + iOS) ---');
      await autoBumpVersion('uat');
      await handleAndroidVersionCode();
      await handleIosBuildNumber();
      cleanAndroid();
      setBuildEnv(true);
      run(
        `cd android && ${gradlew} assembleRelease --no-daemon -PreactNativeArchitectures=armeabi-v7a,arm64-v8a && cd ..`,
      );
      run('cd ios && pod install');
      console.log('\n🎉 --- Dev / UAT Builds Ready! ---');
      console.log(
        '🤖 Android APK: android/app/build/outputs/apk/release/app-release.apk',
      );
      console.log(
        '🍎 iOS: Open ios/shareMyRide.xcworkspace in Xcode for Development/AdHoc Archive',
      );
    } else if (target === 'aab') {
      console.log('\n📦 --- Production AAB Build (Android Only) ---');
      await autoBumpVersion();
      await handleAndroidVersionCode();
      cleanAndroid();
      run(`cd android && ${gradlew} bundleRelease --no-daemon`);
      console.log(
        '✅ AAB generated at: android/app/build/outputs/bundle/release/app-release.aab',
      );
    } else if (target === 'apk') {
      console.log('\n📱 --- UAT APK Build (Android Only) ---');
      await autoBumpVersion('uat');
      await handleAndroidVersionCode();
      cleanAndroid();
      setBuildEnv(true);
      run(
        `cd android && ${gradlew} assembleRelease --no-daemon -PreactNativeArchitectures=armeabi-v7a,arm64-v8a && cd ..`,
      );
      console.log(
        '✅ APK generated at: android/app/build/outputs/apk/release/app-release.apk',
      );
    } else if (target === 'ios') {
      console.log('\n🍎 --- iOS Release Prep (iOS Only) ---');
      await autoBumpVersion();
      await handleIosBuildNumber();
      run('cd ios && pod install');
      console.log('✅ iOS version bumped and pods synced.');
      console.log(
        '⚠️  To generate the final .ipa, open ios/shareMyRide.xcworkspace in Xcode and click Product -> Archive.',
      );
    } else {
      console.error('❌ Unknown command.');
    }
  } catch (error) {
    console.error('\n❌ Script failed!', error.message);
  } finally {
    setBuildEnv(false);
    rl.close();
  }
};

main();
