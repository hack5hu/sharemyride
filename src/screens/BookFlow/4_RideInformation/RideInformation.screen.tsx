import React from 'react';
import { RideInformationTemplate } from '@/components/templates/RideInformationTemplate/RideInformationTemplate';
import { useRideInformation } from './useRideInformation';
import { RideInformationProps } from './types';

export const RideInformationScreen: React.FC<RideInformationProps> = ({ route }) => {
  const { 
    t, 
    handleBack, 
    handleBook, 
    handleChat,
    handleDriverProfile,
    handleViewRoute, 
    handleCopyAddress, 
    ride 
  } = useRideInformation(route.params.rideId);

  return (
    <RideInformationTemplate
      ride={ride}
      t={t}
      handleBack={handleBack}
      handleBook={handleBook}
      handleChat={handleChat}
      handleDriverProfile={handleDriverProfile}
      handleViewRoute={handleViewRoute}
      handleCopyAddress={handleCopyAddress}
    />
  );
};
