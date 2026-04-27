import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MyRidesTemplate } from '@/components/templates/MyRidesTemplate';
import { MyRidesHeader } from '@/components/organisms/MyRidesHeader';
import { SectionHeader } from '@/components/atoms/SectionHeader';
import { MatchedRideBento } from '@/components/organisms/MatchedRideBento';
import { CompactRideItem } from '@/components/molecules/CompactRideItem';
import { useMyRides } from './useMyRides';
import { BottomNav } from '@/components/organisms/BottomNav';
import { verticalScale } from '@/styles';

export const MyRidesScreen: React.FC = () => {
  const {
    activeTab,
    onTabChange,
    onAddPress,
    onAcceptRide,
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onRefresh,
    onLoadMore,
    isRefreshing,
    isLoading,
    hasMore,
    currentRides,
    drafts,
  } = useMyRides();

  const theme = useTheme();
  const userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDExpYK8xVP2mpLZ72YLG07-Nvi79pQHHE3Bf4HEGBRuFOCym2D4P_hlE3flaGGaR4XKpWguxkVxRruV_VNmRQoLa2Sg179Af0ZYu5OuAE0XnhnyKnoGtEty2IKdSCPEpm4wlGP2YlXb08qxB2BkWjHpVIUO0XH8BgWiYyR4o6Ku2xPiwHS4dYGdV-aBsCeqKoBrDgJExj0TgYQDrb9mu-4Y4YSLPxze3tWxwjfF5l8SSkYi3zPx0RDth6HTJ54yE4zdBFrhiC14HB5';
  
  const renderRideItem = ({ item }: { item: any }) => (
    <CompactRideItem 
      title={item.title}
      subtitle={item.subtitle}
      price={item.price}
      icon={item.icon || (activeTab === 'drafts' ? 'edit-note' : activeTab === 'completed' ? 'history' : 'event-note')}
      type={activeTab === 'upcoming' ? 'upcoming' : activeTab === 'drafts' ? 'draft' : 'completed'}
      actionIcon={activeTab === 'upcoming' ? 'cancel' : activeTab === 'drafts' ? 'delete-outline' : undefined}
      onActionPress={() => activeTab === 'upcoming' ? onCancelRide(item.id) : onRemoveDraft(item.id)}
      onPress={() => onRidePress(item.id)}
    />
  );

  const listHeader = (
    <View style={{ gap: verticalScale(20), marginBottom: verticalScale(16) }}>
      {activeTab === 'upcoming' && (
        <>
          <SectionHeader title="New Requests" badgeLabel="2 Pending" />
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
          <SectionHeader title="Your Published Rides" />
        </>
      )}
      {activeTab === 'drafts' && (
        <SectionHeader 
          title="Drafts" 
          actionLabel={(drafts?.length || 0) > 0 ? "Clear All" : undefined} 
          onActionPress={onClearDrafts} 
        />
      )}
      {activeTab === 'ongoing' && (
        <SectionHeader title="Ongoing Trips" />
      )}
      {activeTab === 'completed' && (
        <SectionHeader title="Recently Completed" />
      )}
    </View>
  );

  const emptyComponent = (
    <CompactRideItem 
      title={activeTab === 'upcoming' ? "No upcoming rides" : activeTab === 'drafts' ? "No drafts yet" : activeTab === 'ongoing' ? "No ongoing rides" : "No completed rides"}
      subtitle={activeTab === 'upcoming' ? "Rides you publish will appear here" : activeTab === 'drafts' ? "Your saved rides will appear here" : activeTab === 'ongoing' ? "Trips in progress will show here" : "Old rides will appear here"}
      icon={activeTab === 'upcoming' ? "event-note" : activeTab === 'drafts' ? "drafts" : activeTab === 'ongoing' ? "play-circle-outline" : "history"}
      type={activeTab === 'upcoming' ? "upcoming" : activeTab === 'drafts' ? "draft" : "completed"}
      onPress={() => {}}
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
          userAvatarUri={userAvatar}
        />
      }
      bottomNav={
        <BottomNav activeTab="MY_RIDES" />
      }
      activeTab={activeTab}
      data={currentRides}
      renderItem={renderRideItem}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={emptyComponent}
      ListFooterComponent={footerComponent}
      onAddPress={onAddPress}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};
