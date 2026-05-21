import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: keyof RootStackParamList, params?: any) => {
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
