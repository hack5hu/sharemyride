export type CategoryIconVariant = 'primary' | 'secondary' | 'tertiary' | 'surface' | 'emerald';

export interface CategoryIconProps {
  icon: string;
  variant?: CategoryIconVariant;
  size?: number;
}
