import { UserProfile } from '@/screens/Common/UserProfileDetail/types.d';
import { Translations } from '@/constants/localization/types';

export interface UserProfileDetailTemplateProps {
  profile: UserProfile | null;
  isLoading: boolean;
  t: Translations['userProfileDetail'];
  handleBack: () => void;
  handleReport: () => void;
  handleViewRatings: () => void;
  handleChat?: () => void;
  isReportVisible?: boolean;
  onReportClose?: () => void;
  onReportSubmit?: (data: { categoryId: string; description: string }) => void;
}
