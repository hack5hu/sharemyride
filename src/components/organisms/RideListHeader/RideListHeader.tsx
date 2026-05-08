import React from 'react';
import { View } from 'react-native';
import { SectionHeader } from '@/components/atoms/SectionHeader';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { verticalScale } from '@/styles';
import { RideListItem } from '@/screens/MyRideFlow/1_MyRides/types.d';

interface RideListHeaderProps {
  activeTab: MyRidesTab;
  draftsCount: number;
  onClearDrafts: () => void;
  requests?: RideListItem[];
}

export const RideListHeader: React.FC<RideListHeaderProps> = React.memo(({
  activeTab,
  draftsCount,
  onClearDrafts,
  requests = []
}) => {
  const { t } = useTranslation();

  return (
    <View style={{ gap: verticalScale(20), marginBottom: verticalScale(16) }}>
      {activeTab === 'requests' && (
        <>
          {requests.length > 0 && (
            <>
              <SectionHeader
                title={t('myRides.newRequestsTitle')}
                badgeLabel={t('myRides.pendingBadge', { count: requests.length })}
              />
            </>
          )}
        </>
      )}
      {activeTab === 'upcoming' && (
        <>
          <SectionHeader title={t('myRides.publishedRidesTitle')} />
        </>
      )}

      {activeTab === 'drafts' && (
        <SectionHeader
          title={t('myRides.draftsTitle')}
          actionLabel={draftsCount > 0 ? t('myRides.clearAll') : undefined}
          onActionPress={onClearDrafts}
        />
      )}
      {activeTab === 'completed' && (
        <SectionHeader title={t('myRides.completedTitle')} />
      )}
    </View>
  );
});
