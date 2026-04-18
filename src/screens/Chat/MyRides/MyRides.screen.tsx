import React, { useEffect } from 'react';
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
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    drafts,
    upcoming,
    past,
    isLoading,
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
      <SectionHeader title="Your Published Rides" />
      {upcoming.length > 0 ? (
        <View style={{ gap: 12 }}>
          {upcoming.map((ride) => (
            <CompactRideItem 
              key={ride.id}
              title={ride.title}
              subtitle={ride.subtitle}
              price={ride.price}
              icon={ride.icon}
              type="upcoming"
              actionIcon="cancel"
              onActionPress={() => onCancelRide(ride.id)}
              onPress={() => onRidePress(ride.id)}
            />
          ))}
        </View>
      ) : (
        <CompactRideItem 
          title="No upcoming rides"
          subtitle="Rides you publish will appear here"
          icon="event-note"
          type="upcoming"
          onPress={() => {}}
        />
      )}
    </View>
  ); 

  const draftsSection = (
    <View>
      <SectionHeader 
        title="Drafts" 
        actionLabel={drafts.length > 0 ? "Clear All" : undefined} 
        onActionPress={onClearDrafts} 
      />
      {drafts.length > 0 ? (
        <View style={{ gap: 12 }}>
          {drafts.map((draft) => (
            <CompactRideItem 
              key={draft.id}
              title={draft.title}
              subtitle={draft.subtitle}
              icon="edit-note"
              type="draft"
              actionIcon="delete-outline"
              onActionPress={() => onRemoveDraft(draft.id)}
              onPress={() => onRidePress(draft.id)}
            />
          ))}
        </View>
      ) : (
        <CompactRideItem 
          title="No drafts yet"
          subtitle="Your saved rides will appear here"
          icon="drafts"
          type="draft"
          onPress={() => {}}
        />
      )}
    </View>
  );

  const completedSection = (
    <View>
      <SectionHeader title="Recently Completed" />
      {past.length > 0 ? (
        <View style={{ gap: 12 }}>
          {past.map((ride) => (
            <CompactRideItem 
              key={ride.id}
              title={ride.title}
              subtitle={ride.subtitle}
              price={ride.price}
              icon={ride.icon}
              type="completed"
              onPress={() => onRidePress(ride.id)}
            />
          ))}
        </View>
      ) : (
        <CompactRideItem 
          title="No completed rides"
          subtitle="Old rides will appear here"
          icon="history"
          type="completed"
          onPress={() => {}}
        />
      )}
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
