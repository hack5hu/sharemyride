const { spawn } = require('child_process');
const { isWin, isDryRun } = require('./utils');

/**
 * ============================================================================
 * 📊 SPLIT TERMINAL DASHBOARD (TUI) & PARALLEL EXECUTION ENGINE
 * ============================================================================
 *
 * This module runs multiple long-running tasks concurrently (e.g. Android AAB
 * build + iOS pod install) and renders an interactive, split terminal dashboard.
 *
 * Key Architecture Highlights:
 * 1. Independent Task State: Tracks status (RUNNING, SUCCESS, FAILED),
 *    per-task elapsed execution time, and circular log line buffers.
 * 2. ANSI Cursor Positioning: Uses `\x1b[H` (cursor home) and `\x1b[K` (clear line)
 *    to cleanly redraw each panel in-place without terminal flickering.
 * 3. Non-blocking Stream Processing: Captures stdout & stderr chunks, splitting
 *    newlines and carriage returns to prevent Gradle/Cocoapods log clashes.
 * 4. Signal Handling: Traps SIGINT (Ctrl+C) to gracefully terminate child
 *    processes, restore cursor visibility (`\x1b[?25h`), and exit cleanly.
 */

/**
 * Executes a list of tasks in parallel with a live split terminal dashboard.
 *
 * @param {Array<{ name: string, cmd: string }>} tasks - Array of task definitions.
 * @returns {Promise<void>} Resolves when all tasks succeed, rejects if any fail.
 */
