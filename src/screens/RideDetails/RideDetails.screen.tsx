import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RideDetailsTemplate } from '@/components/templates/RideDetailsTemplate';
import { useRideDetails } from './useRideDetails';
import { RideDetailsScreenProps } from './types.d';

export const RideDetailsScreen: React.FC<RideDetailsScreenProps> = () => {
  const theme = useTheme();
  const { mockData, handleBack, handleCancel, handleChat } = useRideDetails();

  return (
    <>
      <StatusBar 
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background} 
      />
      <RideDetailsTemplate
        onBackPress={handleBack}
        onCancelPress={handleCancel}
        routeJourney={mockData.routeJourney}
        etaInfo={mockData.etaInfo}
        fareCard={{ ...mockData.fareCard, onPress: () => console.log('Fare tapped') }}
        driverSection={{ ...mockData.driverSection, onChatPress: handleChat }}
        ridersList={{
          ...mockData.ridersList,
          riders: mockData.ridersList.riders.map(r => ({ ...r, onPress: () => console.log(`Rider ${r.name} tapped`) }))
        }}
      />
    </>
  );
};
