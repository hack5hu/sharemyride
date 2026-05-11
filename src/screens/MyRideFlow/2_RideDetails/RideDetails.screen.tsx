import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { RideInformationTemplate } from '@/components/templates/RideInformationTemplate/RideInformationTemplate';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Loader } from '@/components/atoms/Loader';
import { useRideDetails } from './useRideDetails';
import { RideDetailsScreenProps } from './types';
import { CancelRideTemplate } from '@/components/templates/CancelRideTemplate';

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
    handleCancelPassenger,
    handleCancelOwnBooking,
    // Cancellation Modal Props
    isCancelModalVisible,
    setIsCancelModalVisible,
    selectedReasonId,
    setSelectedReasonId,
    otherReasonText,
    setOtherReasonText,
    cancellationReasons,
    handleConfirmCancel,
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
    <View style={styles.container}>
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
        onCancelPassenger={(id) => (isDriver ? handleCancelPassenger(id) : handleCancelOwnBooking())}
        showVehicleDetails={true}
      />

      {isCancelModalVisible && (
        <View style={styles.overlay}>
          <CancelRideTemplate
            reasons={cancellationReasons}
            selectedReasonId={selectedReasonId}
            onSelectReason={setSelectedReasonId}
            otherReasonText={otherReasonText}
            onOtherReasonTextChange={setOtherReasonText}
            onConfirm={handleConfirmCancel}
            onDismiss={() => setIsCancelModalVisible(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
});
