import { Theme } from './types';

export const LightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#04885b',
    primary_container: '#00875a',
    on_primary: '#ffffff',
    on_primary_container: '#ffffff',

    secondary: '#597f6a',
    secondary_container: '#eaefe9',
    on_secondary: '#171d19',
    on_secondary_container: '#2e3440',

    tertiary: '#6a6ec3',
    tertiary_container: '#dbeafe',
    on_tertiary: '#ffffff',
    on_tertiary_container: '#1e3a8a',

    error: '#ef4444',
    error_container: '#fee2e2',
    on_error: '#ffffff',
    on_error_container: '#b91c1c',

    background: '#f5fbf4',
    on_background: '#171d19',

    surface: '#f5fbf4',
    on_surface: '#171d19',

    surface_variant: '#eaefe9',
    on_surface_variant: '#4c566a',

    surface_container_lowest: '#ffffff',
    surface_container_low: '#f1f5f1',
    surface_container: '#eaefe9',
    surface_container_high: '#e0e6e0',
    surface_container_highest: '#d6ddd6',

    outline: '#cbd5e1',
    outline_variant: '#bdcac0', // Ghost border at 15% opacity usually

    shadow: '#171d19',
    scrim: '#000000',
    inverse_surface: '#171d19',
    inverse_on_surface: '#f5fbf4',
    inverse_primary: '#04885b',

    primary_fixed: '#8df7c1',
    primary_fixed_dim: '#71dba6',
    on_primary_fixed: '#002113',
    on_primary_fixed_variant: '#005235',

    secondary_fixed: '#c2ecd2',
    secondary_fixed_dim: '#a7d0b7',
    on_secondary_fixed: '#002113',
    on_secondary_fixed_variant: '#294e3b',

    tertiary_fixed: '#e1e0ff',
    tertiary_fixed_dim: '#c0c1ff',
    on_tertiary_fixed: '#080764',
    on_tertiary_fixed_variant: '#3a3d8f',
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
