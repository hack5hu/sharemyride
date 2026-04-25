import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import {
  Camera,
  GeoJSONSource,
  Layer,
  CameraRef,
} from '@maplibre/maplibre-react-native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useRideRouteMap } from './useRideRouteMap';
import { RideRouteMapProps } from './types';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import * as S from './RideRouteMap.styles';

export const RideRouteMapScreen: React.FC<RideRouteMapProps> = ({ route }) => {
  const theme = useTheme();
  const { routePath, stops, initialStopIndex } = route.params;
  const { handleBack, mapData } = useRideRouteMap(routePath, stops);
  const cameraRef = useRef<CameraRef>(null);
  const mapRef = useRef<any>(null);
  const zoomRef = useRef(14);

  // Initialize camera state
  const initialPoint =
    initialStopIndex !== undefined && stops && stops[initialStopIndex]
      ? stops[initialStopIndex]
      : stops[0];

  const [zoom, setZoom] = useState(initialStopIndex !== undefined ? 15 : 12);
  const [region, setRegion] = useState({
    latitude: initialPoint?.lat || 12.9716,
    longitude: initialPoint?.lon || 77.5946,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const controller = cameraRef.current || mapRef.current;
      if (initialStopIndex !== undefined) {
        controller?.setStop({
          center: [initialPoint.lon, initialPoint.lat],
          zoom: 17,
          duration: 1000,
        });
      } else if (mapData.bounds) {
        const [minLon, minLat, maxLon, maxLat] = mapData.bounds;
        cameraRef.current?.fitBounds(
          [minLon, minLat, maxLon, maxLat],
          { 
            padding: { top: 120, right: 60, bottom: 280, left: 60 }, 
            duration: 2000 
          }
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [initialStopIndex, mapData.bounds, initialPoint]);

  const handleZoom = useCallback((increment: number) => {
    const newZoom = Math.min(Math.max(zoomRef.current + increment, 3), 20);
    zoomRef.current = newZoom;

    cameraRef.current?.setStop({
      zoom: newZoom,
      duration: 300,
    });
  }, []);
  const handleZoomIn = useCallback(() => handleZoom(1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-1), [handleZoom]);

  const handleOpenSystemMap = () => {
    if (!stops || stops.length === 0) return;
    const start = stops[0];
    const end = stops[stops.length - 1];

    // For iOS: maps://?saddr=lat,lon&daddr=lat,lon
    // For Android: google.navigation:q=lat,lon
    const url =
      Platform.select({
        ios: `http://maps.apple.com/?saddr=${start.lat},${start.lon}&daddr=${end.lat},${end.lon}&dirflg=d`,
        android: `google.navigation:q=${end.lat},${end.lon}&mode=d`,
      }) ||
      `https://www.google.com/maps/dir/?api=1&origin=${start.lat},${start.lon}&destination=${end.lat},${end.lon}`;

    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScreenShell title="Ride Route" onBack={handleBack}>
      <S.Container>
        <S.MapWrapper>
          <S.StyledOlaMap
            ref={mapRef}
            onRegionDidChange={(event: any) => {
              const viewState = event?.nativeEvent || event;
              if (!viewState?.center) return;
              const [longitude, latitude] = viewState.center;
              const currentZoom = viewState.zoom;

              if (currentZoom !== undefined) {
                setZoom(currentZoom);
                zoomRef.current = currentZoom;
              }
              setRegion({ latitude, longitude });
            }}
          >
            <Camera
              ref={cameraRef}
              center={[region.longitude, region.latitude]}
              zoom={zoom}
            />
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
              <Layer
                id="marker-start"
                type="circle"
                filter={[
                  'all',
                  ['==', ['get', 'type'], 'marker'],
                  ['==', ['get', 'role'], 'start'],
                ]}
                paint={{
                  'circle-color': '#00875a',
                  'circle-radius': 8,
                  'circle-stroke-width': 3,
                  'circle-stroke-color': '#FFFFFF',
                }}
              />
              <Layer
                id="marker-end"
                type="circle"
                filter={[
                  'all',
                  ['==', ['get', 'type'], 'marker'],
                  ['==', ['get', 'role'], 'end'],
                ]}
                paint={{
                  'circle-color': theme.colors.error,
                  'circle-radius': 8,
                  'circle-stroke-width': 3,
                  'circle-stroke-color': '#FFFFFF',
                }}
              />
              <Layer
                id="marker-stop"
                type="circle"
                filter={[
                  'all',
                  ['==', ['get', 'type'], 'marker'],
                  ['==', ['get', 'role'], 'stop'],
                ]}
                paint={{
                  'circle-color': theme.colors.primary_container,
                  'circle-radius': 6,
                  'circle-stroke-width': 2,
                  'circle-stroke-color': theme.colors.primary,
                }}
              />
            </GeoJSONSource>
          </S.StyledOlaMap>
        </S.MapWrapper>

        <S.ControlsWrapper>
          <MapControlsFABs onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </S.ControlsWrapper>

        <S.Footer>
          <S.MapButtonGradient>
            <S.MapButton onPress={handleOpenSystemMap} activeOpacity={0.8}>
              <Typography variant="title" size="sm" weight="bold" color="white">
                Open in Maps
              </Typography>
            </S.MapButton>
          </S.MapButtonGradient>
        </S.Footer>
      </S.Container>
    </ScreenShell>
  );
};
