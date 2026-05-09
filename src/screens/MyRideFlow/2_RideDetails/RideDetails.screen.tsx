import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RideInformationTemplate } from '@/components/templates/RideInformationTemplate/RideInformationTemplate';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Loader } from '@/components/atoms/Loader';
import { useRideDetails } from './useRideDetails';
import { RideDetailsScreenProps } from './types';

export const RideDetailsScreen: React.FC<RideDetailsScreenProps> = () => {
  const theme = useTheme();
  const { 
    ride, 
    isLoading, 
    isDriver,
    t, 
    handleBack, 
    handleBook, 
    handleViewRoute, 
    handleCopyAddress,
    handleDriverProfile,
    handleChat,
    handleCancelRide,
    handleCancelPassenger
  } = useRideDetails();

  if (isLoading) {
    return (
      <ScreenShell title={t.title} onBack={handleBack}>
        <Loader message="Fetching ride details..." />
      </ScreenShell>
    );
  }

  if (!ride) return null;

  return (
      <RideInformationTemplate
        t={t}
        handleBack={handleBack}
        ride={ride}
        handleBook={handleBook}
        handleViewRoute={handleViewRoute}
        handleCopyAddress={handleCopyAddress}
        handleDriverProfile={handleDriverProfile}
        handleChat={handleChat}
        showBookButton={false}
        isDriver={isDriver}
        onCancelRide={handleCancelRide}
        onCancelPassenger={handleCancelPassenger}
        showVehicleDetails={true}
      />
  );
};
