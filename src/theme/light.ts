import { Theme } from './types';

export const LightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#0058bc',
    primary_container: '#0070eb',
    on_primary: '#ffffff',
    on_primary_container: '#fefcff',

    secondary: '#515f78',
    secondary_container: '#d2e0fe',
    on_secondary: '#ffffff',
    on_secondary_container: '#55637d',

    tertiary: '#5d5c5b',
    tertiary_container: '#767474',
    on_tertiary: '#ffffff',
    on_tertiary_container: '#f7feff',

    error: '#ba1a1a',
    error_container: '#ffdad6',
    on_error: '#ffffff',
    on_error_container: '#93000a',

    background: '#f9f9f9',
    on_background: '#1a1c1c',

    surface: '#f9f9f9',
    on_surface: '#1a1c1c',

    surface_variant: '#e2e2e2',
    on_surface_variant: '#414755',

    surface_container_lowest: '#ffffff',
    surface_container_low: '#f3f3f4',
    surface_container: '#eeeeee',
    surface_container_high: '#e8e8e8',
    surface_container_highest: '#e2e2e2',

    outline: '#717786',
    outline_variant: '#c1c6d7',

    shadow: '#1a1c1c',
    scrim: '#000000',
    inverse_surface: '#2f3131',
    inverse_on_surface: '#f0f1f1',
    inverse_primary: '#adc6ff',

    primary_fixed: '#d8e2ff',
    primary_fixed_dim: '#adc6ff',
    on_primary_fixed: '#001a41',
    on_primary_fixed_variant: '#004493',

    secondary_fixed: '#d6e3ff',
    secondary_fixed_dim: '#b9c7e4',
    on_secondary_fixed: '#0d1c32',
    on_secondary_fixed_variant: '#39475f',

    tertiary_fixed: '#e5e2e1',
    tertiary_fixed_dim: '#c8c6c5',
    on_tertiary_fixed: '#1c1b1b',
    on_tertiary_fixed_variant: '#474646',
    
    read_receipt: '#34B7F1',
    warning: '#EAB308',
  },

  roundness: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12, // 12px base geometry
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
