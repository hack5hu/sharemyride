export interface DriverSectionProps {
  name: string;
  rating: number;
  carInfo: string;
  avatarUrl?: string;
  onChatPress?: () => void;
}
