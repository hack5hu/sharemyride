import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { OlaMap } from '@/components/organisms/OlaMap';
import { Camera } from '@maplibre/maplibre-react-native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { MapControlsFABs } from '@/components/molecules/MapControlsFABs';
import { LocalRideResultsTemplateProps } from './types';
import * as S from './LocalRideResultsTemplate.styles';
import { mapViewStyle } from './LocalRideResultsTemplate.styles';

export const LocalRideResultsTemplate: React.FC<LocalRideResultsTemplateProps> = React.memo(({
  onBack,
  latitude,
  longitude,
  localServiceAreaLabel,
  requestLocalPartnerLabel,
  onRequestLocalPartner,
  mapChildren,
  onRegionChangeComplete,
  mapRef,
  cameraRef,
  zoom = 14,
  onZoomIn,
  onZoomOut,
}) => {
  const theme = useTheme();

  return (
    <ScreenShell transparent>
      <S.Container>
        <S.MapContainer>
          <OlaMap
            ref={mapRef}
            onRegionDidChange={onRegionChangeComplete}
            style={mapViewStyle}
          >
            <Camera
              ref={cameraRef}
              center={[longitude, latitude]}
              zoom={zoom}
              animationDuration={300}
            />
            {mapChildren}
          </OlaMap>
        </S.MapContainer>

        <S.CenterMarkerContainer pointerEvents="none">
          <MaterialIcons name="location-searching" size={32} color={theme.colors.primary} />
          <S.CenterMarkerPulse />
        </S.CenterMarkerContainer>

        <S.Overlay pointerEvents="box-none">
          <S.BackButtonContainer onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.on_surface} />
          </S.BackButtonContainer>

          <S.InfoCard>
            <S.InfoCardTitle>
              <Typography
                variant="title"
                size="lg"
                weight="bold"
                color={theme.colors.on_surface}
              >
                {localServiceAreaLabel}
              </Typography>
            </S.InfoCardTitle>

            <S.InfoCardSubtitle>
              <Typography
                variant="body"
                size="md"
                weight="medium"
                color={theme.colors.on_surface_variant}
              >
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </Typography>
            </S.InfoCardSubtitle>

            <Button variant="primary" onPress={onRequestLocalPartner}>
              {requestLocalPartnerLabel}
            </Button>
          </S.InfoCard>

          <S.ControlsWrapper>
            <MapControlsFABs onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
          </S.ControlsWrapper>
        </S.Overlay>
      </S.Container>
    </ScreenShell>
  );
});

LocalRideResultsTemplate.displayName = 'LocalRideResultsTemplate';
