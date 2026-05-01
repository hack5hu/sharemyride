import React from 'react';
import { View } from 'react-native';
import { SectionHeader } from '@/components/atoms/SectionHeader';
import { MatchedRideBento } from '@/components/organisms/MatchedRideBento';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { verticalScale } from '@/styles';

interface RideListHeaderProps {
  activeTab: MyRidesTab;
  draftsCount: number;
  onClearDrafts: () => void;
  onAcceptRide: () => void;
  onRidePress: (id: string) => void;
}

export const RideListHeader: React.FC<RideListHeaderProps> = React.memo(({
  activeTab,
  draftsCount,
  onClearDrafts,
  onAcceptRide,
  onRidePress,
}) => {
  const { t } = useTranslation();

  return (
    <View style={{ gap: verticalScale(20), marginBottom: verticalScale(16) }}>
      {activeTab === 'upcoming' && (
        <>
          <SectionHeader 
            title={t('myRides.newRequestsTitle')} 
            badgeLabel={t('myRides.pendingBadge', { count: 2 })} 
          />
          <MatchedRideBento 
            driverName="Alex River"
            rating={4.9}
            totalRides="2.4k Rides"
            avatarUri="https://lh3.googleusercontent.com/aida-public/AB6AXuCzvuStPbyPKLI17sYtRKUqeyvCmcf4WEHIjduHuyCMDki-lCXswdfqsxlrLTFrAiF_Mk0MWEWPmhwmWxSnVJxJ1JSEY5Kbwel9isJlD6ta4Kvvpqt3LnD-ebwS-_C6pTm8TyVwkRVIzwL1761hGeMqwj8p_j8KZkAPjDNVPqUS193rzxyIZzSE9IJzTrJY2ajyVWeR7_lT29nCaKP2sxeNUKPA8x8WRCEK64RUVfatGmMYXDqidmgxKd7WPNLWMk3QZ9oKFICarU2F"
            pickup="92 Green Valley St."
            dropoff="Echo Park Creative Hub"
            onAccept={onAcceptRide}
            onPress={() => onRidePress('matched-ride-123')}
          />
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
