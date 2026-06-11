import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  Camera,
  GeoJSONSource,
  Layer,
  UserLocation,
} from '@/components/organisms/OlaMap';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { UserLocationMarker } from '@/components/atoms/UserLocationMarker';
import { useLocale } from '@/constants/localization';
import * as S from './RideRouteMapTemplate.styles';
import { RideRouteMapTemplateProps } from './types.d';
import { Button } from '@/components/atoms/Button';

interface ExtendedUserLocationProps
  extends React.ComponentProps<typeof UserLocation> {
  onUpdate?: (location: any) => void;
  showsUserHeadingIndicator?: boolean;
}

const MapLibreUserLocation =
  UserLocation as React.ComponentType<ExtendedUserLocationProps>;

export const RideRouteMapTemplate: React.FC<RideRouteMapTemplateProps> =
  React.memo(
    ({
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
      isMapMounted,
      onMapLoaded,
    }) => {
      const theme = useTheme();
      const { rideRoute } = useLocale();

      return (
        <ScreenShell title={title} onBack={onBack}>
          <S.Container>
            <S.MapWrapper>
              {isMapMounted && (
                <S.StyledOlaMap
                  ref={mapRef}
                  onRegionDidChange={onRegionDidChange}
                  onDidFinishLoadingMap={onMapLoaded}
                >
                  <Camera
                    ref={cameraRef}
                    center={[region.longitude, region.latitude]}
                    zoom={zoom}
                  />

                  <MapLibreUserLocation
                    onUpdate={handleUserLocationUpdate}
                    showsUserHeadingIndicator={true}
                  >
                    <UserLocationMarker />
                  </MapLibreUserLocation>

                  <GeoJSONSource
                    id="ride-route-source"
                    data={mapData.geoJSON as any}
                  />

                  {/* Highlighted Booked Route Segment */}
                  <Layer
                    id="route-line-highlighted"
                    source="ride-route-source"
                    type="line"
                    filter={[
                      'all',
                      ['==', ['get', 'type'], 'route'],
                      ['==', ['get', 'status'], 'highlighted'],
                    ]}
                    paint={{
                      'line-color': theme.colors.primary,
                      'line-width': 6,
                    }}
                    layout={{
                      'line-cap': 'round',
                      'line-join': 'round',
                    }}
                  />
                  {/* Muted Unselected Route Segments */}
                  <Layer
                    id="route-line-unselected"
                    source="ride-route-source"
                    type="line"
                    filter={[
                      'all',
                      ['==', ['get', 'type'], 'route'],
                      ['==', ['get', 'status'], 'unselected'],
                    ]}
                    paint={{
                      'line-color': theme.colors.outline,
                      'line-width': 3.5,
                      'line-opacity': 0.5,
                    }}
                    layout={{
                      'line-cap': 'round',
                      'line-join': 'round',
                    }}
                  />
                  {/* Connecting Path: User Searched Pickup to Ride Pickup */}
                  <Layer
                    id="route-line-connection-pickup"
                    source="ride-route-source"
                    type="line"
                    filter={[
                      'all',
                      ['==', ['get', 'type'], 'connection'],
                      ['==', ['get', 'status'], 'pickup'],
                    ]}
                    paint={{
                      'line-color': '#00875a',
                      'line-width': 4,
                      'line-dasharray': [2, 2],
                    }}
                    layout={{
                      'line-cap': 'round',
                      'line-join': 'round',
                    }}
                  />
                  {/* Connecting Path: Ride Dropoff to User Searched Dropoff */}
                  <Layer
                    id="route-line-connection-dropoff"
                    source="ride-route-source"
                    type="line"
                    filter={[
                      'all',
                      ['==', ['get', 'type'], 'connection'],
                      ['==', ['get', 'status'], 'dropoff'],
                    ]}
                    paint={{
                      'line-color': theme.colors.error,
                      'line-width': 4,
                      'line-dasharray': [2, 2],
                    }}
                    layout={{
                      'line-cap': 'round',
                      'line-join': 'round',
                    }}
                  />
                  <Layer
                    id="marker-start"
                    source="ride-route-source"
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
                    source="ride-route-source"
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
                    source="ride-route-source"
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
                  {/* User Searched Pickup Marker */}
                  <Layer
                    id="marker-user-pickup"
                    source="ride-route-source"
                    type="circle"
                    filter={[
                      'all',
                      ['==', ['get', 'type'], 'marker'],
                      ['==', ['get', 'role'], 'user-pickup'],
                    ]}
                    paint={{
                      'circle-color': theme.colors.primary,
                      'circle-radius': 8,
                      'circle-stroke-width': 3,
                      'circle-stroke-color': '#FFFFFF',
                    }}
                  />
                  {/* User Searched Dropoff Marker */}
                  <Layer
                    id="marker-user-dropoff"
                    source="ride-route-source"
                    type="circle"
                    filter={[
                      'all',
                      ['==', ['get', 'type'], 'marker'],
                      ['==', ['get', 'role'], 'user-dropoff'],
                    ]}
                    paint={{
                      'circle-color': theme.colors.tertiary,
                      'circle-radius': 8,
                      'circle-stroke-width': 3,
                      'circle-stroke-color': '#FFFFFF',
                    }}
                  />
                </S.StyledOlaMap>
              )}
            </S.MapWrapper>

            <S.ControlsWrapper>
              <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
            </S.ControlsWrapper>

            <S.Footer>
              <Button
                onPress={() =>
                  onOpenExternalMap(
                    Platform.OS === 'android' ? 'google' : 'apple',
                  )
                }
                icon={Platform.OS === 'android' ? 'map' : 'explore'}
              >
                {Platform.OS === 'android'
                  ? rideRoute.openInGoogleMaps
                  : rideRoute.openInAppleMaps}
              </Button>
            </S.Footer>
          </S.Container>
        </ScreenShell>
      );
    },
  );
