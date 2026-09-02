import { createNavigationContainerRef } from '@react-navigation/native';
import { useAuthStore } from '@/store/useAuthStore';
import { type RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/** Throttle guard to prevent duplicate navigations */
const THROTTLE_MS = 500;
let lastNavigationTime = 0;

export const navigate = (name: keyof RootStackParamList, params?: any) => {
  const now = Date.now();
  if (now - lastNavigationTime < THROTTLE_MS) return;
  lastNavigationTime = now;

  const tryNavigate = (attempts = 0) => {
    const { isAuthenticated, isProfileCompleted, isInitializing } = useAuthStore.getState();
    const publicScreens: Array<keyof RootStackParamList> = ['Login', 'OTPVerification', 'ProfileSetup'];
    const isTargetAuthenticated = !publicScreens.includes(name);

    const isReadyToNavigate =
      navigationRef.isReady() &&
      (!isTargetAuthenticated || (isAuthenticated && isProfileCompleted && !isInitializing));

    if (isReadyToNavigate) {
      navigationRef.navigate(name as any, params as any);
    } else if (attempts < 15) { // Try for up to 7.5 seconds
      setTimeout(() => tryNavigate(attempts + 1), 500);
    }
  };

  tryNavigate();
};
