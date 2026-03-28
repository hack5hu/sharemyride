import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '@/styles/theme';
import { RootNavigator } from '@/navigation';
import { useAuthStore } from '@/store';

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
