import { type ReactNode } from 'react';
import { type TextProps, type TextStyle } from 'react-native';

export type TypographyVariant =
  | 'display'
  | 'headline'
  | 'title'
  | 'body'
  | 'label';
export type TypographySize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: string;
  align?: TextStyle['textAlign'];
  children: ReactNode;
}
