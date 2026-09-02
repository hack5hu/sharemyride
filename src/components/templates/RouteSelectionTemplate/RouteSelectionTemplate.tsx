import { type CameraRef } from '@maplibre/maplibre-react-native';
import React, { useRef, useEffect } from 'react';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { FixedFooter } from '@/components/molecules/FixedFooter';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { type RouteOption, RouteCard } from '@/components/organisms/RouteCard';
import { useLocale } from '@/constants/localization';
import { type RouteData } from '@/screens/PublishFlow/2_RouteSelection/useRouteSelection';
import { RouteSelectionMap } from './components/RouteSelectionMap';
import * as S from './RouteSelectionTemplate.styles';

export interface RouteSelectionTemplateProps {
  onBackPress: () => void;
  onContinuePress: () => void;
  routes: RouteOption[];
  routesData: RouteData[];
  selectedRouteId: string | null;
  onSelectRoute: (id: string) => void;
  isLoading?: boolean;
}

export const RouteSelectionTemplate: React.FC<RouteSelectionTemplateProps> =
  React.memo(
    ({
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

      const [mapLoadedTrigger, setMapLoadedTrigger] = React.useState(0);

      const handleMapLoadedTrigger = React.useCallback(() => {
        setMapLoadedTrigger(prev => prev + 1);
      }, []);

      const selectedRouteData = React.useMemo(() => {
        return routesData.find(r => r.uiData.id === selectedRouteId);
      }, [routesData, selectedRouteId]);

      useEffect(() => {
        if (selectedRouteData && cameraRef.current) {
          const timer = setTimeout(() => {
            if (cameraRef.current) {
              const [minLng, minLat, maxLng, maxLat] = selectedRouteData.bounds;
              cameraRef.current.fitBounds([minLng, minLat, maxLng, maxLat], {
                padding: { top: 48, right: 48, bottom: 48, left: 48 },
                duration: 500,
              });
            }
          }, 150);

          return () => clearTimeout(timer);
        }
      }, [selectedRouteId, selectedRouteData, mapLoadedTrigger]);

      const zoomRef = useRef(14);

      const handleRegionDidChange = React.useCallback((event: any) => {
        const currentZoom = event?.nativeEvent?.zoom || event?.zoom;
        if (currentZoom !== undefined) {
          zoomRef.current = currentZoom;
        }
      }, []);

      const handleZoom = React.useCallback((increment: number) => {
        const newZoom = Math.min(Math.max(zoomRef.current + increment, 3), 20);
        zoomRef.current = newZoom;
        cameraRef.current?.setStop({
          zoom: newZoom,
          duration: 300,
        });
      }, []);

      return (
        <ScreenShell noPaddingBottom title="Select Route" onBack={onBackPress}>
          <S.Root>
            <RouteSelectionMap
              cameraRef={cameraRef}
              routesData={routesData}
              selectedRouteId={selectedRouteId}
              onSelectRoute={onSelectRoute}
              onMapLoadedTrigger={handleMapLoadedTrigger}
              handleRegionDidChange={handleRegionDidChange}
              handleZoom={handleZoom}
            />

            <S.ContentLayer showsVerticalScrollIndicator={false}>
              <S.RouteWrapper>
                {selectedRouteData && (
                  <S.SelectedRouteBadge>
                    <S.SelectedRouteText>
                      {selectedRouteData.uiData.title}
                    </S.SelectedRouteText>
                  </S.SelectedRouteBadge>
                )}
                <S.ContentHeader>
                  <S.ContentTitle>{routeSelection.title}</S.ContentTitle>
                  <S.ContentSubtitle>
                    {routeSelection.subtitle}
                  </S.ContentSubtitle>
                </S.ContentHeader>

                {isLoading ? (
                  <S.LoaderIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                ) : (
                  routes.map(route => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      isActive={route.id === selectedRouteId}
                      onPress={() => onSelectRoute(route.id)}
                    />
                  ))
                )}
              </S.RouteWrapper>
            </S.ContentLayer>
          </S.Root>

          <FixedFooter>
            <Button
              variant="primary"
              icon="arrow-forward"
              iconPosition="right"
              disabled={!selectedRouteId}
              onPress={onContinuePress}
            >
              {routeSelection.continue}
            </Button>
          </FixedFooter>
        </ScreenShell>
      );
    },
  );

RouteSelectionTemplate.displayName = 'RouteSelectionTemplate';
