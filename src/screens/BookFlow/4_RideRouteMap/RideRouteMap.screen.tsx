import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Camera, GeoJSONSource, Layer, CameraRef } from '@maplibre/maplibre-react-native';
import { OlaMap } from '@/components/organisms/OlaMap';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useRideRouteMap } from './useRideRouteMap';
import { RideRouteMapProps } from './types';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { moderateScale } from '@/styles';

export const RideRouteMapScreen: React.FC<RideRouteMapProps> = ({ route }) => {
  const theme = useTheme();
  const { routePath, stops } = route.params;
  const { handleBack, mapData } = useRideRouteMap(routePath, stops);
  const cameraRef = useRef<CameraRef>(null);

  useEffect(() => {
    if (mapData.bounds && cameraRef.current) {
      cameraRef.current.fitBounds(
        [mapData.bounds[0], mapData.bounds[1], mapData.bounds[2], mapData.bounds[3]],
        { padding: { top: 60, right: 60, bottom: 60, left: 60 }, duration: 500 }
      );
    }
  }, [mapData]);

  return (
    <ScreenShell title="Ride Route" onBack={handleBack}>
      <View style={styles.container}>
        <OlaMap style={styles.map}>
          <Camera ref={cameraRef} />
          <GeoJSONSource id="ride-route-source" data={mapData.geoJSON as any}>
            <Layer
              id="route-line"
              type="line"
              filter={['==', ['get', 'type'], 'route']}
              paint={{
                'line-color': theme.colors.primary,
                'line-width': 5,
                'line-cap': 'round',
                'line-join': 'round',
              }}
            />
            {/* Start Marker */}
            <Layer
              id="marker-start"
              type="circle"
              filter={['all', ['==', ['get', 'type'], 'marker'], ['==', ['get', 'role'], 'start']]}
              paint={{
                'circle-color': '#00875a',
                'circle-radius': 8,
                'circle-stroke-width': 3,
                'circle-stroke-color': '#FFFFFF',
              }}
            />
            {/* End Marker */}
            <Layer
              id="marker-end"
              type="circle"
              filter={['all', ['==', ['get', 'type'], 'marker'], ['==', ['get', 'role'], 'end']]}
              paint={{
                'circle-color': theme.colors.error,
                'circle-radius': 8,
                'circle-stroke-width': 3,
                'circle-stroke-color': '#FFFFFF',
              }}
            />
            {/* Mid Stop Markers */}
            <Layer
              id="marker-stop"
              type="circle"
              filter={['all', ['==', ['get', 'type'], 'marker'], ['==', ['get', 'role'], 'stop']]}
              paint={{
                'circle-color': theme.colors.primary_container,
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-stroke-color': theme.colors.primary,
              }}
            />
          </GeoJSONSource>
        </OlaMap>
        <View style={styles.controls}>
          <MapControlsFABs 
            onZoomIn={() => cameraRef.current?.zoomTo(cameraRef.current?.getZoom() + 1)} 
            onZoomOut={() => cameraRef.current?.zoomTo(cameraRef.current?.getZoom() - 1)} 
          />
        </View>
      </View>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    position: 'absolute',
    right: moderateScale(16),
    bottom: moderateScale(16),
  }
});
