import React from 'react';
import { Keyboard } from 'react-native';
import { useTheme } from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '@/constants/localization';
import { Location } from '@/store/useLocationStore';
import {
  MiddleStopSearchOverlay,
  LocationOption,
} from '@/components/organisms/MiddleStopSearchOverlay';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { SnapResult } from '@/utils/routeSnap';
import * as S from './MiddleStopMapTemplate.styles';
import { StopConfirmCard } from './components/StopConfirmCard';
import { StopSelectionPin } from './components/StopSelectionPin';
import { MapLayerSection } from './components/MapLayerSection';
import { moderateScale } from '@/styles';

export interface MiddleStopMapTemplateProps {
  isSearching: boolean;
  isLoading: boolean;
  isReverseGeocoding?: boolean;
  isMoving: boolean;
  searchQuery: string;
  searchResults: LocationOption[];
  selectedLocation: LocationOption | null;
  snapResult: SnapResult | null;
  canConfirm: boolean;
  routeTitle: string;
  distanceText: string;
  stopsCount: number;
  history: Location[];
  initialCenter: [number, number];
  routeGeoJSON: GeoJSON.FeatureCollection | null;
  connectorGeoJSON: GeoJSON.FeatureCollection | null;
  routeBounds: [number, number, number, number];
  routeCoordinates: [number, number][];
  mapRef: React.RefObject<unknown>;
  cameraRef: React.RefObject<unknown>;
  startLocation: Location | null;
  destinationLocation: Location | null;
  onBackPress: () => void;
  onSearchPress: () => void;
  onChangeSearch: (query: string) => void;
  onSelectLocation: (loc: LocationOption) => void;
  onSelectHistory: (loc: Location) => void;
  onConfirm: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onRegionWillChange?: () => void;
  onRegionIsChanging?: (event: unknown) => void;
  onRegionChangeComplete?: (viewState: unknown) => void;
  onMapPress?: (feature: unknown) => void;
  isMapMounted: boolean;
}

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
      distanceText,
      history,
      initialCenter,
      routeGeoJSON,
      connectorGeoJSON,
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

      const isWarning = snapResult ? !snapResult.isWithinThreshold : false;

      return (
        <ScreenShell title={t.headerTitle} onBack={onBackPress} noPaddingBottom>
          <S.ContentArea>
            <MapLayerSection
              isSearching={isSearching}
              isMapMounted={isMapMounted}
              mapRef={mapRef}
              cameraRef={cameraRef}
              initialCenter={initialCenter}
              routeGeoJSON={routeGeoJSON}
              connectorGeoJSON={connectorGeoJSON}
              startLocation={startLocation}
              destinationLocation={destinationLocation}
              snapResult={snapResult}
              isWarning={isWarning}
              onMapPress={onMapPress}
              onRegionWillChange={onRegionWillChange}
              onRegionIsChanging={onRegionIsChanging}
              onRegionChangeComplete={onRegionChangeComplete}
            />

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
                <StopSelectionPin
                  isMoving={isMoving}
                  tooltipText={t.confirmStop}
                />

                <S.MapGradientOverlay />

                <S.FloatingSearchBar
                  onPress={onSearchPress}
                  activeOpacity={0.8}
                >
                  <S.SearchIconBox>
                    <MaterialIcons
                      name="search"
                      size={14}
                      color={theme.colors.on_primary}
                    />
                  </S.SearchIconBox>
                  <S.FloatingSearchText>
                    {t.searchPlaceholder}
                  </S.FloatingSearchText>
                </S.FloatingSearchBar>

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

                <MapControlsFABs
                  onZoomIn={() => {
                    Keyboard.dismiss();
                    onZoomIn?.();
                  }}
                  onZoomOut={() => {
                    Keyboard.dismiss();
                    onZoomOut?.();
                  }}
                />

                {selectedLocation && (
                  <StopConfirmCard
                    selectedLocation={selectedLocation}
                    isReverseGeocoding={isReverseGeocoding}
                    snapResult={snapResult}
                    isWarning={isWarning}
                    distanceText={distanceText}
                    onConfirm={onConfirm}
                    canConfirm={canConfirm}
                    t={t}
                  />
                )}
              </>
            )}
          </S.ContentArea>
        </ScreenShell>
      );
    },
  );

MiddleStopMapTemplate.displayName = 'MiddleStopMapTemplate';
