const { ask, run } = require('./utils');

/**
 * ============================================================================
 * 🐎 STALLION OTA (OVER-THE-AIR) RELEASE UTILITIES
 * ============================================================================
 *
 * Handles publishing JavaScript and asset bundles over-the-air via Stallion,
 * allowing instant updates to user devices without App Store / Play Store reviews.
 */

// Stallion destination path on Stallion Cloud
const STALLION_UPLOAD_PATH = 'zyncride/zyncride/zyncride';

/**
 * Prompts for platform & release notes, then publishes the OTA bundle via Stallion CLI.
 */
const handleStallionOtaRelease = async () => {
  console.log('\n🚀 --- Stallion OTA Release ---');

  const platform = await ask(
    'Which platform? (android / ios / both) [default: android]: ',
  );
  const notes = await ask('Enter release notes: ');

  // Determine target platform list
  const selectedPlatform =
    platform.trim().toLowerCase() === 'both'
      ? ['android', 'ios']
      : (platform.trim().toLowerCase() || 'android').split(',');

  // Escape quotes in release notes to prevent shell parsing errors
  const escapedNotes = notes.replace(/"/g, '\\"');

  // Publish bundle for each selected platform
  for (const p of selectedPlatform) {
    const targetPlatform = p.trim();
    console.log(`\n📦 Publishing OTA bundle for ${targetPlatform}...`);
    run(
      `$(yarn global bin)/stallion publish-bundle --upload-path=${STALLION_UPLOAD_PATH} --platform=${targetPlatform} --release-note="${escapedNotes}"`,
    );
  }

  console.log('\n✅ Stallion OTA bundle published successfully!');
};

module.exports = {
  STALLION_UPLOAD_PATH,
  handleStallionOtaRelease,
};
