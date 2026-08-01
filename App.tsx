import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';

LogBox.ignoreLogs(['InteractionManager has been deprecated']);

import { LightTheme, DarkTheme } from '@/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';
import { useDeviceIdStore } from '@/store/useDeviceIdStore';
import { useSettingsStore } from '@/store/settings';
import { NetworkLoggerModal } from '@/components/organisms/NetworkLoggerModal';
import { GlobalNotification } from '@/components/organisms/GlobalNotification';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { NotificationService } from '@/serviceManager/NotificationService';

import { navigationRef } from '@/navigation/navigationService';
import { AnalyticsService } from '@/serviceManager/AnalyticsService';
import { withStallion } from 'react-native-stallion';


const App = () => {
  const routeNameRef = React.useRef<string | undefined>(undefined);
  const initialize = useAuthStore(state => state.initialize);
  const initialiseDeviceId = useDeviceIdStore(state => state.initialise);
  const themeMode = useSettingsStore(state => state.themeMode);

  const activeTheme = themeMode === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    initialize();
    initialiseDeviceId();
    NotificationService.initialize();
  }, [initialize, initialiseDeviceId]);

  return (
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
          {/* <NetworkLoggerModal /> */}
          <GlobalNotification />
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default withStallion(App);