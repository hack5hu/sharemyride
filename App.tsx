import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LightTheme as theme } from '@/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';
import { LoginScreen } from '@/screens/Login';

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        {/* <RootNavigator /> */}
        <LoginScreen/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
