import React, { useCallback, memo, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
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
import { Loader } from '@/components/atoms/Loader';
import { Box } from '@/components/atoms/Box';

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDExpYK8xVP2mpLZ72YLG07-Nvi79pQHHE3Bf4HEGBRuFOCym2D4P_hlE3flaGGaR4XKpWguxkVxRruV_VNmRQoLa2Sg179Af0ZYu5OuAE0XnhnyKnoGtEty2IKdSCPEpm4wlGP2YlXb08qxB2BkWjHpVIUO0XH8BgWiYyR4o6Ku2xPiwHS4dYGdV-aBsCeqKoBrDgJExj0TgYQDrb9mu-4Y4YSLPxze3tWxwjfF5l8SSkYi3zPx0RDth6HTJ54yE4zdBFrhiC14HB5';

export const MyRidesScreen: React.FC = memo(() => {
  const { t } = useTranslation();
  const theme = useTheme();
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
    isActionLoading,
    currentRides,
    drafts,
    hasRequests,
    mappedRequests,
  } = useMyRides();

  const renderItem = useCallback(({ item }: { item: any }) => (
    <RideItem 
      item={item}
      activeTab={activeTab}
      onRidePress={onRidePress}
      onCancelRide={onCancelRide}
      onRemoveDraft={onRemoveDraft}
      onAcceptRide={onAcceptRide}
      onRejectRide={onRejectRide}
    />
  ), [activeTab, onRidePress, onCancelRide, onRemoveDraft, onAcceptRide, onRejectRide]);

  const listHeader = useMemo(() => (
    <RideListHeader 
      activeTab={activeTab}
      draftsCount={drafts?.length || 0}
      onClearDrafts={onClearDrafts}
      onAcceptRide={onAcceptRide}
      onRidePress={onRidePress}
      requests={mappedRequests}
    />
  ), [activeTab, drafts?.length, onClearDrafts, onAcceptRide, onRidePress, mappedRequests]);

  const emptyComponent = useMemo(() => {
    const iconMap: Record<string, string> = {
      upcoming: "event-note",
      requests: "person-add",
      drafts: "edit-note",
      archive: "inventory"
    };
    
    return (
      <EmptyState 
        icon={iconMap[activeTab] || "inventory"}
        title={t(`myRides.no${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Title`)}
        description={t(`myRides.no${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Desc`)}
      />
    );
  }, [activeTab, t]);

  const footerComponent = useMemo(() => (
    isLoading && !isRefreshing ? (
      <Box paddingVertical={verticalScale(20)} alignItems="center">
        <ActivityIndicator color={theme.colors.primary} />
      </Box>
    ) : null
  ), [isLoading, isRefreshing, theme.colors.primary]);

  return (
    <>
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
      <Loader visible={isActionLoading} />
    </>
  );
});

