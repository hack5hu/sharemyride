import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { UserLocationMarker } from '@/components/atoms/UserLocationMarker';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import {
  Camera,
  UserLocation,
  ViewAnnotation,
} from '@/components/organisms/OlaMap';
import { useLocale } from '@/constants/localization';
import { useBottomSafeArea } from '@/hooks/useBottomSafeArea';
import { RouteMapLayers } from './components/RouteMapLayers';
import {
  RouteMarkerCallout,
  type RouteMarkerData,
} from './components/RouteMarkerCallout';
import * as S from './RideRouteMapTemplate.styles';
import { type RideRouteMapTemplateProps } from './types.d';

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
      mapData,
      onOpenExternalMap,
      onZoomIn,
      onZoomOut,
      handleUserLocationUpdate,
    }) => {
      const theme = useTheme();
      const insets = useSafeAreaInsets();
      const translations = useLocale();

      const paddingBottomVal = useBottomSafeArea(12, 12);

      return (
        <S.Container>
          <ScreenShell title={title || translations.common.back} onBack={onBack}>
            <S.MapWrapper>
              {region && (
                <S.StyledOlaMap
                  ref={mapRef as any}
                >
                  <Camera
                    ref={cameraRef as any}
                    zoom={zoom ?? 12}
                    center={[region.longitude, region.latitude]}
                    minZoom={3}
                    maxZoom={18}
                  />

                  <MapLibreUserLocation
                    onUpdate={handleUserLocationUpdate}
                    showsUserHeadingIndicator={true}
                  >
                    <UserLocationMarker />
                  </MapLibreUserLocation>

                  {mapData?.geoJSON && (
                    <RouteMapLayers
                      geoJSON={mapData.geoJSON}
                      theme={theme}
                    />
                  )}

                  {mapData?.markers?.map((marker: RouteMarkerData) => (
                    <ViewAnnotation
                      key={marker.id}
                      id={marker.id}
                      lngLat={marker.coordinates}
                      anchor="bottom"
                    >
                      <RouteMarkerCallout marker={marker} />
                    </ViewAnnotation>
                  ))}
                </S.StyledOlaMap>
              )}
            </S.MapWrapper>

            <S.ControlsWrapper>
              <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
            </S.ControlsWrapper>

            <S.Footer $paddingBottom={paddingBottomVal}>
              <Button
                onPress={() =>
                  onOpenExternalMap(
                    Platform.OS === 'android' ? 'google' : 'apple',
                  )
                }
                icon={Platform.OS === 'android' ? 'map' : 'explore'}
              >
                {Platform.OS === 'android'
                  ? translations.rideRoute.openInGoogleMaps
                  : translations.rideRoute.openInAppleMaps}
              </Button>
            </S.Footer>
          </ScreenShell>
        </S.Container>
      );
    },
  );

RideRouteMapTemplate.displayName = 'RideRouteMapTemplate';
