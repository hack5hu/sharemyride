export type StatusBadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'matched' | 'pending';

export interface StatusBadgeProps {
  label: string;
  variant?: StatusBadgeVariant;
  isUppercase?: boolean;
}
