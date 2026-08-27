import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox, AppState, AppStateStatus } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

import { LightTheme, DarkTheme } from '@/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';
import { useDeviceIdStore } from '@/store/useDeviceIdStore';
import { useSettingsStore } from '@/store/settings';
import { NetworkLoggerModal } from '@/components/organisms/NetworkLoggerModal';
import { GlobalGpsBanner } from '@/components/molecules/GlobalGpsBanner';
import { GlobalNotification } from '@/components/organisms/GlobalNotification';
import { StallionUpdateModal } from '@/components/organisms/StallionUpdateModal';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { NotificationService } from '@/serviceManager/NotificationService';
import { ChatService } from '@/serviceManager/ChatService';

import { navigationRef } from '@/navigation/navigationService';
import { AnalyticsService } from '@/serviceManager/AnalyticsService';
import { useGlobalLiveLocation } from '@/hooks/useGlobalLiveLocation';
import { withStallion } from 'react-native-stallion';
import BootSplash from 'react-native-bootsplash';


const App = () => {
  useGlobalLiveLocation();
  const routeNameRef = React.useRef<string | undefined>(undefined);
  const initialize = useAuthStore(state => state.initialize);
  const initialiseDeviceId = useDeviceIdStore(state => state.initialise);
  const themeMode = useSettingsStore(state => state.themeMode);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  const activeTheme = themeMode === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    BootSplash.hide().catch(() => {});
    initialize();
    initialiseDeviceId();
    NotificationService.initialize();
  }, [initialize, initialiseDeviceId]);

  useEffect(() => {
    if (!isAuthenticated || !user?.userId) return;

    // Sync conversations on mount if authenticated
    ChatService.syncConversations(user.userId).catch(() => undefined);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && user?.userId) {
        ChatService.syncConversations(user.userId).catch(() => undefined);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, user?.userId]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <ThemeProvider theme={activeTheme}>
          <StatusBar
            barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <GlobalGpsBanner />
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
              BootSplash.hide().catch(() => {});
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

              if (previousRouteName !== currentRouteName && currentRouteName) {
                await AnalyticsService.logScreenView(currentRouteName);
              }
              routeNameRef.current = currentRouteName;
            }}
          >
            <RootNavigator />
          </NavigationContainer>
         <NetworkLoggerModal /> 
          <GlobalNotification />
          <StallionUpdateModal />
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default withStallion(App);
// export default App;