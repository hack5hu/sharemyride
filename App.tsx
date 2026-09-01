import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox, AppState, AppStateStatus, Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

import { LightTheme, DarkTheme } from '@/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';
import { useDeviceIdStore } from '@/store/useDeviceIdStore';
import { useSettingsStore } from '@/store/settings';
import { NetworkLoggerModal } from '@/components/organisms/NetworkLoggerModal';
import { GlobalNotification } from '@/components/organisms/GlobalNotification';
import { StallionUpdateModal } from '@/components/organisms/StallionUpdateModal';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import NativeSplash from '@/specs/NativeSplash';
import { NotificationService } from '@/serviceManager/NotificationService';
import { ChatService } from '@/serviceManager/ChatService';

import { navigationRef } from '@/navigation/navigationService';
import { AnalyticsService } from '@/serviceManager/AnalyticsService';
import { withStallion } from 'react-native-stallion';

const App = () => {
  const routeNameRef = React.useRef<string | undefined>(undefined);
  const initialize = useAuthStore(state => state.initialize);
  const initialiseDeviceId = useDeviceIdStore(state => state.initialise);
  const themeMode = useSettingsStore(state => state.themeMode);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  const activeTheme = themeMode === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    if (NativeSplash?.setTheme) {
      NativeSplash.setTheme(themeMode);
    }
    Appearance.setColorScheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const initApp = async () => {
      await initialize();
      initialiseDeviceId();
      NotificationService.initialize();
      if (NativeSplash?.hide) {
        NativeSplash.hide(true);
      }
    };
    initApp();
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
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
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