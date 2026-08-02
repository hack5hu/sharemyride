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

const main = async () => {
  process.env.NODE_ENV = 'production';
  process.env.BABEL_ENV = 'production';

  const target = process.argv[2];

  if (!target) {
    console.error('❌ Please pass a target: aab, apk, ios, or ota');
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
    } else if (target === 'aab') {
      console.log('\n📦 --- Production AAB Build ---');
      await autoBumpVersion();
      cleanAndroid();
      run(`cd android && ${gradlew} bundleRelease --no-daemon`);
      console.log(
        '✅ AAB generated at: android/app/build/outputs/bundle/release/app-release.aab',
      );
    } else if (target === 'apk') {
      console.log('\n📱 --- UAT APK Build ---');
      await autoBumpVersion('uat');
      cleanAndroid();
      setBuildEnv(true);
      run(
        `cd android && ${gradlew} assembleRelease --no-daemon -PreactNativeArchitectures=armeabi-v7a,arm64-v8a && cd ..`,
      );
      console.log(
        '✅ APK generated at: android/app/build/outputs/apk/release/app-release.apk',
      );
    } else if (target === 'ios') {
      console.log('\n🍎 --- iOS Release Prep ---');
      await autoBumpVersion();
      run('cd ios && pod install');
      console.log('✅ iOS version bumped.');
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
