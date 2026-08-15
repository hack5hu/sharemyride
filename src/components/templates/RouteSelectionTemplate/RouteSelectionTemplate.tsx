import React, { useRef, useEffect } from 'react';

import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { RouteOption, RouteCard } from '@/components/organisms/RouteCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Button } from '@/components/atoms/Button';
import { FixedFooter } from '@/components/molecules/FixedFooter';
import * as S from './RouteSelectionTemplate.styles';
import { RouteData } from '@/screens/PublishFlow/2_RouteSelection/useRouteSelection';
import { RouteSelectionMap } from './components/RouteSelectionMap';

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
      const cameraRef = useRef<any>(null);

      const [isMapLoaded, setIsMapLoaded] = React.useState(false);

      const selectedRouteData = React.useMemo(() => {
        return routesData.find(r => r.uiData.id === selectedRouteId);
      }, [routesData, selectedRouteId]);

      useEffect(() => {
        if (selectedRouteData && cameraRef.current && isMapLoaded) {
          const timer = setTimeout(() => {
            if (cameraRef.current) {
              const [minLng, minLat, maxLng, maxLat] = selectedRouteData.bounds;
              cameraRef.current.fitBounds([minLng, minLat, maxLng, maxLat], {
                padding: { top: 48, right: 48, bottom: 48, left: 48 },
                duration: 500,
              });
            }
          }, 100);
          return () => clearTimeout(timer);
        }
      }, [selectedRouteId, selectedRouteData, isMapLoaded]);

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
              isMapLoaded={isMapLoaded}
              setIsMapLoaded={setIsMapLoaded}
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
