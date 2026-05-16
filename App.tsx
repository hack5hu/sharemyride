import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { LightTheme, DarkTheme } from '@/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';
import { useSettingsStore } from '@/store/settings';
import { NetworkLoggerModal } from '@/components/organisms/NetworkLoggerModal';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const App = () => {
  const initialize = useAuthStore(state => state.initialize);
  const themeMode = useSettingsStore(state => state.themeMode);
  
  const activeTheme = themeMode === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <ThemeProvider theme={activeTheme}>
        <StatusBar 
          barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} 
          backgroundColor="transparent" 
          translucent 
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <NetworkLoggerModal />
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};


export default App;
