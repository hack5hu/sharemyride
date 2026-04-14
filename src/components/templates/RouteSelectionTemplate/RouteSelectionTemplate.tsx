import React, { useRef, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { RouteOption, RouteCard } from '@/components/organisms/RouteCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Camera, GeoJSONSource, Layer, CameraRef } from '@maplibre/maplibre-react-native';
import { OlaMap } from '@/components/organisms/OlaMap';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import LinearGradient from 'react-native-linear-gradient';
import * as S from './RouteSelectionTemplate.styles';
import { RouteData } from '@/screens/PublishFlow/2_RouteSelection/useRouteSelection';


export interface RouteSelectionTemplateProps {
  onBackPress: () => void;
  onContinuePress: () => void;
  routes: RouteOption[];
  routesData: RouteData[];
  selectedRouteId: string | null;
  onSelectRoute: (id: string) => void;
  isLoading?: boolean;
}

export const RouteSelectionTemplate: React.FC<RouteSelectionTemplateProps> = ({
  onBackPress,
  onContinuePress,
  routes,
  routesData,
  selectedRouteId,
  onSelectRoute,
  isLoading,
}) => {
  const theme = useTheme();
  const { routeSelection } = useLocale();
  const cameraRef = useRef<CameraRef>(null);

  const selectedRouteData = routesData.find(r => r.uiData.id === selectedRouteId);

  useEffect(() => {
    if (selectedRouteData && cameraRef.current) {
      const [minLng, minLat, maxLng, maxLat] = selectedRouteData.bounds;
      cameraRef.current.fitBounds(
        [minLng, minLat, maxLng, maxLat],
        {
          padding: { top: 48, right: 48, bottom: 48, left: 48 },
          duration: 500
        }
      );
    }
  }, [selectedRouteId, selectedRouteData]);

  const zoomRef = useRef(14);

  const handleRegionDidChange = (event: any) => {
    const currentZoom = event?.nativeEvent?.zoom || event?.zoom;
    if (currentZoom !== undefined) {
      zoomRef.current = currentZoom;
    }
  };

  const handleZoom = (increment: number) => {
    const newZoom = Math.min(Math.max(zoomRef.current + increment, 3), 20);
    zoomRef.current = newZoom;
    cameraRef.current?.setStop({
      zoom: newZoom,
      duration: 300,
    });
  };

  const allRoutesGeoJSON: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: routesData.map(routeData => ({
      type: 'Feature',
      id: routeData.uiData.id,
      properties: {
        id: routeData.uiData.id,
      },
      geometry: {
        type: 'LineString',
        coordinates: routeData.coordinates,
      },
    })),
  };

  const handleMapRoutePress = (event: any) => {
    const feature = event?.features?.[0];
    if (feature?.properties?.id) {
      onSelectRoute(feature.properties.id);
    }
  };

  return (
    <ScreenShell
      title={"Select Route"}
      onBack={true}
    >
      <View style={{ flex: 1 }}>
        <S.MapSection>
          <OlaMap
            style={{ flex: 1 }}
            onRegionDidChange={handleRegionDidChange}
          >
            <Camera ref={cameraRef} />

            <GeoJSONSource
              id="routes-source"
              data={allRoutesGeoJSON}
              onPress={handleMapRoutePress}
            >
              {/* Unselected routes (thinner, muted) */}
              <Layer
                id="routes-unselected-layer"
                type="line"
                filter={['!=', ['get', 'id'], selectedRouteId || '']}
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
                filter={['==', ['get', 'id'], selectedRouteId || '']}
                paint={{
                  'line-color': theme.colors.primary,
                  'line-width': 6,
                }}
                layout={{
                  'line-cap': 'round',
                  'line-join': 'round',
                }}
              />
            </GeoJSONSource>
          </OlaMap>

          <View style={{ position: 'absolute', right: moderateScale(16), bottom: moderateScale(16), zIndex: 10 }}>
            <MapControlsFABs
              onZoomIn={() => handleZoom(1)}
              onZoomOut={() => handleZoom(-1)}
            />
          </View>

          <LinearGradient
            colors={['transparent', `${theme.colors.surface}40`]}
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: moderateScale(40)
            }}
          />
        </S.MapSection>

        <S.ContentLayer showsVerticalScrollIndicator={false}>
          <S.RouteWrapper>
            {selectedRouteData && (
              <S.SelectedRouteBadge>
                <S.SelectedRouteText>{selectedRouteData.uiData.title}</S.SelectedRouteText>
              </S.SelectedRouteBadge>
            )}
            <S.ContentHeader>
              <S.ContentTitle>{routeSelection.title}</S.ContentTitle>
              <S.ContentSubtitle>{routeSelection.subtitle}</S.ContentSubtitle>
            </S.ContentHeader>

            {isLoading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: moderateScale(40) }} />
            ) : (
              routes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  isActive={route.id === selectedRouteId}
                  onPress={() => onSelectRoute(route.id)}
                />
              ))
            )}

            {/* <S.TrustBadge>
              <MaterialIcons name="verified-user" size={moderateScale(24)} color={theme.colors.primary} />
              <S.TrustBadgeText>{routeSelection.trustBadge}</S.TrustBadgeText>
            </S.TrustBadge> */}
          </S.RouteWrapper>
        </S.ContentLayer>
      </View>

      <S.FooterGradient
        colors={['transparent', `${theme.colors.surface}F2`, theme.colors.surface]}
        pointerEvents="box-none"
      >
        <S.ContinueButton onPress={onContinuePress} activeOpacity={0.8} disabled={!selectedRouteId}>
          <S.ContinueGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ opacity: selectedRouteId ? 1 : 0.6 }}
          >
            <S.ContinueButtonText>{routeSelection.continue}</S.ContinueButtonText>
            <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
          </S.ContinueGradient>
        </S.ContinueButton>
      </S.FooterGradient>
    </ScreenShell>
  );
};
