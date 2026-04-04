export interface StopItemProps {
  type: 'pickup' | 'stop' | 'destination';
  label: string;
  address: string;
  isFirst?: boolean;
  isLast?: boolean;
}
