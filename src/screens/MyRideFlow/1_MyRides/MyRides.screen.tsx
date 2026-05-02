import React, { useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MyRidesTemplate } from '@/components/templates/MyRidesTemplate';
import { MyRidesHeader } from '@/components/organisms/MyRidesHeader';
import { BottomNav } from '@/components/organisms/BottomNav';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useTranslation } from '@/hooks/useTranslation';
import { verticalScale } from '@/styles';

import { useMyRides } from './useMyRides';
import { RideItem } from '@/components/organisms/RideItem';
import { RideListHeader } from '@/components/organisms/RideListHeader';

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDExpYK8xVP2mpLZ72YLG07-Nvi79pQHHE3Bf4HEGBRuFOCym2D4P_hlE3flaGGaR4XKpWguxkVxRruV_VNmRQoLa2Sg179Af0ZYu5OuAE0XnhnyKnoGtEty2IKdSCPEpm4wlGP2YlXb08qxB2BkWjHpVIUO0XH8BgWiYyR4o6Ku2xPiwHS4dYGdV-aBsCeqKoBrDgJExj0TgYQDrb9mu-4Y4YSLPxze3tWxwjfF5l8SSkYi3zPx0RDth6HTJ54yE4zdBFrhiC14HB5';

export const MyRidesScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    activeTab,
    onTabChange,
    onAcceptRide,
    onRejectRide,
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onRefresh,
    onLoadMore,
    isRefreshing,
    isLoading,
    currentRides,
    drafts,
    hasRequests,
    mappedRequests,
  } = useMyRides();

  const theme = useTheme();

  const renderItem = ({ item }: { item: any }) => (
    <RideItem 
      item={item}
      activeTab={activeTab}
      onRidePress={onRidePress}
      onCancelRide={onCancelRide}
      onRemoveDraft={onRemoveDraft}
      onAcceptRide={onAcceptRide}
      onRejectRide={onRejectRide}
    />
  );

  const listHeader = (
    <RideListHeader 
      activeTab={activeTab}
      draftsCount={drafts?.length || 0}
      onClearDrafts={onClearDrafts}
      onAcceptRide={onAcceptRide}
      onRidePress={onRidePress}
      requests={mappedRequests}
    />
  );

  const emptyComponent = (
    <EmptyState 
      icon={activeTab === 'upcoming' ? "event-note" : activeTab === 'requests' ? "person-add" : activeTab === 'drafts' ? "edit-note" : "history"}
      title={activeTab === 'upcoming' ? t('myRides.noUpcomingTitle') : activeTab === 'requests' ? t('myRides.noRequestsTitle') : activeTab === 'drafts' ? t('myRides.noDraftsTitle') : t('myRides.noCompletedTitle')}
      description={activeTab === 'upcoming' ? t('myRides.noUpcomingDesc') : activeTab === 'requests' ? t('myRides.noRequestsDesc') : activeTab === 'drafts' ? t('myRides.noDraftsDesc') : t('myRides.noCompletedDesc')}
    />
  );

  const footerComponent = (
    isLoading && !isRefreshing ? (
      <View style={{ paddingVertical: verticalScale(20) }}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    ) : null
  );

  return (
    <MyRidesTemplate 
      header={
        <MyRidesHeader 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          onMenuPress={() => {}} 
          onProfilePress={() => {}} 
          userAvatarUri={USER_AVATAR}
          hasRequests={hasRequests}
        />
      }
      bottomNav={<BottomNav activeTab="MY_RIDES" />}
      activeTab={activeTab}
      data={currentRides}
      renderItem={renderItem}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={emptyComponent}
      ListFooterComponent={footerComponent}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};
