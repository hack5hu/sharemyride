import BackgroundService from 'react-native-background-actions';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import rideService from '@/serviceManager/rideService';
import { Logger } from '@/utils/logger';
import { Platform } from 'react-native';
import { locationQueue } from './locationQueue';

interface TaskParams {
  rideId: string | number;
}

// Global configuration setup targeting native system permission engines
Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: false,
  enableBackgroundLocationUpdates: true, // MANDATORY FOR IOS BACKGROUND STREAMING
  locationProvider: 'playServices', // MANDATORY FOR HIGH-PRECISION ANDROID ACCURACY
});

/**
 * Resolves a single snapshot of high-accuracy device location wrapped cleanly in a Promise.
 * This guarantees execution even when native stream listeners get frozen by the OS.
 */
const grabCurrentCoordinates = (
  highAccuracy: boolean,
): Promise<GeolocationResponse> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {
        enableHighAccuracy: highAccuracy,
        timeout: highAccuracy ? 15000 : 8000, // Short network timeout for passive mode
        maximumAge: highAccuracy ? 0 : 5000, // Utilize cell tower/Wi-Fi positioning cache when stationary
      },
    );
  });
};

/**
 * Headless background task task execution loop.
 * Operates on a deterministic hardware-timed pulse pattern to maintain persistence.
 */
const locationTrackingTask = async (
  taskDataArguments?: TaskParams,
): Promise<void> => {
  const rideId = taskDataArguments?.rideId;
  if (!rideId) {
    Logger.error('[BackgroundLocation] Missing rideId in task parameters');
    return;
  }

  Logger.log(
    `[BackgroundLocation] Initializing loop thread for ride: ${rideId}`,
  );

  let lastValidLat = 0;
  let lastValidLng = 0;
  let regularIntervalDelay = 6000; // Default: update every 6 seconds
  let isHighAccuracyActive = true;
  let stationaryCycleCount = 0;

  while (BackgroundService.isRunning()) {
    const startTime = Date.now();

    try {
      // 1. Fetch current device location using dynamically toggled high accuracy or passive cellular providers
      const position = await grabCurrentCoordinates(isHighAccuracyActive);
      const { latitude, longitude, accuracy, speed } = position.coords;

      // ---- SCENARIO 1: ANTI-FRAUD & JUNK FILTERING ----
      // Ignore extreme outliers, dead zones, mock coordinates, or poor accuracy signatures (> 50 meters)
      if (latitude === 0 || longitude === 0 || accuracy > 50) {
        Logger.log(
          `[BackgroundLocation] Dropped low-quality hardware coordinate data. Accuracy: ${accuracy}m`,
        );
      } else {
        // ---- SCENARIO 2: JITTER & BATTERY THROTTLER ----
        // Calculate standard approximate delta shift (Haversine estimation shortcut)
        const latDelta = Math.abs(latitude - lastValidLat);
        const lngDelta = Math.abs(longitude - lastValidLng);

        // Check if device moved noticeably (approx ~8 meters shift in High-Accuracy or ~22 meters in Passive mode to filter cellular jitter)
        const movementThreshold = isHighAccuracyActive ? 0.00007 : 0.0002;

        if (latDelta > movementThreshold || lngDelta > movementThreshold) {
          // --- MOVEMENT WAKE-UP TRANSITION ---
          if (!isHighAccuracyActive) {
            isHighAccuracyActive = true;
            stationaryCycleCount = 0;
            Logger.log(
              '[BackgroundLocation] Motion detected in passive network mode. Waking up high-accuracy GPS engine instantly!',
            );
          }

          lastValidLat = latitude;
          lastValidLng = longitude;
          stationaryCycleCount = 0;

          // ---- SCENARIO 3: DYNAMIC REFRESH SPEEDS ----
          // If traveling fast (> 25km/h or ~7m/s), check more frequently to prevent map skipping
          regularIntervalDelay = speed && speed > 7 ? 4000 : 7000;

          try {
            // Dispatch validated payload downstream to server
            await rideService.updateLocation(rideId, latitude, longitude);
            Logger.log(
              `[BackgroundLocation] Dispatched location to service Manager: ${latitude}, ${longitude}`,
            );

            if (Platform.OS === 'android') {
              await BackgroundService.updateNotification({
                taskDesc: `Tracking active • Route updated live`,
              });
            }

            // Connection is active! Check if there is an offline backlog to upload
            if (locationQueue.size() > 0) {
              Logger.log(
                `[BackgroundLocation] Cellular radio restored. Syncing backlog of ${locationQueue.size()} entries.`,
              );
              const backlog = locationQueue.get();

              // Upload the complete sequence to the backend in a compressed payload
              await rideService.syncLocationBacklog(rideId, backlog);

              // Clean out the cache upon success
              locationQueue.flush();
              Logger.log(
                '[BackgroundLocation] Offline backlog sync completed and purged.',
              );
            }
          } catch (apiErr) {
            // Network dropped or signal dead zone encountered. Buffer the coordinate natively!
            Logger.warn(
              '[BackgroundLocation] Live dispatch failed (signal dead zone). Buffering coordinate locally.',
            );
            locationQueue.enqueue(latitude, longitude);

            if (Platform.OS === 'android') {
              await BackgroundService.updateNotification({
                taskDesc: `Tracking active (Offline) • ${locationQueue.size()} logs cached`,
              });
            }
          }
        } else {
          // Device is stationary. Increment stationary state duration checks.
          stationaryCycleCount++;

          if (isHighAccuracyActive && stationaryCycleCount >= 3) {
            // --- STATIONARY SLEEP TRANSITION ---
            // Vehicle has stopped moving completely for ~20-30 seconds (eating lunch, stuck at major signal).
            // Power off GPS chip completely and fall back to passive cell-tower/Wi-Fi tracking (saves 99% battery!)
            isHighAccuracyActive = false;
            Logger.log(
              '[BackgroundLocation] Vehicle stationary for 3 cycles. Powering off high-power GPS hardware and switching to passive low-power networking.',
            );

            if (Platform.OS === 'android') {
              await BackgroundService.updateNotification({
                taskDesc: `Tracking paused • Stationary battery-saving active`,
              });
            }
          }

          if (!isHighAccuracyActive) {
            // Slow down the passive check frequency to 15 seconds to maximize device sleep states
            regularIntervalDelay = 15000;
          } else {
            // Standard throttle before switching down GPS
            regularIntervalDelay = 12000;
          }

          Logger.log(
            `[BackgroundLocation] Device stationary. Throttling interval: ${regularIntervalDelay}ms (HighAccuracy GPS: ${isHighAccuracyActive})`,
          );
        }
      }
    } catch (hardwareError) {
      Logger.error(
        '[BackgroundLocation] Failed to acquire device telemetry:',
        hardwareError,
      );
      // In a signal dead zone (tunnel, underground parking), wait a bit before requesting hardware hooks again
      regularIntervalDelay = 10000;
    }

    // Determine processing execution latency offset to maintain a highly reliable, flat time tracking loop rhythm
    const runtimeDuration = Date.now() - startTime;
    const computedExecutionSleep = Math.max(
      1000,
      regularIntervalDelay - runtimeDuration,
    );

    await new Promise(resolve => setTimeout(resolve, computedExecutionSleep));
  }

  Logger.log('[BackgroundLocation] Core looping thread terminated safely.');
};

