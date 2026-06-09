import React, { useCallback, memo, useMemo, useRef, useEffect } from 'react';
import { ActivityIndicator, FlatList, Dimensions, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';
import { FlashList } from '@shopify/flash-list';
import { MyRidesTemplate } from '@/components/templates/MyRidesTemplate';
import { MyRidesHeader } from '@/components/organisms/MyRidesHeader';
import { BottomNav } from '@/components/organisms/BottomNav';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useTranslation } from '@/hooks/useTranslation';
import { scale, verticalScale } from '@/styles';
import { useMyRides } from './useMyRides';
import { RideItem } from '@/components/organisms/RideItem';
import { RideListHeader } from '@/components/organisms/RideListHeader';
import { Loader } from '@/components/atoms/Loader';
import { Box } from '@/components/atoms/Box';

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDExpYK8xVP2mpLZ72YLG07-Nvi79pQHHE3Bf4HEGBRuFOCym2D4P_hlE3flaGGaR4XKpWguxkVxRruV_VNmRQoLa2Sg179Af0ZYu5OuAE0XnhnyKnoGtEty2IKdSCPEpm4wlGP2YlXb08qxB2BkWjHpVIUO0XH8BgWiYyR4o6Ku2xPiwHS4dYGdV-aBsCeqKoBrDgJExj0TgYQDrb9mu-4Y4YSLPxze3tWxwjfF5l8SSkYi3zPx0RDth6HTJ54yE4zdBFrhiC14HB5';
const SCREEN_WIDTH = Dimensions.get('window').width;

export const MyRidesScreen: React.FC = memo(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    activeTab,
    onTabChange,
    onAcceptRide,
    onRejectRide,
    onRidePress,
    onChatPress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onRefresh,
    onLoadMore,
    isRefreshing,
    isLoading,
    isActionLoading,
    getTabData,
    drafts,
    hasRequests,
    mappedRequests,
  } = useMyRides();

  const flatListRef = useRef<FlatList>(null);
  
  const TABS = useMemo(() => {
    const all = ['requests', 'upcoming', 'drafts', 'archive'] as const;
    return all.filter(tab => tab !== 'requests' || hasRequests);
  }, [hasRequests]);

  // Sync tab clicks to horizontal scroll
  useEffect(() => {
    const index = TABS.indexOf(activeTab as any);
    if (index >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  }, [activeTab, TABS]);

  const onMomentumScrollEnd = useCallback((e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    const newTab = TABS[index];
    if (newTab && newTab !== activeTab) {
      onTabChange(newTab);
    }
  }, [TABS, activeTab, onTabChange]);

  const renderItem = useCallback(({ item, activeTab: tab }: { item: any, activeTab: string }) => (
    <RideItem 
      item={item}
      activeTab={tab as any}
      onRidePress={onRidePress}
      onChatPress={onChatPress}
      onCancelRide={onCancelRide}
      onRemoveDraft={onRemoveDraft}
      onAcceptRide={onAcceptRide}
      onRejectRide={onRejectRide}
      isActionLoading={isActionLoading}
    />
  ), [onRidePress, onChatPress, onCancelRide, onRemoveDraft, onAcceptRide, onRejectRide, isActionLoading]);

  const renderTabContent = useCallback(({ item: tab }: { item: typeof TABS[number] }) => {
    const data = getTabData(tab);
    
    const iconMap: Record<string, string> = {
      upcoming: "event-note",
      requests: "person-add",
      drafts: "edit-note",
      archive: "inventory"
    };

    const emptyComponent = (
      <EmptyState 
        icon={iconMap[tab] || "inventory"}
        title={t(`myRides.no${tab.charAt(0).toUpperCase() + tab.slice(1)}Title`)}
        description={t(`myRides.no${tab.charAt(0).toUpperCase() + tab.slice(1)}Desc`)}
      />
    );

    const listHeader = (
      <RideListHeader 
        activeTab={tab}
        draftsCount={drafts?.length || 0}
        onClearDrafts={onClearDrafts}
        requests={mappedRequests}
      />
    );

    const footerComponent = isLoading && !isRefreshing && tab === activeTab ? (
      <Box paddingVertical={verticalScale(20)} alignItems="center">
        <ActivityIndicator color={theme.colors.primary} />
      </Box>
    ) : null;

    return (
      <Box style={{ width: SCREEN_WIDTH, flex: 1 }}>
        <FlashList
          data={data}
          renderItem={({ item }) => renderItem({ item, activeTab: tab })}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: scale(24),
            paddingBottom: verticalScale(120),
          }}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={emptyComponent}
          ListFooterComponent={footerComponent}
          onEndReached={tab === activeTab ? onLoadMore : undefined}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing && tab === activeTab}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
        />
      </Box>
    );
  }, [getTabData, drafts?.length, mappedRequests, isLoading, isRefreshing, activeTab, theme.colors.primary, t, onClearDrafts, renderItem, onLoadMore, onRefresh]);

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
      >
        <FlatList
          ref={flatListRef}
          style={{ flex: 1 }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={TABS}
          keyExtractor={item => item}
          renderItem={renderTabContent}
          onMomentumScrollEnd={onMomentumScrollEnd}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={3}
          getItemLayout={(data, index) => (
            { length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index }
          )}
        />
      </MyRidesTemplate>
      <Loader visible={isActionLoading} />
    </>
  );
});

