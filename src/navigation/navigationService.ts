import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/** Throttle guard to prevent duplicate navigations */
const THROTTLE_MS = 500;
let lastNavigationTime = 0;

export const navigate = (name: keyof RootStackParamList, params?: any) => {
  const now = Date.now();
  if (now - lastNavigationTime < THROTTLE_MS) return;
  lastNavigationTime = now;

  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  } else {
    // Retry for cold starts where the UI hasn't fully booted
    setTimeout(() => {
      if (navigationRef.isReady()) {
        navigationRef.navigate(name as any, params as any);
      }
    }, 500);
  }
};
