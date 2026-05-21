import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { LightTheme, DarkTheme } from '@/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';
import { useDeviceIdStore } from '@/store/useDeviceIdStore';
import { useSettingsStore } from '@/store/settings';
import { NetworkLoggerModal } from '@/components/organisms/NetworkLoggerModal';
import { GlobalNotification } from '@/components/organisms/GlobalNotification';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import NotificationService from '@/serviceManager/notificationService';

import { navigationRef } from '@/navigation/navigationService';

const App = () => {
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
      <KeyboardProvider>
        <ThemeProvider theme={activeTheme}>
        <StatusBar 
          barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} 
          backgroundColor="transparent" 
          translucent 
        />
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
        <NetworkLoggerModal />
        <GlobalNotification />
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};


export default App;
