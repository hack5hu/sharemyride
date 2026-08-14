import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      modulesToTranspile: [
        'react-native-mmkv',
        '@maplibre/maplibre-react-native',
        'react-native-date-picker',
      ],
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        __DEV__: true,
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
      resolve: {
        alias: {
          'react-native-linear-gradient': 'react-native-web-linear-gradient',
          'react-native': path.resolve(
            process.cwd(),
            '.storybook',
            'rn-web-fix.js',
          ),
          '@maplibre/maplibre-react-native': path.resolve(
            process.cwd(),
            '.storybook',
            'mocks.js',
          ),
          'react-native-date-picker': path.resolve(
            process.cwd(),
            '.storybook',
            'mocks.js',
          ),
          'react-native-maps': path.resolve(
            process.cwd(),
            '.storybook',
            'mocks.js',
          ),
          'react-native-safe-area-context': path.resolve(
            process.cwd(),
            '.storybook',
            'mocks.js',
          ),
          'react-native-mmkv': path.resolve(
            process.cwd(),
            '.storybook',
            'mocks.js',
          ),
          'react-native-reanimated': path.resolve(
            process.cwd(),
            '.storybook',
            'mocks.js',
          ),
          'react-native-device-info': path.resolve(
            process.cwd(),
            '.storybook',
            'device-info-mock.js',
          ),
          '@react-native-firebase/app': path.resolve(
            process.cwd(),
            '.storybook/firebase-mock.js',
          ),
          '@react-native-firebase/messaging': path.resolve(
            process.cwd(),
            '.storybook/firebase-mock.js',
          ),
          'react-native-vector-icons/MaterialIcons':
            'react-native-vector-icons/dist/MaterialIcons',
          'react-native-vector-icons/Ionicons':
            'react-native-vector-icons/dist/Ionicons',
          '@env': path.resolve(process.cwd(), '.storybook', 'env-mock.js'),
          '@': path.resolve(process.cwd(), 'src'),
        },
      },
      optimizeDeps: {
        exclude: [
          'react-native',
          'react-native-mmkv',
          '@maplibre/maplibre-react-native',
          'react-native-date-picker',
          'react-native-safe-area-context',
          'react-native-reanimated',
        ],
      },
    });
  },
};
export default config;
