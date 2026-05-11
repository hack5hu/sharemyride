export interface CompactRideItemProps {
  title: string;
  subtitle: string;
  price?: string;
  icon?: string;
  iconBg?: string; // Tonal background color key
  type: 'draft' | 'completed' | 'upcoming' | 'past' | 'archive';
  statusTag?: string;
  onPress: () => void;
  actionIcon?: string;
  onActionPress?: () => void;
}
