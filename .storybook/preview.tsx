import React from 'react';
import type { Preview } from '@storybook/react-native-web-vite';
import { ThemeProvider } from 'styled-components/native';
import { LightTheme } from '../src/theme';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider theme={LightTheme}>
            <View style={{ flex: 1, backgroundColor: LightTheme.colors.background || '#FFFFFF', padding: 20 }}>
              <Story />
            </View>
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    ),
  ],
};

export default preview;
