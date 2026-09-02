const { execSync } = require('child_process');
const readline = require('readline');

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
 * Runs a single shell command synchronously, inheriting terminal stdio.
 * @param {string} cmd - Command string to execute.
 */
const run = cmd => {
  console.log(`\n> Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

module.exports = {
  rl,
  ask,
  isWin,
  gradlew,
  run,
};
