import React from 'react';
import { UserProfileDetailTemplate } from '@/components/templates/UserProfileDetailTemplate';
import { useUserProfileDetail } from './useUserProfileDetail';
import { UserProfileDetailProps } from './types';

export const UserProfileDetail: React.FC<UserProfileDetailProps> = ({ route }) => {
  const { 
    profile, 
    isLoading, 
    handleBack, 
    handleReport, 
    handleViewRatings,
    t
  } = useUserProfileDetail(route.params.userId);

  return (
    <UserProfileDetailTemplate
      profile={profile}
      isLoading={isLoading}
      t={t}
      handleBack={handleBack}
      handleReport={handleReport}
      handleViewRatings={handleViewRatings}
    />
  );
};

export default React.memo(UserProfileDetail);