/**
 * Starts the persistent background location service.
 */
export const startBackgroundLocationTracking = async (
  rideId: string | number,
): Promise<void> => {
  if (BackgroundService.isRunning()) {
    Logger.log(
      '[BackgroundLocation] Core engine active. Stopping current process thread first.',
    );
    await stopBackgroundLocationTracking();
  }

  const options = {
    taskName: `Marg_Tracker_${rideId}`,
    taskTitle: 'Trip in Progress',
    taskDesc: 'Sharing live telemetry data with passengers...',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#00AA7B', // Marg Brand Green Accent
    linkingURI: `ridepoolcompany://ride-details/${rideId}`,
    foregroundServiceType: ['location'] as 'location'[], // Enforces explicit Android OS location classification
    parameters: {
      rideId,
    },
  };

  try {
    await BackgroundService.start(locationTrackingTask, options);
    Logger.log(
      `[BackgroundLocation] Engine initialized successfully for ride identifier: ${rideId}`,
    );
  } catch (error) {
    Logger.error(
      '[BackgroundLocation] Initialization routine critically faulted:',
      error,
    );
    throw error;
  }
};

/**
 * Stops the active persistent background location service.
 */
export const stopBackgroundLocationTracking = async (): Promise<void> => {
  try {
    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
      Logger.log(
        '[BackgroundLocation] Engine termination routines executed cleanly.',
      );
    }
  } catch (error) {
    Logger.error(
      '[BackgroundLocation] Engine termination routines faulted:',
      error,
    );
    throw error;
  }
};
