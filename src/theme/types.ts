export interface ThemeColors {
  primary: string;
  primary_container: string;
  on_primary: string;
  on_primary_container: string;
  
  secondary: string;
  secondary_container: string;
  on_secondary: string;
  on_secondary_container: string;
  
  tertiary: string;
  tertiary_container: string;
  on_tertiary: string;
  on_tertiary_container: string;
  
  error: string;
  error_container: string;
  on_error: string;
  on_error_container: string;
  
  background: string;
  on_background: string;
  
  surface: string;
  on_surface: string;
  
  surface_variant: string;
  on_surface_variant: string;
  
  surface_container_lowest: string;
  surface_container_low: string;
  surface_container: string;
  surface_container_high: string;
  surface_container_highest: string;
  
  outline: string;
  outline_variant: string;
  
  shadow: string;
  scrim: string;
  inverse_surface: string;
  inverse_on_surface: string;
  inverse_primary: string;

  primary_fixed: string;
  primary_fixed_dim: string;
  on_primary_fixed: string;
  on_primary_fixed_variant: string;

  secondary_fixed: string;
  secondary_fixed_dim: string;
  on_secondary_fixed: string;
  on_secondary_fixed_variant: string;

  tertiary_fixed: string;
  tertiary_fixed_dim: string;
  on_tertiary_fixed: string;
  on_tertiary_fixed_variant: string;
}


export interface Theme {
  name: 'light' | 'dark';
  colors: ThemeColors;
  roundness: {
    none: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}
