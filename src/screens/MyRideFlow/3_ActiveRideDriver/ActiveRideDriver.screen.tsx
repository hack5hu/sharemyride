import React from 'react';
import { ActiveRideDriverTemplate } from '@/components/templates/ActiveRideDriverTemplate';
import { ActiveRidePassengerTemplate } from '@/components/templates/ActiveRidePassengerTemplate';
import { useActiveRideDriver } from './useActiveRideDriver';

export const ActiveRideDriverScreen: React.FC = React.memo(() => {
  const {
    isPassenger,
    isLiveLocationEnabled,
    handleBack,
    handleToggleLiveLocation,
    handleSafetyCenterPress,
    nextStop,
    groupedStops,
    vehicleInfo,
    handleDriverChatPress,
    handleDriverCallPress,
    passengerEtaMinutes,
    passengerDistanceKm,
    driverDetails,
    passengerTimeline,
    handlePassengerChatPress,
    handlePassengerCallPress,
    nextStopName,
    handleCopyLocation,
    handleOpenMap,
  } = useActiveRideDriver();

  if (isPassenger) {
    return (
      <ActiveRidePassengerTemplate
        onBack={handleBack}
        etaMinutes={passengerEtaMinutes}
        distanceKm={passengerDistanceKm}
        isLiveLocationEnabled={isLiveLocationEnabled}
        onToggleLiveLocation={handleToggleLiveLocation}
        driver={driverDetails}
        vehicleInfo={vehicleInfo}
        timeline={passengerTimeline}
        onChatPress={handlePassengerChatPress}
        onCallPress={handlePassengerCallPress}
        onSafetyCenterPress={handleSafetyCenterPress}
        nextStopName={nextStopName}
        onCopyLocation={handleCopyLocation}
        onOpenMap={handleOpenMap}
      />
    );
  }

  return (
    <ActiveRideDriverTemplate
      onBack={handleBack}
      nextStop={nextStop}
      isLiveLocationEnabled={isLiveLocationEnabled}
      onToggleLiveLocation={handleToggleLiveLocation}
      groupedStops={groupedStops}
      vehicleInfo={vehicleInfo}
      onChatPress={handleDriverChatPress}
      onCallPress={handleDriverCallPress}
      onSafetyCenterPress={handleSafetyCenterPress}
    />
  );
});

ActiveRideDriverScreen.displayName = 'ActiveRideDriverScreen';
