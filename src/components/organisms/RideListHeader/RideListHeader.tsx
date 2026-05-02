import React from 'react';
import { View } from 'react-native';
import { SectionHeader } from '@/components/atoms/SectionHeader';
import { MatchedRideBento } from '@/components/organisms/MatchedRideBento';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { verticalScale } from '@/styles';
import { RideListItem } from '@/screens/MyRideFlow/1_MyRides/types.d';

interface RideListHeaderProps {
  activeTab: MyRidesTab;
  draftsCount: number;
  onClearDrafts: () => void;
  onAcceptRide?: (id: string) => void;
  onRidePress: (id: string) => void;
  requests?: RideListItem[];
}

export const RideListHeader: React.FC<RideListHeaderProps> = React.memo(({ 
  activeTab, 
  draftsCount, 
  onClearDrafts,
  onAcceptRide,
  onRejectRide,
  onRidePress,
  requests = []
}) => {
  const { t } = useTranslation();
  const firstRequest = requests[0];

  return (
    <View style={{ gap: verticalScale(20), marginBottom: verticalScale(16) }}>
      {activeTab === 'upcoming' && (
        <>
          {requests.length > 0 && (
            <>
              <SectionHeader 
                title={t('myRides.newRequestsTitle')} 
                badgeLabel={t('myRides.pendingBadge', { count: requests.length })} 
              />
              <MatchedRideBento 
                driverName={firstRequest.driverName || 'Passenger'}
                rating={firstRequest.rating || 5}
                totalRides={`${firstRequest.rating || 5} Rating`}
                avatarUri={firstRequest.avatarUri || ''}
                pickup={firstRequest.pickupLocation || ''}
                dropoff={firstRequest.dropoffLocation || ''}
                price={firstRequest.price}
                seatCount={firstRequest.statusTag}
                date={firstRequest.subtitle}
                onAccept={() => onAcceptRide?.(firstRequest.id)}
                onReject={() => onRejectRide?.(firstRequest.id)}
                onPress={() => onRidePress(firstRequest.id)}
              />
            </>
          )}
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
