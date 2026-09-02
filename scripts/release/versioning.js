const fs = require('fs');
const path = require('path');
const releaseIt = require('release-it').default;
const { ask, isDryRun } = require('./utils');

/**
 * ============================================================================
 * 🏷️ VERSIONING & NATIVE SYNC UTILITIES
 * ============================================================================
 *
 * Handles:
 * 1. Semantic version bumping & conventional changelog generation via release-it.
 * 2. Android `versionCode` in `android/app/build.gradle`.
 * 3. iOS `CFBundleVersion` (build number) in `ios/shareMyRide/Info.plist`.
 * 4. Sanitizing `CFBundleShortVersionString` for Apple App Store compliance.
 */

/**
 * Executes `release-it` to bump package.json version, update CHANGELOG.md,
 * and create git commits & tags.
 *
 * @param {string|null} preReleaseId - Optional pre-release tag (e.g., 'uat' for 1.5.0-uat.0).
 */
const autoBumpVersion = async (preReleaseId = null) => {
  console.log(
    `\n--- 🚀 Auto-Bumping Version with release-it ${
      isDryRun ? '(DRY-RUN)' : ''
    } ---`,
  );

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
    'dry-run': isDryRun,
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
      // Sync the new version into native Android & iOS configuration files
      'after:bump': 'npx react-native-version -L --never-amend 2>/dev/null',
    },
    npm: {
      publish: false, // Mobile app repository, not an NPM library
    },
  };

  if (preReleaseId) {
    options.preRelease = preReleaseId;
  }

  await releaseIt(options);

  console.log(
    isDryRun
      ? '✅ [DRY-RUN] Version bump previewed successfully!'
      : '✅ Version bumped, synced natively, and committed/tagged!',
  );
};

/**
 * Interactively prompts to increment the Android `versionCode` in build.gradle.
 * Prevents Google Play Store duplicate version code upload rejections.
 */
const handleAndroidVersionCode = async () => {
  const buildGradlePath = path.join(__dirname, '../../android/app/build.gradle');
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

  if (isDryRun) {
    console.log(
      `✅ [DRY-RUN] Would update Android versionCode in build.gradle to: ${targetCode}`,
    );
    return;
  }

  content = content.replace(/(versionCode\s+)\d+/, `$1${targetCode}`);
  fs.writeFileSync(buildGradlePath, content, 'utf8');
  console.log(`✅ Android versionCode updated to: ${targetCode}`);
};

/**
 * Ensures CFBundleShortVersionString in Info.plist uses standard 1-3 integer
 * format (e.g., '1.5.0' instead of '1.5.0-uat.0') for Apple validation.
 */
const sanitizeIosVersion = () => {
  const infoPlistPath = path.join(
    __dirname,
    '../../ios/shareMyRide/Info.plist',
  );
  if (!fs.existsSync(infoPlistPath)) return;

  let content = fs.readFileSync(infoPlistPath, 'utf8');
  content = content.replace(
    /(<key>CFBundleShortVersionString<\/key>\s*<string>)([\d\.]+)(?:-[^\s<]+)?(<\/string>)/,
    '$1$2$3',
  );
  if (!isDryRun) {
    fs.writeFileSync(infoPlistPath, content, 'utf8');
  }
};

/**
 * Interactively prompts to increment the iOS build number (CFBundleVersion) in Info.plist.
 */
const handleIosBuildNumber = async () => {
  const infoPlistPath = path.join(
    __dirname,
    '../../ios/shareMyRide/Info.plist',
  );
  if (!fs.existsSync(infoPlistPath)) return;

  let content = fs.readFileSync(infoPlistPath, 'utf8');
  const match = content.match(
    /<key>CFBundleVersion<\/key>\s*<string>(\d+)<\/string>/,
  );
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

  if (isDryRun) {
    console.log(
      `✅ [DRY-RUN] Would update iOS build number in Info.plist to: ${targetBuild}`,
    );
    return;
  }

  content = content.replace(
    /(<key>CFBundleVersion<\/key>\s*<string>)\d+(<\/string>)/,
    `$1${targetBuild}$2`,
  );
  fs.writeFileSync(infoPlistPath, content, 'utf8');
  console.log(`✅ iOS build number updated to: ${targetBuild}`);

  sanitizeIosVersion();
};

module.exports = {
  autoBumpVersion,
  handleAndroidVersionCode,
  handleIosBuildNumber,
  sanitizeIosVersion,
};
