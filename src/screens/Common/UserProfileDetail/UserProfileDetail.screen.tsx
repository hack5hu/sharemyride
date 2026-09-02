import React from 'react';
import { ReportIssueModal } from '@/components/organisms/ReportIssueModal';
import { UserProfileDetailTemplate } from '@/components/templates/UserProfileDetailTemplate';
import { type UserProfileDetailProps } from './types';
import { useUserProfileDetail } from './useUserProfileDetail';

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
    handleCall,
    isReportVisible,
    onReportClose,
    onReportSubmit,
    t,
  } = useUserProfileDetail(
    route.params.userId,
    route.params.isDriver,
    route.params.canChat,
    route.params.canCall,
  );

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
        handleCall={handleCall}
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
