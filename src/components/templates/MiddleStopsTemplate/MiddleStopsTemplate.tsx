import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { Location } from '@/store/useLocationStore';
import { MiddleStopsList, RouteStop } from '@/components/organisms/MiddleStopsList';
import { BentoMapPreview } from '@/components/molecules/BentoMapPreview';
import { ScreenShell } from '@/components/molecules/ScreenShell';
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
}) => {
  const theme = useTheme();
  const { middleStops: t } = useLocale();

  return (
    <ScreenShell
      title={"Add stops"}
      onBack
    >
      <S.ContentLayer showsVerticalScrollIndicator={false}>
        {/* Title */}
        <S.TitleSection>
          <S.TitleText>{t.title}</S.TitleText>
          <S.SubtitleText>{t.subtitle}</S.SubtitleText>
        </S.TitleSection>

        {/* Dynamic Stops List */}
        <MiddleStopsList
          startLocation={startLocation}
          destination={destination}
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
      <S.FooterContainer pointerEvents="box-none">
        <S.ContinueButton onPress={onContinuePress} activeOpacity={0.95}>
          <S.ContinueGradient 
            colors={[theme.colors.primary, '#00875a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <S.ContinueButtonText>{t.continue}</S.ContinueButtonText>
            <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
          </S.ContinueGradient>
        </S.ContinueButton>
      </S.FooterContainer>
    </ScreenShell>
  );
};
