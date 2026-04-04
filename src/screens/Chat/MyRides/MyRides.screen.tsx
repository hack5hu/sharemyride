import React from 'react';
import { View } from 'react-native';
import { MyRidesTemplate } from '@/components/templates/MyRidesTemplate';
import { MyRidesHeader } from '@/components/organisms/MyRidesHeader';
import { SectionHeader } from '@/components/atoms/SectionHeader';
import { MatchedRideBento } from '@/components/organisms/MatchedRideBento';
import { UpcomingRideCard } from '@/components/organisms/UpcomingRideCard';
import { CompactRideItem } from '@/components/molecules/CompactRideItem';
import { useMyRides } from './useMyRides';
import { BottomNav } from '@/components/organisms/BottomNav';

export const MyRidesScreen: React.FC = () => {
  const {
    activeTab,
    onTabChange,
    onMenuPress,
    onProfilePress,
    onAddPress,
    onAcceptRide,
    onRidePress,
    onClearDrafts,
  } = useMyRides();

  const userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDExpYK8xVP2mpLZ72YLG07-Nvi79pQHHE3Bf4HEGBRuFOCym2D4P_hlE3flaGGaR4XKpWguxkVxRruV_VNmRQoLa2Sg179Af0ZYu5OuAE0XnhnyKnoGtEty2IKdSCPEpm4wlGP2YlXb08qxB2BkWjHpVIUO0XH8BgWiYyR4o6Ku2xPiwHS4dYGdV-aBsCeqKoBrDgJExj0TgYQDrb9mu-4Y4YSLPxze3tWxwjfF5l8SSkYi3zPx0RDth6HTJ54yE4zdBFrhiC14HB5';

  const highlightsSection = (
    <View>
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
    </View>
  );

  const upcomingSection = (
    <View>
      <SectionHeader title="Upcoming Rides" />
      <UpcomingRideCard 
        timerLabel="Starts in 12m 45s"
        driverName="Jordan Smith"
        carModel="Tesla Model 3 • White"
        rating={4.8}
        price="$24.50"
        avatarUri="https://lh3.googleusercontent.com/aida-public/AB6AXuBzd3wC9d_WrmBWeqpfiKtEn4QbdW5TO-mx3xKASLsWXYzGYVY3OIWi-eq52FPRLspevhCFvEKZtrVMIMTtRfTYYq6Z1Eivg5wt_rOKKMml6cT6KmAHxRmr2HMmWU4k7_Usq_miiRiVzBEB1uqT98lo25VgHDQW5h6z0y7hoCai03tXnXU5m4tu3UW8dpY-WVZA2ce6Z3rR2Polq1gfyVqT5JqCWxqiMkHkDotN_B1yGOZ5RM72Miral1-NDoqtEtwACqykSN3i2XXS"
        pickupTime="08:30 AM"
        pickupLocation="The Grand Library"
        dropoffTime="09:15 AM"
        dropoffLocation="Silicon Forest Office"
        onMorePress={() => {}}
        onPress={() => onRidePress('upcoming-ride-456')}
      />
    </View>
  );

  const draftsSection = (
    <View>
      <SectionHeader title="Drafts" actionLabel="Clear All" onActionPress={onClearDrafts} />
      <CompactRideItem 
        title="Airport Terminal 2"
        subtitle="Incomplete booking • 3 days ago"
        icon="edit-note"
        type="draft"
        onPress={() => onRidePress('draft-ride-789')}
      />
    </View>
  );

  const completedSection = (
    <View>
      <SectionHeader title="Completed" />
      <View style={{ gap: 12 }}>
        <CompactRideItem 
          title="Home to Central Mall"
          subtitle="Oct 14 • Rated 5.0"
          price="$12.00"
          icon="check-circle"
          type="completed"
          onPress={() => onRidePress('completed-ride-101')}
        />
        <CompactRideItem 
          title="Workspace A to Station"
          subtitle="Oct 12 • Rated 4.5"
          price="$8.50"
          icon="check-circle"
          type="completed"
          onPress={() => onRidePress('completed-ride-102')}
        />
      </View>
    </View>
  );

  return (
    <MyRidesTemplate 
      header={
        <MyRidesHeader 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          onMenuPress={onMenuPress} 
          onProfilePress={onProfilePress} 
          userAvatarUri={userAvatar}
        />
      }
      bottomNav={
        <BottomNav activeTab="MY_RIDES" />
            }
      activeTab={activeTab}
      highlightsSection={highlightsSection}
      upcomingSection={upcomingSection}
      draftsSection={draftsSection}
      completedSection={completedSection}
      onAddPress={onAddPress}
    />
  );
};
