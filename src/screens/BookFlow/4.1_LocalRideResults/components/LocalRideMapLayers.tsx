import { GeoJSONSource, Layer } from '@maplibre/maplibre-react-native';
import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { type LocalRideItemData } from '@/components/templates/LocalRideResultsTemplate/components/LocalRideCard/types.d';
import { type Location } from '@/store/useLocationStore';
import { LocalRideDistanceBadge } from './LocalRideDistanceBadge';

export interface LocalRideMapLayersProps {
  driverRouteGeoJSON: GeoJSON.Feature | null;
  pickupConnectorGeoJSON: GeoJSON.Feature | null;
  dropoffConnectorGeoJSON: GeoJSON.Feature | null;
  pickupDistanceText?: string | null;
  dropoffDistanceText?: string | null;
  pickupMidpoint?: [number, number] | null;
  dropoffMidpoint?: [number, number] | null;
  startLocation: Location | null;
  destinationLocation: Location | null;
  activeRide: LocalRideItemData | null;
}

const pointFeature = (lng: number, lat: number): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [{ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [lng, lat] } }],
});

const MapCirclePin = React.memo<{
  id: string;
  geo: GeoJSON.FeatureCollection | null;
  color: string;
  radius: number;
  strokeColor: string;
}>(({ id, geo, color, radius, strokeColor }) =>
  !geo ? null : (
    <GeoJSONSource id={`${id}-source`} data={geo}>
      <Layer
        id={`${id}-layer`}
        type="circle"
        paint={{
          'circle-color': color,
          'circle-radius': radius,
          'circle-stroke-width': 2.5,
          'circle-stroke-color': strokeColor,
        }}
      />
    </GeoJSONSource>
  ),
);
MapCirclePin.displayName = 'MapCirclePin';

export const LocalRideMapLayers: React.FC<LocalRideMapLayersProps> = React.memo(
  ({
    driverRouteGeoJSON,
    pickupConnectorGeoJSON,
    dropoffConnectorGeoJSON,
    pickupDistanceText,
    dropoffDistanceText,
    pickupMidpoint,
    dropoffMidpoint,
    startLocation,
    destinationLocation,
    activeRide,
  }) => {
    const theme = useTheme();

    const driverPickupPinGeo = useMemo(
      () =>
        activeRide && activeRide.sourceCoords.latitude !== 0
          ? pointFeature(activeRide.sourceCoords.longitude, activeRide.sourceCoords.latitude)
          : null,
      [activeRide?.sourceCoords.latitude, activeRide?.sourceCoords.longitude],
    );

    const driverDropoffPinGeo = useMemo(
      () =>
        activeRide && activeRide.destCoords.latitude !== 0
          ? pointFeature(activeRide.destCoords.longitude, activeRide.destCoords.latitude)
          : null,
      [activeRide?.destCoords.latitude, activeRide?.destCoords.longitude],
    );

    const userPickupPinGeo = useMemo(
      () => (startLocation ? pointFeature(startLocation.longitude, startLocation.latitude) : null),
      [startLocation?.latitude, startLocation?.longitude],
    );

    const userDropoffPinGeo = useMemo(
      () =>
        destinationLocation
          ? pointFeature(destinationLocation.longitude, destinationLocation.latitude)
          : null,
      [destinationLocation?.latitude, destinationLocation?.longitude],
    );

    return (
      <>
        {driverRouteGeoJSON && (
          <GeoJSONSource
            id="driver-route-source"
            data={driverRouteGeoJSON as unknown as GeoJSON.FeatureCollection}
          >
            <Layer
              id="driver-route-casing"
              type="line"
              paint={{
                'line-color': theme.colors.primary,
                'line-width': 8,
                'line-opacity': 0.25,
              }}
              layout={{ 'line-cap': 'round', 'line-join': 'round' }}
            />
            <Layer
              id="driver-route-layer"
              type="line"
              paint={{ 'line-color': theme.colors.primary, 'line-width': 4.5 }}
              layout={{ 'line-cap': 'round', 'line-join': 'round' }}
            />
          </GeoJSONSource>
        )}

        {pickupConnectorGeoJSON && (
          <GeoJSONSource
            id="pickup-connector-source"
            data={pickupConnectorGeoJSON as unknown as GeoJSON.FeatureCollection}
          >
            <Layer
              id="pickup-connector-layer"
              type="line"
              paint={{ 'line-color': '#10B981', 'line-width': 3, 'line-dasharray': [2, 2] }}
            />
          </GeoJSONSource>
        )}

        {dropoffConnectorGeoJSON && (
          <GeoJSONSource
            id="dropoff-connector-source"
            data={dropoffConnectorGeoJSON as unknown as GeoJSON.FeatureCollection}
          >
            <Layer
              id="dropoff-connector-layer"
              type="line"
              paint={{ 'line-color': theme.colors.tertiary, 'line-width': 3, 'line-dasharray': [2, 2] }}
            />
          </GeoJSONSource>
        )}

        {pickupMidpoint && pickupDistanceText && (
          <LocalRideDistanceBadge
            id="pickup-dist-badge"
            lngLat={pickupMidpoint}
            text={pickupDistanceText}
            bgColor="#10B981"
          />
        )}

        {dropoffMidpoint && dropoffDistanceText && (
          <LocalRideDistanceBadge
            id="dropoff-dist-badge"
            lngLat={dropoffMidpoint}
            text={dropoffDistanceText}
            bgColor={theme.colors.tertiary}
          />
        )}

        <MapCirclePin
          id="driver-pickup-pin"
          geo={driverPickupPinGeo}
          color="#10B981"
          radius={8}
          strokeColor="#FFFFFF"
        />
        <MapCirclePin
          id="driver-dropoff-pin"
          geo={driverDropoffPinGeo}
          color={theme.colors.tertiary}
          radius={8}
          strokeColor="#FFFFFF"
        />
        <MapCirclePin
          id="user-pickup-pin"
          geo={userPickupPinGeo}
          color={theme.colors.primary}
          radius={7}
          strokeColor={theme.colors.surface_container_lowest}
        />
        <MapCirclePin
          id="user-dropoff-pin"
          geo={userDropoffPinGeo}
          color={theme.colors.error}
          radius={7}
          strokeColor={theme.colors.surface_container_lowest}
        />
      </>
    );
  },
);

LocalRideMapLayers.displayName = 'LocalRideMapLayers';
