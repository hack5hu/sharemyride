import React from 'react';
import { Keyboard } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Location } from '@/store/useLocationStore';
import {
  Camera,
  GeoJSONSource,
  Layer,
  Marker,
} from '@/components/organisms/OlaMap';
import { SnapResult } from '@/utils/routeSnap';
import * as S from './MapLayerSection.styles';
import { StyledOlaMap } from './MapLayerSection.styles';

export interface MapLayerSectionProps {
  isSearching: boolean;
  isMapMounted: boolean;
  mapRef: React.RefObject<unknown>;
  cameraRef: React.RefObject<unknown>;
  initialCenter: [number, number];
  routeGeoJSON: GeoJSON.FeatureCollection | null;
  connectorGeoJSON: GeoJSON.FeatureCollection | null;
  startLocation: Location | null;
  destinationLocation: Location | null;
  snapResult: SnapResult | null;
  isWarning: boolean;
  onMapPress?: (feature: unknown) => void;
  onRegionWillChange?: () => void;
  onRegionIsChanging?: (event: unknown) => void;
  onRegionChangeComplete?: (viewState: unknown) => void;
}

const ROUTE_LINE_STYLE = {
  lineColor: '#4A90D9',
  lineWidth: 4,
  lineOpacity: 0.85,
  lineCap: 'round' as const,
  lineJoin: 'round' as const,
};

const CONNECTOR_LINE_STYLE = {
  lineColor: '#FF8C42',
  lineWidth: 2.5,
  lineOpacity: 0.8,
  lineDasharray: [8, 6],
  lineCap: 'round' as const,
};

export const MapLayerSection: React.FC<MapLayerSectionProps> = ({
  isSearching,
  isMapMounted,
  mapRef,
  cameraRef,
  initialCenter,
  routeGeoJSON,
  connectorGeoJSON,
  startLocation,
  destinationLocation,
  snapResult,
  isWarning,
  onMapPress,
  onRegionWillChange,
  onRegionIsChanging,
  onRegionChangeComplete,
}) => {
  const theme = useTheme();

  return (
    <S.MapLayer
      pointerEvents={isSearching ? 'none' : 'auto'}
      onTouchStart={() => Keyboard.dismiss()}
    >
      {isMapMounted && (
        <StyledOlaMap
          ref={mapRef as any}
          onPress={(feature: unknown) => {
            Keyboard.dismiss();
            onMapPress?.(feature);
          }}
          onRegionWillChange={() => {
            Keyboard.dismiss();
            onRegionWillChange?.();
          }}
          onRegionIsChanging={(e: unknown) => {
            Keyboard.dismiss();
            onRegionIsChanging?.(e);
          }}
          onRegionDidChange={onRegionChangeComplete}
        >
          <Camera ref={cameraRef as any} center={initialCenter} zoom={14} />

          {routeGeoJSON && (
            <>
              <GeoJSONSource
                id="route-line-source"
                data={routeGeoJSON}
              />
              <Layer
                id="route-line-layer"
                source="route-line-source"
                type="line"
                style={ROUTE_LINE_STYLE}
              />
            </>
          )}

          {connectorGeoJSON && (
            <>
              <GeoJSONSource
                id="connector-line-source"
                data={connectorGeoJSON}
              />
              <Layer
                id="connector-line-layer"
                source="connector-line-source"
                type="line"
                style={CONNECTOR_LINE_STYLE}
              />
            </>
          )}

          {startLocation && (
            <Marker
              lngLat={[startLocation.longitude, startLocation.latitude]}
            >
              <S.MarkerDotOuter color={theme.colors.primary}>
                <S.MarkerDot color={theme.colors.primary} size={10} />
              </S.MarkerDotOuter>
            </Marker>
          )}

          {destinationLocation && (
            <Marker
              lngLat={[
                destinationLocation.longitude,
                destinationLocation.latitude,
              ]}
            >
              <S.MarkerDotOuter color={theme.colors.error}>
                <S.MarkerDot color={theme.colors.error} size={10} />
              </S.MarkerDotOuter>
            </Marker>
          )}

          {snapResult && (
            <Marker lngLat={snapResult.snappedPoint}>
              <S.MarkerDot
                color={
                  isWarning ? theme.colors.error : theme.colors.primary
                }
                size={8}
              />
            </Marker>
          )}
        </StyledOlaMap>
      )}
    </S.MapLayer>
  );
};
