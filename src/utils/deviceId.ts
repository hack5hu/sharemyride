/**
 * Persistent Device ID Utility
 *
 * Generates a device ID that survives app uninstall/reinstall:
 * - iOS:     UUID stored in Keychain (Keychain persists across uninstalls)
 * - Android: Settings.Secure.ANDROID_ID (naturally persists across uninstalls)
 *
 * The resolved ID is cached in memory after first access for zero-cost reads.
 */
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';
import { Logger } from '@/utils/logger';

/** Keychain service name dedicated to the device identifier */
const DEVICE_ID_SERVICE = 'ridepool_device_id';

/** In-memory cache so repeated calls never hit async storage twice */
let cachedDeviceId: string | null = null;

/**
 * Generate a RFC-4122 v4-style UUID without external dependencies.
 * Used exclusively on iOS for first-time Keychain seeding.
 */
const generateUUID = (): string => {
  const hex = '0123456789abcdef';
  let uuid = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4';
    } else if (i === 19) {
      uuid += hex[(Math.random() * 4) | 8];
    } else {
      uuid += hex[(Math.random() * 16) | 0];
    }
  }
  return uuid;
};

/**
 * Retrieve (or create) a persistent device identifier.
 *
 * @returns A promise that resolves to a stable, unique device ID string.
 */
export const getDeviceId = async (): Promise<string> => {
  // Return from memory cache if available
  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  try {
    if (Platform.OS === 'ios') {
      return await getIOSDeviceId();
    }
    return await getAndroidDeviceId();
  } catch (error) {
    Logger.error('[DeviceId] Failed to resolve device ID:', error);
    // Ultimate fallback: generate a transient ID so the app never crashes
    const fallback = generateUUID();
    cachedDeviceId = fallback;
    return fallback;
  }
};

/**
 * iOS: Read from Keychain (persists across uninstall). Seed on first launch.
 */
const getIOSDeviceId = async (): Promise<string> => {
  const existing = await Keychain.getGenericPassword({
    service: DEVICE_ID_SERVICE,
  });

  if (existing && existing.password) {
    cachedDeviceId = existing.password;
    Logger.log('[DeviceId] iOS – restored from Keychain');
    return existing.password;
  }

  // First launch: generate and persist
  const newId = generateUUID();
  await Keychain.setGenericPassword(DEVICE_ID_SERVICE, newId, {
    service: DEVICE_ID_SERVICE,
    accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
  });

  cachedDeviceId = newId;
  Logger.log('[DeviceId] iOS – created new ID and stored in Keychain');
  return newId;
};

/**
 * Android: Read ANDROID_ID via react-native-device-info.
 * This value is tied to the signing key and user, and naturally
 * persists across uninstalls (resets only on factory reset).
 */
const getAndroidDeviceId = async (): Promise<string> => {
  const androidId = await DeviceInfo.getAndroidId();

  if (androidId) {
    cachedDeviceId = androidId;
    Logger.log('[DeviceId] Android – resolved ANDROID_ID');
    return androidId;
  }

  // Fallback: use unique device ID from device-info
  const uniqueId = await DeviceInfo.getUniqueId();
  cachedDeviceId = uniqueId;
  Logger.log('[DeviceId] Android – resolved via getUniqueId fallback');
  return uniqueId;
};

/**
 * Clear the in-memory device ID cache.
 * Useful during testing or when debugging identity issues.
 */
export const clearDeviceIdCache = (): void => {
  cachedDeviceId = null;
};
