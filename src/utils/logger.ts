/**
 * Custom Logger utility that toggles behavior between Development and Production.
 */
const Logger = {
  log: (...args: unknown[]) => {
    if (__DEV__) {
      console.log('[LOG]:', ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (__DEV__) {
      console.error('[ERROR]:', ...args);
    } else {
      // In production, you might want to send this to a service like Sentry or Firebase Crashlytics
      // For now, we'll just ignore or use a silent log
    }
  },
  warn: (...args: unknown[]) => {
    if (__DEV__) {
      console.warn('[WARN]:', ...args);
    }
  },
  info: (...args: unknown[]) => {
    if (__DEV__) {
      console.info('[INFO]:', ...args);
    }
  },
};

export { Logger };
