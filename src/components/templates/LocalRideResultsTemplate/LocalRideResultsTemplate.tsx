import { Camera } from '@maplibre/maplibre-react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { OlaMap } from '@/components/organisms/OlaMap';
import { RideFiltersModal } from '@/components/organisms/RideFiltersModal';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { LocalRideCarousel } from './components/LocalRideCarousel';
import * as S from './LocalRideResultsTemplate.styles';
import { mapViewStyle } from './LocalRideResultsTemplate.styles';
import { type LocalRideResultsTemplateProps } from './types';

export const LocalRideResultsTemplate: React.FC<LocalRideResultsTemplateProps> =
  React.memo(
    ({
      onBack,
      latitude,
      longitude,
      rides,
      selectedRideId,
      onSelectRide,
      onPressDetails,
      onRequestLocalPartner,
      startAddress,
      destinationAddress,
      mapChildren,
      onRegionChangeComplete,
      mapRef,
      cameraRef,
      onMapLoaded,
      zoom = 14,
      onZoomIn,
      onZoomOut,
      onOpenFilters,
      activeFiltersCount = 0,
      isFilterModalOpen = false,
      onCloseFilters,
      onClearFilters,
      onApplyFilters,
      selectedFilters = [],
    }) => {
      const theme = useTheme();
      const insets = useSafeAreaInsets();
      const { rideFilters: ft } = useLocale();

      const initialCenterRef = React.useRef<[number, number]>([longitude, latitude]);
      const initialZoomRef = React.useRef<number>(zoom);
      const initialViewState = React.useMemo(
        () => ({
          center: initialCenterRef.current,
          zoom: initialZoomRef.current,
        }),
        [],
      );

      return (
        <ScreenShell transparent noPaddingTop noPaddingBottom>
          <S.Container>
            <S.MapContainer>
              <OlaMap
                ref={mapRef}
                onRegionDidChange={onRegionChangeComplete}
                onDidFinishLoadingMap={onMapLoaded}
                onDidFinishLoadingStyle={onMapLoaded}
                style={mapViewStyle}
              >
                <Camera
                  ref={cameraRef}
                  initialViewState={initialViewState}
                  minZoom={8}
                  maxZoom={18}
                />
                {mapChildren}
              </OlaMap>
            </S.MapContainer>

            <S.Overlay pointerEvents="box-none">
              <S.HeaderCard topInset={insets.top} pointerEvents="box-none">
                <S.HeaderIconButton onPress={onBack}>
                  <MaterialIcons
                    name="arrow-back"
                    size={moderateScale(20)}
                    color={theme.colors.on_surface}
                  />
                </S.HeaderIconButton>

                <S.RouteColumn>
                  <S.RouteItemRow>
                    <S.RouteDot color="#10B981" />
                    <Typography
                      variant="label"
                      size="xs"
                      weight="bold"
                      color={theme.colors.on_surface}
                      numberOfLines={1}
                    >
                      {startAddress || 'Pickup'}
                    </Typography>
                  </S.RouteItemRow>
                  <S.RouteItemDivider />
                  <S.RouteItemRow>
                    <S.RouteDot color={theme.colors.error} />
                    <Typography
                      variant="label"
                      size="xs"
                      weight="bold"
                      color={theme.colors.on_surface_variant}
                      numberOfLines={1}
                    >
                      {destinationAddress || 'Dropoff'}
                    </Typography>
                  </S.RouteItemRow>
                </S.RouteColumn>

                {onOpenFilters && (
                  <S.HeaderIconButton
                    onPress={onOpenFilters}
                    hasActiveFilters={activeFiltersCount > 0}
                  >
                    <MaterialIcons
                      name="tune"
                      size={moderateScale(19)}
                      color={
                        activeFiltersCount > 0
                          ? theme.colors.primary
                          : theme.colors.on_surface
                      }
                    />
                    {activeFiltersCount > 0 && <S.ActiveFilterDot />}
                  </S.HeaderIconButton>
                )}
              </S.HeaderCard>

              <S.ControlsWrapper bottomInset={insets.bottom}>
                <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
              </S.ControlsWrapper>

              <LocalRideCarousel
                rides={rides}
                selectedRideId={selectedRideId}
                onSelectRide={onSelectRide}
                onPressDetails={onPressDetails}
                onRequestPartner={onRequestLocalPartner}
                bottomInset={insets.bottom}
              />
            </S.Overlay>

            <RideFiltersModal
              isOpen={isFilterModalOpen}
              onClose={onCloseFilters || (() => {})}
              onClear={onClearFilters || (() => {})}
              onApply={onApplyFilters || (() => {})}
              selectedFilters={selectedFilters}
              t={ft}
            />
          </S.Container>
        </ScreenShell>
      );
    },
  );

LocalRideResultsTemplate.displayName = 'LocalRideResultsTemplate';
