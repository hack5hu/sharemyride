import { storage } from '@/utils/storage';
import { Logger } from '@/utils/logger';

export interface QueuedLocation {
  latitude: number;
  longitude: number;
  timestamp: number;
}

const QUEUE_KEY = 'location_backlog';

export const locationQueue = {
  /**
   * Appends a coordinate log entry to the secure local cache database.
   *
   * @param latitude The resolved GPS latitude coordinate.
   * @param longitude The resolved GPS longitude coordinate.
   */
  enqueue: (latitude: number, longitude: number): void => {
    try {
      const currentQueue = locationQueue.get();
      const newEntry: QueuedLocation = {
        latitude,
        longitude,
        timestamp: Date.now(),
      };
      
      currentQueue.push(newEntry);
      storage.set(QUEUE_KEY, JSON.stringify(currentQueue));
      Logger.log(`[LocationQueue] Coordinate buffered. Queue count: ${currentQueue.length}`);
    } catch (error) {
      Logger.error('[LocationQueue] Failed to buffer coordinate to MMKV:', error);
    }
  },

  /**
   * Retrieves the full sequence of locally-buffered location entries.
   */
  get: (): QueuedLocation[] => {
    try {
      const rawData = storage.getString(QUEUE_KEY);
      if (rawData) {
        return JSON.parse(rawData) as QueuedLocation[];
      }
    } catch (error) {
      Logger.error('[LocationQueue] Failed to read cached queue from disk:', error);
    }
    return [];
  },

  /**
   * Cleans the local persistent queue storage and returns the logs sequence.
   */
  flush: (): QueuedLocation[] => {
    try {
      const data = locationQueue.get();
      storage.remove(QUEUE_KEY);
      Logger.log('[LocationQueue] Secure cache queue flushed successfully.');
      return data;
    } catch (error) {
      Logger.error('[LocationQueue] Failed to purge storage queue:', error);
      return [];
    }
  },

  /**
   * Returns the exact quantity of currently-buffered coordinates.
   */
  size: (): number => {
    return locationQueue.get().length;
  },
};
