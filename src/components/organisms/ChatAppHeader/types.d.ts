export interface ChatAppHeaderProps {
  name: string;
  rating: number;
  isTyping?: boolean;
  avatarUri: string;
  isVerified?: boolean;
  onBackPress?: () => void;
  onReportPress?: () => void;
}
