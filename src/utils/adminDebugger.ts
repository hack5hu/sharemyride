import { useNetworkLoggerStore } from '@/store/useNetworkLoggerStore';
import { Logger } from '@/utils/logger';
import { storage } from '@/utils/storage';

const ADMIN_DEBUGGER_KEY = 'is_admin_debugger_enabled';

/**
 * Checks synchronously whether this device has admin debugger permissions.
 */
export const getIsAdminDebuggerEnabled = (): boolean => {
  try {
    return storage.getBoolean(ADMIN_DEBUGGER_KEY) ?? false;
  } catch (error) {
    Logger.error('[AdminDebugger] Failed to read admin debugger status:', error);

    return false;
  }
};

/**
 * Sets the admin debugger status in persistent storage and syncs with the store.
 */
export const setAdminDebuggerEnabled = (enabled: boolean): void => {
  try {
    storage.set(ADMIN_DEBUGGER_KEY, enabled);
    useNetworkLoggerStore.getState().setAdminDebuggerEnabled(enabled);
  } catch (error) {
    Logger.error('[AdminDebugger] Failed to set admin debugger status:', error);
  }
};

/**
 * Initializes admin debugger status from persistent storage on startup.
 */
export const initAdminDebugger = (): void => {
  const isEnabled = getIsAdminDebuggerEnabled();
  useNetworkLoggerStore.getState().setAdminDebuggerEnabled(isEnabled);
};
