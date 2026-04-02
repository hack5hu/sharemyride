import { CategoryIconVariant } from '@/components/atoms/CategoryIcon';

export interface CategoryButtonProps {
  label: string;
  icon: string;
  variant: CategoryIconVariant;
  isSelected?: boolean;
  onPress: () => void;
}
