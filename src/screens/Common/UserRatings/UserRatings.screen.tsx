import React from 'react';
import { UserRatingsTemplate } from '@/components/templates/UserRatingsTemplate';
import { type UserRatingsScreenProps } from './types';
import { useUserRatings } from './useUserRatings';

export const UserRatingsScreen: React.FC<UserRatingsScreenProps> = React.memo(
  ({ route }) => {
    const { userId, userName } = route.params;
    const { reviews, isLoading, onBack } = useUserRatings(userId, userName);

    return (
      <UserRatingsTemplate
        userName={userName}
        reviews={reviews}
        isLoading={isLoading}
        onBack={onBack}
      />
    );
  },
);

UserRatingsScreen.displayName = 'UserRatingsScreen';
export default UserRatingsScreen;
