import React from 'react';
import { useRideRouteMap } from './useRideRouteMap';
import { RideRouteMapProps } from './types';
import { RideRouteMapTemplate } from '@/components/templates/RideRouteMapTemplate';
import { useLocale } from '@/constants/localization';

export const RideRouteMapScreen: React.FC<RideRouteMapProps> = React.memo(({ route }) => {
  const { routePath, stops, initialStopIndex, destination } = route.params;
  const { rideRoute } = useLocale();
  
  const { 
    handleBack, 
    handleUserLocationUpdate, 
    handleRegionDidChange,
    handleZoomIn,
    handleZoomOut,
    handleOpenExternalMap,
    mapData, 
    cameraRef,
    mapRef,
    zoom,
    region,
  } = useRideRouteMap(routePath, stops, destination, initialStopIndex);

  return (
    <RideRouteMapTemplate
      title={destination ? rideRoute.locationDetails : rideRoute.title}
      onBack={handleBack}
      mapRef={mapRef}
      cameraRef={cameraRef}
      region={region}
      zoom={zoom}
      onRegionDidChange={handleRegionDidChange}
      handleUserLocationUpdate={handleUserLocationUpdate}
      mapData={mapData}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onOpenExternalMap={handleOpenExternalMap}
    />
  );
});
