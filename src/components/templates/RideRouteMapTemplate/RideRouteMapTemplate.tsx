import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { 
  Camera, 
  GeoJSONSource, 
  Layer, 
  UserLocation 
} from '@maplibre/maplibre-react-native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { UserLocationMarker } from '@/components/atoms/UserLocationMarker';
import { useLocale } from '@/constants/localization';
import * as S from './RideRouteMapTemplate.styles';
import { RideRouteMapTemplateProps } from './types.d';
import { Button } from '@/components/atoms/Button';

export const RideRouteMapTemplate: React.FC<RideRouteMapTemplateProps> = React.memo(({
  title,
  onBack,
  mapRef,
  cameraRef,
  region,
  zoom,
  onRegionDidChange,
  handleUserLocationUpdate,
  mapData,
  onZoomIn,
  onZoomOut,
  onOpenExternalMap,
}) => {
  const theme = useTheme();
  const { rideRoute } = useLocale();

  return (
    <ScreenShell title={title} onBack={onBack}>
      <S.Container>
        <S.MapWrapper>
          <S.StyledOlaMap
            ref={mapRef}
            onRegionDidChange={onRegionDidChange}
          >
            <Camera
              ref={cameraRef}
              center={[region.longitude, region.latitude]}
              zoom={zoom}
            />
            
            <UserLocation 
              onUpdate={handleUserLocationUpdate}
              showsUserHeadingIndicator={true}
            >
              <UserLocationMarker />
            </UserLocation>

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
          <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
        </S.ControlsWrapper>

        <S.Footer>
          <Button
            onPress={() => onOpenExternalMap(Platform.OS === 'android' ? 'google' : 'apple')}
            icon={Platform.OS === 'android' ? 'map' : 'explore'}
          >
            {Platform.OS === 'android' ? rideRoute.openInGoogleMaps : rideRoute.openInAppleMaps}
          </Button>
        </S.Footer>
      </S.Container>
    </ScreenShell>
  );
});
