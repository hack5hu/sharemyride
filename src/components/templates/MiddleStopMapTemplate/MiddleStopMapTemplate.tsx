import React, { useMemo, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale, verticalScale } from '@/styles';
import { Location } from '@/store/useLocationStore';
import {
  OlaMap,
  Camera,
  GeoJSONSource,
  Layer,
  Marker,
} from '@/components/organisms/OlaMap';
import {
  MiddleStopSearchOverlay,
  LocationOption,
} from '@/components/organisms/MiddleStopSearchOverlay';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/atoms/Button';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { SnapResult } from '@/utils/routeSnap';
import * as S from './MiddleStopMapTemplate.styles';

export interface MiddleStopMapTemplateProps {
  // State
  isSearching: boolean;
  isLoading: boolean;
  isReverseGeocoding?: boolean;
  isMoving: boolean;
  searchQuery: string;
  searchResults: LocationOption[];
  selectedLocation: LocationOption | null;
  snapResult: SnapResult | null;
  canConfirm: boolean;

  // Display
  routeTitle: string;
  distanceText: string;
  stopsCount: number;
  history: Location[];
  initialCenter: [number, number];

  // GeoJSON
  routeGeoJSON: GeoJSON.FeatureCollection | null;
  connectorGeoJSON: GeoJSON.FeatureCollection | null;
  routeBounds: [number, number, number, number];
  routeCoordinates: [number, number][];

  // Refs
  mapRef: React.RefObject<any>;
  cameraRef: React.RefObject<any>;

  // Markers
  startLocation: Location | null;
  destinationLocation: Location | null;