const runParallel = tasks => {
  // Non-interactive fallback (e.g. CI environments or piping)
  if (!process.stdout.isTTY) {
    return Promise.all(
      tasks.map(({ name, cmd }) => {
        return new Promise((resolve, reject) => {
          const [shell, shellArg] = isWin ? ['cmd.exe', '/c'] : ['/bin/sh', '-c'];
          const child = spawn(shell, [shellArg, cmd], {
            stdio: 'inherit',
            env: process.env,
          });
          child.on('close', code =>
            code === 0
              ? resolve()
              : reject(new Error(`${name} failed with exit code: ${code}`)),
          );
          child.on('error', reject);
        });
      }),
    );
  }

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    // Initialize state objects for each concurrent process
    const taskStates = tasks.map(({ name, cmd }) => ({
      name,
      cmd,
      status: 'RUNNING', // 'RUNNING' | 'SUCCESS' | 'FAILED'
      exitCode: null,
      lines: [],
      startTime: Date.now(),
      endTime: null,
      child: null,
    }));

    // Hide terminal cursor and perform initial screen clear
    process.stdout.write('\x1b[?25l\x1b[2J');

    // Restores cursor visibility upon completion or exit
    const cleanup = () => {
      process.stdout.write('\x1b[?25h');
    };

    /**
     * Re-renders the full dashboard view.
     * Calculates available terminal height dynamically and splits space evenly.
     */
    const render = () => {
      const cols = process.stdout.columns || 80;
      const rows = process.stdout.rows || 24;
      const divider = '─'.repeat(Math.max(10, cols - 2));

      let output = '\x1b[H'; // Move cursor to top-left (0,0)

      // Top Header with total elapsed timer
      const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      output += `\x1b[1;36m🌟 Multi-Platform Build Dashboard\x1b[0m \x1b[90m(Elapsed: ${totalElapsed}s)\x1b[0m\x1b[K\n`;
      output += `\x1b[90m${divider}\x1b[0m\x1b[K\n`;

      // Calculate row height per task section based on terminal window height
      const headerHeight = 3;
      const perTaskOverhead = 2;
      const availableRows = rows - headerHeight - taskStates.length * perTaskOverhead;
      const sectionHeight = Math.max(3, Math.floor(availableRows / taskStates.length));

      // Render each task panel
      taskStates.forEach(task => {
        let statusBadge = '\x1b[33m⏳ RUNNING\x1b[0m';
        if (task.status === 'SUCCESS') statusBadge = '\x1b[32m✅ SUCCESS\x1b[0m';
        if (task.status === 'FAILED') {
          statusBadge = `\x1b[31m❌ FAILED (${task.exitCode})\x1b[0m`;
        }

        const taskElapsed = (
          ((task.endTime || Date.now()) - task.startTime) / 1000
        ).toFixed(1);

        output += `\x1b[1m${task.name}\x1b[0m  ${statusBadge}  \x1b[90m(${taskElapsed}s)\x1b[0m\x1b[K\n`;

        // Extract the most recent lines to display in this panel
        const displayLines = task.lines.slice(-sectionHeight);
        while (displayLines.length < sectionHeight) {
          displayLines.push('');
        }

        // Output lines with clean vertical borders and width truncation
        displayLines.forEach(l => {
          const cleanLine = l.replace(/\x1b\[[0-9;]*m/g, ''); // Strip ANSI codes for length measurement
          const truncated =
            cleanLine.length > cols - 6
              ? cleanLine.slice(0, cols - 9) + '...'
              : cleanLine;
          output += `  \x1b[90m│\x1b[0m \x1b[37m${truncated}\x1b[0m\x1b[K\n`;
        });

        output += `\x1b[90m${divider}\x1b[0m\x1b[K\n`;
      });

      process.stdout.write(output);
    };

    // Render loop timer (updates every 120ms)
    const renderInterval = setInterval(render, 120);

    // Trap Ctrl+C (SIGINT) to prevent orphaned processes and unhide cursor
    const onSigInt = () => {
      clearInterval(renderInterval);
      cleanup();
      taskStates.forEach(t => {
        if (t.child && !t.child.killed) {
          try {
            t.child.kill('SIGTERM');
          } catch (_) {}
        }
      });
      process.exit(130);
    };
    process.on('SIGINT', onSigInt);

    let completedCount = 0;
    let hasError = false;

    // Spawn child processes concurrently (or simulate in dry-run mode)
    taskStates.forEach(task => {
      let executionCmd = task.cmd;

      if (isDryRun) {
        executionCmd = [
          `echo "[DRY-RUN] Initializing ${task.name}..."`,
          'sleep 0.6',
          `echo "[DRY-RUN] > Validating workspace configuration"`,
          'sleep 0.6',
          `echo "[DRY-RUN] > Would execute: ${task.cmd.replace(/"/g, '\\"')}"`,
          'sleep 0.6',
          `echo "[DRY-RUN] > Simulated target output generated successfully"`,
        ].join(' && ');
      }

      const [shell, shellArg] = isWin ? ['cmd.exe', '/c'] : ['/bin/sh', '-c'];
      const child = spawn(shell, [shellArg, executionCmd], {
        env: {
          ...process.env,
          FORCE_COLOR: 'true',
        },
      });
      task.child = child;

      // Ingest stream data and maintain buffer of recent output lines
      const appendData = data => {
        const text = data.toString();
        const split = text.split(/\r?\n|\r/);
        for (const item of split) {
          const trimmed = item.trim();
          if (trimmed) {
            task.lines.push(trimmed);
            if (task.lines.length > 200) task.lines.shift(); // Keep max 200 lines in history
          }
        }
      };

      child.stdout.on('data', appendData);
      child.stderr.on('data', appendData);

      // Handle process completion
      child.on('close', code => {
        task.endTime = Date.now();
        task.exitCode = code;
        task.status = code === 0 ? 'SUCCESS' : 'FAILED';
        if (code !== 0) hasError = true;

        completedCount++;
        if (completedCount === taskStates.length) {
          clearInterval(renderInterval);
          render();
          cleanup();
          process.removeListener('SIGINT', onSigInt);
          process.stdout.write('\n');
          if (hasError) {
            reject(new Error('One or more release build tasks failed.'));
          } else {
            resolve();
          }
        }
      });

      // Handle process launch or spawn errors
      child.on('error', err => {
        task.lines.push(`Error: ${err.message}`);
        task.status = 'FAILED';
        task.endTime = Date.now();
        if (!task.exitCode) task.exitCode = 1;
        completedCount++;
        hasError = true;
        if (completedCount === taskStates.length) {
          clearInterval(renderInterval);
          render();
          cleanup();
          process.removeListener('SIGINT', onSigInt);
          reject(err);
        }
      });
    });
  });
};

module.exports = {
  runParallel,
};
