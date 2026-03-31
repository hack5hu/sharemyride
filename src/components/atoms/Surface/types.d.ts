import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type SurfaceElevation = 'lowest' | 'low' | 'medium' | 'high';
export type SurfaceRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SurfacePadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SurfaceProps {
  children: ReactNode;
  elevation?: SurfaceElevation;
  rounded?: SurfaceRounded;
  padding?: SurfacePadding;
  style?: ViewStyle;
}
