import { Theme } from './types';

export const DarkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#04885b',
    primary_container: '#00875a',
    on_primary: '#ffffff',
    on_primary_container: '#ffffff',

    secondary: '#597f6a',
    secondary_container: '#252a34',
    on_secondary: '#f9fafb',
    on_secondary_container: '#ffffff',

    tertiary: '#6a6ec3',
    tertiary_container: '#1e3a8a',
    on_tertiary: '#ffffff',
    on_tertiary_container: '#bfdbfe',

    error: '#f87171',
    error_container: '#b91c1c',
    on_error: '#ffffff',
    on_error_container: '#fee2e2',

    background: '#0f1117',
    on_background: '#f9fafb',

    surface: '#1a1d23',
    on_surface: '#f9fafb',

    surface_variant: '#252a34',
    on_surface_variant: '#9ca3af',

    surface_container_lowest: '#0a0c10',
    surface_container_low: '#15181e',
    surface_container: '#1a1d23',
    surface_container_high: '#2a2d35',
    surface_container_highest: '#353a45',

    outline: '#737873',
    outline_variant: '#374151',

    shadow: '#000000',
    scrim: '#000000',
    inverse_surface: '#f9fafb',
    inverse_on_surface: '#0f1117',
    inverse_primary: '#04885b',
  },
  roundness: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
};
