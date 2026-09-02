import { type Translations } from '@/constants/localization/types';
import { type UserProfile } from '@/screens/Common/UserProfileDetail/types.d';

export interface UserProfileDetailTemplateProps {
  profile: UserProfile | null;
  isLoading: boolean;
  t: Translations['userProfileDetail'];
  handleBack: () => void;
  handleReport: () => void;
  handleViewRatings: () => void;
  handleChat?: () => void;
  handleCall?: () => void;
  isReportVisible?: boolean;
  onReportClose?: () => void;
  onReportSubmit?: (data: { categoryId: string; description: string }) => void;
}
