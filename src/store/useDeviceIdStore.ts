import { create } from 'zustand';
import { getDeviceId } from '@/utils/deviceId';
import { Logger } from '@/utils/logger';

interface DeviceIdState {
  /** The resolved persistent device ID */
  deviceId: string | null;
  /** Whether the ID is currently being resolved */
  isLoading: boolean;
  /** Initialise and cache the device ID — safe to call multiple times */
  initialise: () => Promise<void>;
}

export const useDeviceIdStore = create<DeviceIdState>((set, get) => ({
  deviceId: null,
  isLoading: false,

  initialise: async () => {
    // Guard: skip if already resolved or in-flight
    if (get().deviceId || get().isLoading) {
      return;
    }

    set({ isLoading: true });

    try {
      const id = await getDeviceId();
      set({ deviceId: id, isLoading: false });
      Logger.log(`[DeviceIdStore] Resolved: ${id}`);
    } catch (error) {
      Logger.error('[DeviceIdStore] Failed to initialise device ID:', error);
      set({ isLoading: false });
    }
  },
}));
