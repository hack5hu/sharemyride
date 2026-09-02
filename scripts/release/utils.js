const { execSync } = require('child_process');
const readline = require('readline');

/**
 * Flag indicating whether the script is running in simulation/dry-run mode.
 * Activated by passing `--dry-run` or `-d` flag.
 */
const isDryRun =
  process.argv.includes('--dry-run') ||
  process.argv.includes('-d') ||
  process.argv[2] === 'dry-run';

/**
 * Global readline interface for interactive command-line prompts.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompts the user with a question and resolves with their answer.
 * @param {string} question - The prompt question to display.
 * @returns {Promise<string>} User input string.
 */
const ask = question => new Promise(resolve => rl.question(question, resolve));

/**
 * Cross-platform detection so scripts run smoothly on both macOS and Windows.
 */
const isWin = process.platform === 'win32';
const gradlew = isWin ? 'gradlew.bat' : './gradlew';

/**
 * Runs a shell command synchronously.
 * In dry-run mode, logs the command without executing side effects (unless forced).
 *
 * @param {string} cmd - Command string to execute.
 * @param {boolean} force - If true, executes even during dry-run (for non-mutating checks).
 */
const run = (cmd, force = false) => {
  if (isDryRun && !force) {
    console.log(`\n\x1b[33m[DRY-RUN] > Would run:\x1b[0m ${cmd}`);
    return;
  }
  console.log(`\n> Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

module.exports = {
  isDryRun,
  rl,
  ask,
  isWin,
  gradlew,
  run,
};
