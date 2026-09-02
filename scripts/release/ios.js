const fs = require('fs');
const os = require('os');
const path = require('path');
const { run, isDryRun } = require('./utils');

/**
 * ============================================================================
 * 🍎 IOS BUILD & ARCHIVE UTILITIES (Xcode Organizer Integration)
 * ============================================================================
 *
 * Compiles and archives the iOS app directly into Xcode Organizer's
 * default archives directory (`~/Library/Developer/Xcode/Archives/`).
 *
 * This ensures that as soon as the build finishes, the archive appears
 * in the Xcode Organizer "Archives" window ready for one-click "Distribute App".
 */

/**
 * Generates the standard Xcode Organizer archive path for today's date and timestamp.
 * Example: ~/Library/Developer/Xcode/Archives/2026-09-02/shareMyRide 02-09-2026 11.15.00.xcarchive
 *
 * @returns {string} Absolute path to the destination .xcarchive file.
 */
const getOrganizerArchivePath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateFolder = `${year}-${month}-${day}`;
  const archiveName = `shareMyRide ${day}-${month}-${year} ${hours}.${minutes}.${seconds}.xcarchive`;

  const archiveDir = path.join(
    os.homedir(),
    'Library/Developer/Xcode/Archives',
    dateFolder,
  );
  if (!isDryRun) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  return path.join(archiveDir, archiveName);
};

// Cached archive path for the current run
let currentArchivePath = null;
const getArchivePath = () => {
  if (!currentArchivePath) {
    currentArchivePath = getOrganizerArchivePath();
  }
  return currentArchivePath;
};

/**
 * Cleans temporary derived data and previous local build artifacts in `ios/build/`.
 */
const cleanIos = () => {
  if (isDryRun) return;
  const buildDir = path.join(__dirname, '../../ios/build');
  if (fs.existsSync(buildDir)) {
    console.log('\n🧹 Cleaning local iOS build directory...');
    fs.rmSync(buildDir, { recursive: true, force: true });
    console.log('✅ Local iOS build directory cleaned.');
  }
};

/**
 * Returns the single-line shell command to sync CocoaPods and build the .xcarchive.
 * Targets the official Xcode Archives location so it automatically lists in Organizer.
 *
 * @returns {string} Shell command.
 */
const getIosArchiveCommand = () => {
  const archivePath = getArchivePath();
  return [
    'cd ios',
    'pod install',
    `xcodebuild -workspace shareMyRide.xcworkspace -scheme shareMyRide -configuration Release -destination "generic/platform=iOS" -archivePath "${archivePath}" archive -allowProvisioningUpdates`,
  ].join(' && ');
};

/**
 * Runs standalone iOS release preparation and archiving synchronously.
 */
const buildIosArchive = () => {
  console.log('\n🍎 Starting Headless iOS Archive Build...');
  cleanIos();
  const archivePath = getArchivePath();
  run(getIosArchiveCommand());
  console.log(`\n✅ iOS Archive created at: ${archivePath}`);
  console.log('💡 Opening archive in Xcode Organizer...');
  run(`open "${archivePath}" || true`);
};

module.exports = {
  getArchivePath,
  cleanIos,
  getIosArchiveCommand,
  buildIosArchive,
};
