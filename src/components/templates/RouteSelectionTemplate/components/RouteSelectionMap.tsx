import React from 'react';
import { useTheme } from 'styled-components/native';
import { Camera, GeoJSONSource, Layer } from '@/components/organisms/OlaMap';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { RouteData } from '@/screens/PublishFlow/2_RouteSelection/useRouteSelection';
import * as S from '../RouteSelectionTemplate.styles';

export interface RouteSelectionMapProps {
  cameraRef: React.RefObject<any>;
  routesData: RouteData[];
  selectedRouteId: string | null;
  onSelectRoute: (id: string) => void;
  isMapLoaded: boolean;
  setIsMapLoaded: (loaded: boolean) => void;
  handleRegionDidChange: (event: any) => void;
  handleZoom: (increment: number) => void;
}

export const RouteSelectionMap: React.FC<RouteSelectionMapProps> = React.memo(({
  cameraRef,
  routesData,
  selectedRouteId,
  onSelectRoute,
  setIsMapLoaded,
  handleRegionDidChange,
  handleZoom,
}) => {
  const theme = useTheme();

  const selectedRouteData = React.useMemo(() => {
    return routesData.find(r => r.uiData.id === selectedRouteId);
  }, [routesData, selectedRouteId]);

  const allRoutesGeoJSON = React.useMemo((): GeoJSON.FeatureCollection => {
    const features: GeoJSON.Feature[] = routesData.map(routeData => ({
      type: 'Feature',
      id: routeData.uiData.id,
      properties: {
        id: routeData.uiData.id,
        type: 'route',
      },
      geometry: {
        type: 'LineString',
        coordinates: routeData.coordinates,
      },
    }));

    if (selectedRouteData) {
      const coords = selectedRouteData.coordinates;
      if (coords.length > 0) {
        features.push({
          type: 'Feature',
          id: 'marker-start',
          properties: { type: 'marker', role: 'start' },
          geometry: {
            type: 'Point',
            coordinates: coords[0],
          },
        });
        features.push({
          type: 'Feature',
          id: 'marker-end',
          properties: { type: 'marker', role: 'end' },
          geometry: {
            type: 'Point',
            coordinates: coords[coords.length - 1],
          },
        });
      }
    }

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [routesData, selectedRouteData]);

  const handleMapRoutePress = (event: any) => {
    const feature = event?.features?.[0];
    if (feature?.properties?.id && feature.properties.type === 'route') {
      onSelectRoute(feature.properties.id);
    }
  };

  return (
    <S.MapSection>
      <S.StyledOlaMap
        onRegionDidChange={handleRegionDidChange}
        onDidFinishLoadingMap={() => setIsMapLoaded(true)}
      >
        <Camera ref={cameraRef} minZoom={8} maxZoom={18} />

        <GeoJSONSource
          id="routes-source"
          data={allRoutesGeoJSON}
          onPress={handleMapRoutePress}
        >
          {/* Unselected routes (thinner, muted) */}
          <Layer
            id="routes-unselected-layer"
            type="line"
            filter={['==', ['get', 'type'], 'route']}
            paint={{
              'line-color': theme.colors.outline_variant,
              'line-width': 4,
              'line-opacity': 0.6,
            }}
            layout={{
              'line-cap': 'round',
              'line-join': 'round',
            }}
          />

          {/* Selected route (thicker, primary color) */}
          <Layer
            id="routes-selected-layer"
            type="line"
            filter={[
              'all',
              ['==', ['get', 'type'], 'route'],
              ['==', ['get', 'id'], selectedRouteId || ''],
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

          {/* Start Marker */}
          <Layer
            id="marker-start-layer"
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

          {/* End Marker */}
          <Layer
            id="marker-end-layer"
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
        </GeoJSONSource>
      </S.StyledOlaMap>

      <MapControlsFABs
        onZoomIn={() => handleZoom(1)}
        onZoomOut={() => handleZoom(-1)}
      />

      <S.StyledLinearGradient
        colors={['transparent', `${theme.colors.surface}40`]}
        pointerEvents="none"
      />
    </S.MapSection>
  );
});

RouteSelectionMap.displayName = 'RouteSelectionMap';
