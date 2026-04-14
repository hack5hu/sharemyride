import React, { useRef, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { Location } from '@/store/useLocationStore';
import { OlaMap } from '@/components/organisms/OlaMap';
import { Camera, GeoJSONSource, Layer, CameraRef } from '@maplibre/maplibre-react-native';
import { getBoundingBox } from '@/utils/polyline';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { moderateScale } from '@/styles';
import * as S from './BentoMapPreview.styles';

export interface BentoMapPreviewProps {
  startLocation?: Location | null;
  destinationLocation?: Location | null;
  middleStops: Location[];
}

export const BentoMapPreview: React.FC<BentoMapPreviewProps> = ({
  startLocation,
  destinationLocation,
  middleStops,
}) => {
  const theme = useTheme();
  const { middleStops: t } = useLocale();
  const cameraRef = useRef<CameraRef>(null);
  const [zoom, setZoom] = React.useState(12);

  // Initial city-level center
  const initialCenter = useMemo((): [number, number] => {
    if (startLocation) return [startLocation.longitude, startLocation.latitude];
    return [77.5946, 12.9716]; // Bengaluru default
  }, [startLocation]);

  const pointsGeoJSON = useMemo((): GeoJSON.FeatureCollection => {
    const features: GeoJSON.Feature[] = [];

    if (startLocation) {
      features.push({
        type: 'Feature',
        id: 'start',
        properties: { type: 'marker', role: 'start' },
        geometry: {
          type: 'Point',
          coordinates: [startLocation.longitude, startLocation.latitude],
        },
      });
    }

    if (destinationLocation) {
      features.push({
        type: 'Feature',
        id: 'end',
        properties: { type: 'marker', role: 'end' },
        geometry: {
          type: 'Point',
          coordinates: [destinationLocation.longitude, destinationLocation.latitude],
        },
      });
    }

    middleStops.forEach((stop, index) => {
      features.push({
        type: 'Feature',
        id: `stop-${stop.id}`,
        properties: { type: 'marker', role: 'stop', index },
        geometry: {
          type: 'Point',
          coordinates: [stop.longitude, stop.latitude],
        },
      });
    });

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [startLocation, destinationLocation, middleStops]);

  useEffect(() => {
    if (cameraRef.current) {
      const allCoords: [number, number][] = [];
      if (startLocation) allCoords.push([startLocation.longitude, startLocation.latitude]);
      if (destinationLocation) allCoords.push([destinationLocation.longitude, destinationLocation.latitude]);
      middleStops.forEach(s => allCoords.push([s.longitude, s.latitude]));

      if (allCoords.length >= 2) {
        const bounds = getBoundingBox(allCoords);
        const [minLng, minLat, maxLng, maxLat] = bounds;
        cameraRef.current.fitBounds(
          [minLng, minLat, maxLng, maxLat],
          { padding: { top: 40, right: 40, bottom: 40, left: 40 }, duration: 600 }
        );
      } else if (allCoords.length === 1) {
        cameraRef.current.setStop({
          center: allCoords[0],
          zoom: 14,
          duration: 600,
        });
      }
    }
  }, [startLocation, destinationLocation, middleStops]);

  return (
    <S.Container>
      <OlaMap style={{ flex: 1 }}>
        <Camera 
          ref={cameraRef} 
          center={initialCenter}
          zoom={zoom}
        />
        
        <GeoJSONSource id="points-source" data={pointsGeoJSON}>
           {/* Markers implementation... */}
          <Layer
            id="start-point"
            type="circle"
            filter={['==', ['get', 'role'], 'start']}
            paint={{
              'circle-color': '#00875a',
              'circle-radius': 6,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
            }}
          />
          <Layer
            id="end-point"
            type="circle"
            filter={['==', ['get', 'role'], 'end']}
            paint={{
              'circle-color': theme.colors.error,
              'circle-radius': 6,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
            }}
          />
          <Layer
            id="stops-points"
            type="circle"
            filter={['==', ['get', 'role'], 'stop']}
            paint={{
              'circle-color': theme.colors.primary,
              'circle-radius': 5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
            }}
          />
        </GeoJSONSource>
      </OlaMap>

      <View style={{ position: 'absolute', right: moderateScale(12), bottom: moderateScale(40), zIndex: 10 }}>
        <MapControlsFABs
          onZoomIn={() => setZoom(prev => Math.min(prev + 1, 20))}
          onZoomOut={() => setZoom(prev => Math.max(prev - 1, 3))}
        />
      </View>

      <S.GradientOverlay 
        colors={[theme.colors.surface_container, 'transparent']} 
        start={{ x: 0, y: 1 }} 
        end={{ x: 0, y: 0.5 }} 
        pointerEvents="none"
      />
      
      <S.BadgeContainer>
        <S.BadgeText>{t.optimizedRoute}</S.BadgeText>
      </S.BadgeContainer>
    </S.Container>
  );
};
