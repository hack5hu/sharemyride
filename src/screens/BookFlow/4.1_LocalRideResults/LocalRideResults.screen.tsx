import { type MapRef, type CameraRef } from '@maplibre/maplibre-react-native';
import React, { useRef, useCallback, useEffect, useMemo, useState } from 'react';
import { LocalRideResultsTemplate } from '@/components/templates/LocalRideResultsTemplate';
import { LocalRideMapLayers } from './components/LocalRideMapLayers';
import { useLocalRideResults } from './useLocalRideResults';

export const LocalRideResultsScreen: React.FC = React.memo(() => {
  const {
    rides,
    selectedRideId,
    activeRide,
    center,
    driverRouteGeoJSON,
    pickupConnectorGeoJSON,
    dropoffConnectorGeoJSON,
    pickupDistanceText,
    dropoffDistanceText,
    pickupMidpoint,
    dropoffMidpoint,
    startLocation,
    destinationLocation,
    startAddress,
    destinationAddress,
    isFilterModalOpen,
    selectedFilters,
    activeFiltersCount,
    handleOpenFilters,
    handleCloseFilters,
    handleClearFilters,
    handleApplyFilters,
    handleSelectRide,
    handleRidePress,
    handleBack,
  } = useLocalRideResults();

  const mapRef = useRef<MapRef>(null);
  const cameraRef = useRef<CameraRef>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const handleMapLoaded = useCallback(() => setIsMapReady(true), []);

  const handleZoomIn = useCallback(async () => {
    if (cameraRef.current) {
      const currentZoom = (await mapRef.current?.getZoom()) ?? 13;
      cameraRef.current.zoomTo(Math.min(currentZoom + 1, 18), { duration: 250 });
    }
  }, []);

  const handleZoomOut = useCallback(async () => {
    if (cameraRef.current) {
      const currentZoom = (await mapRef.current?.getZoom()) ?? 13;
      cameraRef.current.zoomTo(Math.max(currentZoom - 1, 8), { duration: 250 });
    }
  }, []);

  useEffect(() => {
    if (!cameraRef.current) return;

    const coords: [number, number][] = [];
    if (startLocation) {
      coords.push([startLocation.longitude, startLocation.latitude]);
    }
    if (destinationLocation) {
      coords.push([destinationLocation.longitude, destinationLocation.latitude]);
    }
    if (activeRide && activeRide.sourceCoords.latitude !== 0) {
      coords.push([activeRide.sourceCoords.longitude, activeRide.sourceCoords.latitude]);
    }
    if (activeRide && activeRide.destCoords.latitude !== 0) {
      coords.push([activeRide.destCoords.longitude, activeRide.destCoords.latitude]);
    }
    if (driverRouteGeoJSON?.geometry && 'coordinates' in driverRouteGeoJSON.geometry) {
      const lineCoords = driverRouteGeoJSON.geometry.coordinates as [number, number][];
      if (Array.isArray(lineCoords)) {
        lineCoords.forEach(c => coords.push(c));
      }
    }

    if (coords.length >= 2) {
      const lngs = coords.map(c => c[0]);
      const lats = coords.map(c => c[1]);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);

      const timer = setTimeout(() => {
        if (!cameraRef.current) return;
        if (Math.abs(maxLng - minLng) < 0.001 && Math.abs(maxLat - minLat) < 0.001) {
          cameraRef.current.easeTo({
            center: [coords[0][0], coords[0][1]],
            zoom: 14,
            duration: 500,
          });
        } else {
          cameraRef.current.fitBounds(
            [minLng, minLat, maxLng, maxLat],
            {
              padding: { top: 90, bottom: 190, left: 35, right: 35 },
              duration: 600,
              easing: 'ease',
            },
          );
        }
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [activeRide?.id, startLocation, destinationLocation, driverRouteGeoJSON, isMapReady]);

  const mapChildren = useMemo(
    () => (
      <LocalRideMapLayers
        driverRouteGeoJSON={driverRouteGeoJSON}
        pickupConnectorGeoJSON={pickupConnectorGeoJSON}
        dropoffConnectorGeoJSON={dropoffConnectorGeoJSON}
        pickupDistanceText={pickupDistanceText}
        dropoffDistanceText={dropoffDistanceText}
        pickupMidpoint={pickupMidpoint}
        dropoffMidpoint={dropoffMidpoint}
        startLocation={startLocation}
        destinationLocation={destinationLocation}
        activeRide={activeRide}
      />
    ),
    [
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
    ],
  );

  return (
    <LocalRideResultsTemplate
      onBack={handleBack}
      latitude={center.latitude}
      longitude={center.longitude}
      rides={rides}
      selectedRideId={selectedRideId}
      onSelectRide={handleSelectRide}
      onPressDetails={handleRidePress}
      startAddress={startAddress}
      destinationAddress={destinationAddress}
      mapChildren={mapChildren}
      mapRef={mapRef}
      cameraRef={cameraRef}
      onMapLoaded={handleMapLoaded}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onOpenFilters={handleOpenFilters}
      activeFiltersCount={activeFiltersCount}
      isFilterModalOpen={isFilterModalOpen}
      onCloseFilters={handleCloseFilters}
      onClearFilters={handleClearFilters}
      onApplyFilters={handleApplyFilters}
      selectedFilters={selectedFilters}
    />
  );
});

LocalRideResultsScreen.displayName = 'LocalRideResultsScreen';
