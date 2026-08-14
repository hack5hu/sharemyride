import React from 'react';
import { UserProfileDetailTemplate } from '@/components/templates/UserProfileDetailTemplate';
import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';
import { useUserProfileDetail } from './useUserProfileDetail';
import { UserProfileDetailProps } from './types';

export const UserProfileDetail: React.FC<UserProfileDetailProps> = ({
  route,
}) => {
  const {
    profile,
    isLoading,
    handleBack,
    handleReport,
    handleViewRatings,
    handleChat,
    isReportVisible,
    onReportClose,
    onReportSubmit,
    t,
  } = useUserProfileDetail(route.params.userId);

  return (
    <>
      <UserProfileDetailTemplate
        profile={profile}
        isLoading={isLoading}
        t={t}
        handleBack={handleBack}
        handleReport={handleReport}
        handleViewRatings={handleViewRatings}
        handleChat={handleChat}
      />
      <ReportIssueModal
        isVisible={isReportVisible}
        onClose={onReportClose}
        onSubmit={onReportSubmit}
        bookingId={profile?.name || 'Profile'}
      />
    </>
  );
};

export default React.memo(UserProfileDetail);
