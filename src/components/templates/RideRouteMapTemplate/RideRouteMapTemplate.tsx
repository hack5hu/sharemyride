import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  Camera,
  UserLocation,
} from '@/components/organisms/OlaMap';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { UserLocationMarker } from '@/components/atoms/UserLocationMarker';
import { useLocale } from '@/constants/localization';
import * as S from './RideRouteMapTemplate.styles';
import { RideRouteMapTemplateProps } from './types.d';
import { Button } from '@/components/atoms/Button';
import { RouteMapLayers } from './components/RouteMapLayers';

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
      mapData,
      onOpenExternalMap,
      onZoomIn,
      onZoomOut,
      handleUserLocationUpdate,
    }) => {
      const theme = useTheme();
      const insets = useSafeAreaInsets();
      const translations = useLocale();

      const paddingBottomVal = Math.max(insets.bottom, 12);

      return (
        <S.Root>
          <ScreenShell title={title || translations.common.back} onBack={onBack}>
            <S.MapWrapper>
              {region && (
                <S.StyledOlaMap
                  ref={mapRef as any}
                  styleURL="https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json"
                >
                  <Camera
                    ref={cameraRef as any}
                    zoomLevel={region.zoom || 12}
                    centerCoordinate={[region.longitude, region.latitude]}
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
                  ? translations.rideDetails.openInGoogleMaps
                  : translations.rideDetails.openInAppleMaps}
              </Button>
            </S.Footer>
          </ScreenShell>
        </S.Root>
      );
    },
  );

RideRouteMapTemplate.displayName = 'RideRouteMapTemplate';
