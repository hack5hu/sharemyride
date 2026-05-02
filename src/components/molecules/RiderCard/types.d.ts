export interface RiderCardProps {
  name: string;
  info: string;
  avatarUrl?: string;
  onPress?: () => void;
  onCancel?: () => void;
}
