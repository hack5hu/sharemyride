import React from 'react';
import { RideInformationTemplate } from '@/components/templates/RideInformationTemplate/RideInformationTemplate';
import { useRideInformation } from './useRideInformation';
import { RideInformationProps } from './types.d';

export const RideInformationScreen: React.FC<RideInformationProps> = ({ route }) => {
  const { t, handleBack, handleBook, ride } = useRideInformation(route.params.rideId);

  return (
    <RideInformationTemplate
      ride={ride}
      t={t}
      handleBack={handleBack}
      handleBook={handleBook}
    />
  );
};