  // Handlers
  onBackPress: () => void;
  onSearchPress: () => void;
  onChangeSearch: (query: string) => void;
  onSelectLocation: (loc: LocationOption) => void;
  onSelectHistory: (loc: Location) => void;
  onConfirm: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onRegionWillChange?: () => void;
  onRegionIsChanging?: (event: any) => void;
  onRegionChangeComplete?: (viewState: any) => void;
  onMapPress?: (feature: any) => void;
  isMapMounted: boolean;
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

export const MiddleStopMapTemplate: React.FC<MiddleStopMapTemplateProps> =
  React.memo(
    ({
      isSearching,
      isLoading,
      isReverseGeocoding,
      isMoving,
      searchQuery,
      searchResults,
      selectedLocation,
      snapResult,
      canConfirm,
      routeTitle,
      distanceText,
      stopsCount,
      history,
      initialCenter,
      routeGeoJSON,
      connectorGeoJSON,
      routeBounds,
      routeCoordinates,
      mapRef,
      cameraRef,
      startLocation,
      destinationLocation,
      onBackPress,
      onSearchPress,
      onChangeSearch,
      onSelectLocation,
      onSelectHistory,
      onConfirm,
      onZoomIn,
      onZoomOut,
      onRegionWillChange,
      onRegionIsChanging,
      onRegionChangeComplete,
      onMapPress,
      isMapMounted,
    }) => {
      const theme = useTheme();
      const { middleStopMap: t } = useLocale();
      const insets = useSafeAreaInsets();

      const isWarning = snapResult ? !snapResult.isWithinThreshold : false;

      const pinAnim = useRef(new Animated.Value(0)).current;

      useEffect(() => {
        Animated.spring(pinAnim, {
          toValue: isMoving ? 1 : 0,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }).start();
      }, [isMoving, pinAnim]);

      const pinTranslateY = pinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -verticalScale(20)],
      });

      const pinScale = pinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
      });

      const shadowOpacity = pinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.3],
      });

      const shadowScale = pinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.6],
      });

      return (
        <ScreenShell title={t.headerTitle} onBack={onBackPress}>
          <S.ContentArea>
            {/* Map Layer - Always mounted to prevent camera race conditions */}
            <S.MapLayer pointerEvents={isSearching ? 'none' : 'auto'}>
              {isMapMounted && (
                <OlaMap
                  ref={mapRef}
                  onPress={onMapPress}
                  onRegionWillChange={onRegionWillChange}
                  onRegionIsChanging={onRegionIsChanging}
                  onRegionDidChange={onRegionChangeComplete}
                  style={{ flex: 1, width: '100%', height: '100%' }}
                >
                  <Camera ref={cameraRef} center={initialCenter} zoom={14} />

                  {/* Main route polyline */}
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

                  {/* Dashed connector line */}
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

                  {/* Start marker */}
                  {startLocation && (
                    <Marker
                      lngLat={[startLocation.longitude, startLocation.latitude]}
                    >
                      <S.MarkerDotOuter color={theme.colors.primary}>
                        <S.MarkerDot color={theme.colors.primary} size={10} />
                      </S.MarkerDotOuter>
                    </Marker>
                  )}

                  {/* Destination marker */}
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

                  {/* Snapped point on route */}
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
                </OlaMap>
              )}
            </S.MapLayer>

            {/* Search mode overlay */}
            {isSearching && (
              <S.SearchOverlayLayer>
                <MiddleStopSearchOverlay
                  searchQuery={searchQuery}
                  onChangeSearch={onChangeSearch}
                  suggestedLocations={searchResults}
                  recentHistory={history}
                  onSelectLocation={onSelectLocation}
                  onSelectHistory={onSelectHistory}
                  isLoading={isLoading}
                />
              </S.SearchOverlayLayer>
            )}

            {!isSearching && (
              <>
                {/* Centered Map Pin Selection Overlay */}
                <S.PinContainer pointerEvents="none">
                  <S.PinWrapper
                    as={Animated.View}
                    style={{
                      transform: [
                        { translateY: pinTranslateY },
                        { scale: pinScale },
                      ],
                    }}
                  >
                    <S.TooltipBubble
                      as={Animated.View}
                      style={{
                        opacity: pinAnim.interpolate({
                          inputRange: [0, 0.2, 1],
                          outputRange: [1, 0, 0],
                        }),
                      }}
                    >
                      <S.TooltipText>{t.confirmStop}</S.TooltipText>
                    </S.TooltipBubble>

                    <MaterialIcons
                      name="place"
                      size={moderateScale(32)}
                      color={theme.colors.primary}
                    />
                    <S.PinShadow
                      as={Animated.View}
                      style={{
                        opacity: shadowOpacity,
                        transform: [{ scale: shadowScale }],
                      }}
                    />
                  </S.PinWrapper>
                </S.PinContainer>

                {/* Gradient overlay */}
                <S.MapGradientOverlay />

                {/* Floating search bar on map */}
                <S.FloatingSearchBar
                  onPress={onSearchPress}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name="search"
                    size={moderateScale(22)}
                    color={theme.colors.primary}
                  />
                  <S.FloatingSearchText>
                    {t.searchPlaceholder}
                  </S.FloatingSearchText>
                </S.FloatingSearchBar>

                {/* Permanent Warning Banner if too far from route */}
                {isWarning && (
                  <S.WarningBanner>
                    <MaterialIcons
                      name="warning"
                      size={moderateScale(20)}
                      color={theme.colors.error}
                    />
                    <S.WarningContent>
                      <S.WarningTitle>{t.tooFarFromRoute}</S.WarningTitle>
                      <S.WarningDescription>
                        {t.tooFarFromRouteMsg}
                      </S.WarningDescription>
                    </S.WarningContent>
                  </S.WarningBanner>
                )}

                {/* Map controls */}
                <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />

                {/* Bottom card with stop info + confirm */}
                {selectedLocation && (
                  <S.BottomCard
                    style={{ paddingBottom: Math.max(insets.bottom + 16, 32) }}
                  >
                    <S.BottomGradient />

                    <S.StopInfoCard>
                      <S.StopInfoRow>
                        <S.StopInfoLeft>
                          <S.StopNameText numberOfLines={1}>
                            {isReverseGeocoding
                              ? 'Locating...'
                              : selectedLocation.name}
                          </S.StopNameText>
                          {!!(
                            isReverseGeocoding || selectedLocation.address
                          ) && (
                            <S.StopAddressText numberOfLines={1}>
                              {isReverseGeocoding
                                ? 'Please wait...'
                                : selectedLocation.address}
                            </S.StopAddressText>
                          )}
                        </S.StopInfoLeft>

                        {!isReverseGeocoding && snapResult && (
                          <S.DistancePill isWarning={isWarning}>
                            <MaterialIcons
                              name={isWarning ? 'warning' : 'near-me'}
                              size={moderateScale(12)}
                              color={
                                isWarning
                                  ? theme.colors.error
                                  : theme.colors.primary
                              }
                            />
                            <S.DistancePillText isWarning={isWarning}>
                              {distanceText}
                            </S.DistancePillText>
                          </S.DistancePill>
                        )}
                      </S.StopInfoRow>
                    </S.StopInfoCard>

                    <Button
                      onPress={onConfirm}
                      disabled={!canConfirm || isReverseGeocoding}
                      icon="add-location-alt"
                      iconPosition="left"
                    >
                      {t.confirmStop}
                    </Button>
                  </S.BottomCard>
                )}
              </>
            )}
          </S.ContentArea>
        </ScreenShell>
      );
    },
  );

MiddleStopMapTemplate.displayName = 'MiddleStopMapTemplate';
