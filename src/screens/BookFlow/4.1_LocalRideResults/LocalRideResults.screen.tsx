import React, { useRef, useState, useCallback } from 'react';
import { useTheme } from 'styled-components/native';
import {
  GeoJSONSource,
  Layer,
} from '@maplibre/maplibre-react-native';
import { LocalRideResultsTemplate } from '@/components/templates/LocalRideResultsTemplate';
import { useLocalRideResults } from './useLocalRideResults';

export const LocalRideResultsScreen: React.FC = React.memo(() => {
  const theme = useTheme();
  const {
    startLocation,
    destinationLocation,
    center,
    pickupLine,
    dropoffLine,
    handleRegionChange,
    handleBack,
    handleRequestLocalPartner,
    t,
  } = useLocalRideResults();

  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const [zoom, setZoom] = useState(14);

  const handleZoomIn = useCallback(() => setZoom(z => Math.min(z + 1, 20)), []);
  const handleZoomOut = useCallback(() => setZoom(z => Math.max(z - 1, 3)), []);

  const mapChildren = (
    <>
      {/* Pickup Path */}
      {pickupLine && (
        <GeoJSONSource id="pickup-path-source" data={pickupLine}>
          <Layer
            id="pickup-path-layer"
            type="line"
            paint={{
              'line-color': theme.colors.primary,
              'line-width': 4,
              'line-dasharray': [2, 2],
            }}
          />
        </GeoJSONSource>
      )}

      {/* Dropoff Path */}
      {dropoffLine && (
        <GeoJSONSource id="dropoff-path-source" data={dropoffLine}>
          <Layer
            id="dropoff-path-layer"
            type="line"
            paint={{
              'line-color': theme.colors.tertiary,
              'line-width': 4,
              'line-dasharray': [2, 2],
            }}
          />
        </GeoJSONSource>
      )}
      
      {/* Start Marker */}
      {startLocation && (
        <GeoJSONSource 
          id="pickup-marker-source" 
          data={{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [startLocation.longitude, startLocation.latitude],
            },
          }}
        >
          <Layer
            id="pickup-marker-layer"
            type="circle"
            paint={{
              'circle-color': theme.colors.primary,
              'circle-radius': 8,
              'circle-stroke-width': 3,
              'circle-stroke-color': theme.colors.surface_container_lowest,
            }}
          />
        </GeoJSONSource>
      )}

      {/* Destination Marker */}
      {destinationLocation && (
        <GeoJSONSource 
          id="dropoff-marker-source" 
          data={{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [destinationLocation.longitude, destinationLocation.latitude],
            },
          }}
        >
          <Layer
            id="dropoff-marker-layer"
            type="circle"
            paint={{
              'circle-color': theme.colors.tertiary,
              'circle-radius': 8,
              'circle-stroke-width': 3,
              'circle-stroke-color': theme.colors.surface_container_lowest,
            }}
          />
        </GeoJSONSource>
      )}
    </>
  );

  return (
    <LocalRideResultsTemplate
      onBack={handleBack}
      latitude={center.latitude}
      longitude={center.longitude}
      localServiceAreaLabel={t.localServiceArea}
      requestLocalPartnerLabel={t.requestLocalPartner}
      onRequestLocalPartner={handleRequestLocalPartner}
      mapChildren={mapChildren}
      onRegionChangeComplete={handleRegionChange}
      mapRef={mapRef}
      cameraRef={cameraRef}
      zoom={zoom}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
    />
  );
});

LocalRideResultsScreen.displayName = 'LocalRideResultsScreen';
