import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { LightTheme, DarkTheme } from '@/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';
import { useSettingsStore } from '@/store/settings';

const App = () => {
  const initialize = useAuthStore(state => state.initialize);
  const themeMode = useSettingsStore(state => state.themeMode);
  
  const activeTheme = themeMode === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={activeTheme}>
        <StatusBar 
          barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} 
          backgroundColor="transparent" 
          translucent 
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};


export default App;
