import React, { useMemo } from 'react';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from '@/hooks/useTranslation';
import { Typography } from '@/components/atoms/Typography';
import { useMapViewer } from './useMapViewer';
import { MapViewerProps, RideStatus } from './types.d';
import { decodePolyline } from '@/utils/polyline';
import { moderateScale } from '@/styles';
import {
  MapContainer,
  StyledOverlayCard,
  IndicatorDot,
  OverlayTextContainer,
} from './MapViewer.styles';

export const MapViewer: React.FC<MapViewerProps> = React.memo(({
  rideDetails,
  webSocketUrl,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { mapRef, driverLocation, isConnected } = useMapViewer(rideDetails, webSocketUrl);

  // Decode the unified polyline safely if in passenger mode
  const polylinePoints = useMemo(() => {
    if (
      rideDetails.status === RideStatus.ACTIVE &&
      !rideDetails.isDriver &&
      rideDetails.unifiedPolyline
    ) {
      const decoded = decodePolyline(rideDetails.unifiedPolyline);
      return decoded.map(([longitude, latitude]) => ({
        latitude,
        longitude,
      }));
    }
    return [];
  }, [rideDetails.status, rideDetails.isDriver, rideDetails.unifiedPolyline]);

  // Phase 1 (Scheduled) initial region focus
  const initialRegion = useMemo(() => {
    if (rideDetails.status === RideStatus.SCHEDULED && rideDetails.maskedLocation) {
      return {
        latitude: rideDetails.maskedLocation.center.latitude,
        longitude: rideDetails.maskedLocation.center.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };
    }
    const initialCoords = driverLocation || rideDetails.driverLocation || { latitude: 28.6139, longitude: 77.2090 };
    return {
      latitude: initialCoords.latitude,
      longitude: initialCoords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };
  }, [rideDetails.status, rideDetails.maskedLocation, rideDetails.driverLocation]);

  const primaryColor = theme.colors.primary;

  return (
    <MapContainer>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {/* PHASE 1: PRE-TRIP / SCHEDULED (Driver Privacy Masking Active) */}
        {rideDetails.status === RideStatus.SCHEDULED && rideDetails.maskedLocation && (
          <Circle
            center={rideDetails.maskedLocation.center}
            radius={rideDetails.maskedLocation.radius}
            fillColor={`${primaryColor}33`} // 20% opacity soft fill
            strokeColor={primaryColor}
            strokeWidth={1.5}
          />
        )}

        {/* PHASE 2: ACTIVE TRIP / IN-PROGRESS */}
        {rideDetails.status === RideStatus.ACTIVE && (
          <>
            {/* Active Driver Car Marker (Visible to both Driver and Passenger) */}
            {driverLocation && (
              <Marker coordinate={driverLocation} anchor={{ x: 0.5, y: 0.5 }}>
                <Icon
                  name="directions-car"
                  size={moderateScale(32)}
                  color={primaryColor}
                />
              </Marker>
            )}

            {/* DRIVER ROLE UI: Render all passenger markers */}
            {rideDetails.isDriver && rideDetails.passengers?.map((passenger) => (
              <Marker
                key={passenger.id}
                coordinate={passenger.pickupLocation}
                title={passenger.name}
              >
                <Icon
                  name="person-pin-circle"
                  size={moderateScale(28)}
                  color={theme.colors.secondary}
                />
              </Marker>
            ))}

            {/* PASSENGER ROLE UI: Render single own pickup and decoded route polyline */}
            {!rideDetails.isDriver && (
              <>
                {rideDetails.myPickupLocation && (
                  <Marker
                    coordinate={rideDetails.myPickupLocation}
                    title={t('common.pickup')}
                  >
                    <Icon
                      name="person-pin-circle"
                      size={moderateScale(28)}
                      color={theme.colors.secondary}
                    />
                  </Marker>
                )}

                {polylinePoints.length > 0 && (
                  <Polyline
                    coordinates={polylinePoints}
                    strokeWidth={4}
                    strokeColor={primaryColor}
                  />
                )}
              </>
            )}
          </>
        )}
      </MapView>

      {/* FLOATY SYSTEM STATUS OVERLAY */}
      <StyledOverlayCard>
        <IndicatorDot active={rideDetails.status === RideStatus.ACTIVE && isConnected} />
        <OverlayTextContainer>
          <Typography variant="title" size="xs" weight="bold" color="on_surface">
            {rideDetails.status === RideStatus.ACTIVE
              ? t('rideDetails.liveTracking')
              : t('bookingConfirmed.safetyGuardSubtitle')}
          </Typography>
          <Typography variant="label" size="xxs" color="on_surface_variant">
            {rideDetails.status === RideStatus.ACTIVE
              ? isConnected
                ? 'WebSocket Stream Active • Driver Connected'
                : 'Connecting to real-time telemetry stream...'
              : 'Pre-trip Masking Active • Driver Location Masked'}
          </Typography>
        </OverlayTextContainer>
      </StyledOverlayCard>
    </MapContainer>
  );
});

MapViewer.displayName = 'MapViewer';
