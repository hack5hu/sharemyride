export interface ChatAppHeaderProps {
  name: string;
  rating: number;
  isTyping?: boolean;
  avatarUri?: string;
  isVerified?: boolean;
  phoneNumber?: string;
  onBackPress?: () => void;
  onCallPress?: () => void;
  onReportPress?: () => void;
  onProfilePress?: () => void;
}

