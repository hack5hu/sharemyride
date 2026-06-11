import React from 'react';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { Location } from '@/store/useLocationStore';
import {
  MiddleStopsList,
  RouteStop,
} from '@/components/organisms/MiddleStopsList';
import { BentoMapPreview } from '@/components/molecules/BentoMapPreview';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Button } from '@/components/atoms/Button';
import * as S from './MiddleStopsTemplate.styles';

export interface MiddleStopsTemplateProps {
  onBackPress: () => void;
  onContinuePress: () => void;
  startLocation: string;
  destination: string;
  middleStops: RouteStop[];
  startLocationRaw?: Location | null;
  destinationLocationRaw?: Location | null;
  middleStopsRaw: Location[];
  onAddStop: () => void;
  onRemoveStop: (id: string) => void;
  // New props for distance texts
  startDistanceText: string;
  destinationDistanceText?: string;
}

export const MiddleStopsTemplate: React.FC<MiddleStopsTemplateProps> = ({
  onBackPress,
  onContinuePress,
  startLocation,
  destination,
  middleStops,
  startLocationRaw,
  destinationLocationRaw,
  middleStopsRaw,
  onAddStop,
  onRemoveStop,
  startDistanceText,
  destinationDistanceText,
}) => {
  const theme = useTheme();
  const { middleStops: t } = useLocale();
  console.log('startDistanceText', startDistanceText);
  console.log('destinationDistanceText', destinationDistanceText);
  return (
    <ScreenShell title={'Add stops'} onBack={onBackPress}>
      <S.ContentLayer showsVerticalScrollIndicator={false}>
        {/* Title */}
        <S.TitleSection>
          <S.TitleText>{t.title}</S.TitleText>
          <S.SubtitleText>{t.subtitle}</S.SubtitleText>
        </S.TitleSection>

        {/* Dynamic Stops List */}
        <MiddleStopsList
          startLocation={startLocation}
          startDistanceText={startDistanceText}
          destination={destination}
          destinationDistanceText={destinationDistanceText}
          middleStops={middleStops}
          onAddStop={onAddStop}
          onRemoveStop={onRemoveStop}
        />

        {/* TODO: will do it later Map Context Item */}
        {/* <BentoMapPreview 
          startLocation={startLocationRaw}
          destinationLocation={destinationLocationRaw}
          middleStops={middleStopsRaw}
        /> */}
      </S.ContentLayer>

      {/* Floating Footer */}
      <S.FixedFooter>
        <Button
          variant="primary"
          icon="arrow-forward"
          iconPosition="right"
          onPress={onContinuePress}
        >
          {t.continue}
        </Button>
      </S.FixedFooter>
    </ScreenShell>
  );
};
