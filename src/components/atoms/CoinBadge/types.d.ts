export type CoinBadgeVariant = 'header' | 'compact' | 'card' | 'hero';

export interface CoinBadgeProps {
  coins: number;
  onPress?: () => void;
  onHelpPress?: () => void;
  variant?: CoinBadgeVariant;
  showHelpIcon?: boolean;
  testID?: string;
}
