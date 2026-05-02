import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RideDetailsTemplate } from '@/components/templates/RideDetailsTemplate';
import { useRideDetails } from './useRideDetails';
import { RideDetailsScreenProps } from './types';

export const RideDetailsScreen: React.FC<RideDetailsScreenProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const { rideData, isDriver, handleBack, handleCancel, handleCancelRider, handleChat } = useRideDetails();

  if (!rideData) return null;

  return (
    <>
      <StatusBar
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <RideDetailsTemplate
        onBackPress={handleBack}
        onCancelPress={handleCancel}
        routeJourney={rideData.routeJourney}
        etaInfo={rideData.etaInfo}
        fareCard={{ ...rideData.fareCard, onPress: () => console.log('Fare tapped') }}
        driverSection={{ 
          ...rideData.driverSection, 
          onChatPress: handleChat,
          isDriverView: isDriver 
        }}
        ridersList={{
          ...rideData.ridersList,
          riders: rideData.ridersList.riders.map(r => ({ 
            ...r, 
            onPress: () => console.log(`Rider ${r.name} tapped`),
            onCancel: r.canCancel ? () => handleCancelRider(r.id) : undefined
          }))
        }}
      />
    </>
  );
};
