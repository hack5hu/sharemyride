import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { MiddleStopsList, RouteStop } from '@/components/organisms/MiddleStopsList';
import { BentoMapPreview } from '@/components/molecules/BentoMapPreview';
import {
  Container,
  TopHeader,
  HeaderLeft,
  BackButton,
  HeaderTitle,
  StepIndicatorText,
  StepIndicatorSecondary,
  ContentLayer,
  TitleSection,
  TitleText,
  SubtitleText,
  FooterContainer,
  ContinueButton,
  ContinueGradient,
  ContinueButtonText,
} from './MiddleStopsTemplate.styles';

export interface MiddleStopsTemplateProps {
  onBackPress: () => void;
  onContinuePress: () => void;
  startLocation: string;
  destination: string;
  middleStops: RouteStop[];
  onAddStop: () => void;
  onRemoveStop: (id: string) => void;
}

export const MiddleStopsTemplate: React.FC<MiddleStopsTemplateProps> = ({
  onBackPress,
  onContinuePress,
  startLocation,
  destination,
  middleStops,
  onAddStop,
  onRemoveStop,
}) => {
  const theme = useTheme();
  const { middleStops: t } = useLocale();

  return (
    <Container edges={['top']}>
      {/* Header */}
      <TopHeader>
        <HeaderLeft>
          <BackButton onPress={onBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
          </BackButton>
          <HeaderTitle>{t.headerTitle}</HeaderTitle>
        </HeaderLeft>
        <StepIndicatorText>
          3 <StepIndicatorSecondary>/ 9</StepIndicatorSecondary>
        </StepIndicatorText>
      </TopHeader>

      <ContentLayer showsVerticalScrollIndicator={false}>
        {/* Title */}
        <TitleSection>
          <TitleText>{t.title}</TitleText>
          <SubtitleText>{t.subtitle}</SubtitleText>
        </TitleSection>

        {/* Dynamic Stops List */}
        <MiddleStopsList
          startLocation={startLocation}
          destination={destination}
          middleStops={middleStops}
          onAddStop={onAddStop}
          onRemoveStop={onRemoveStop}
        />

        {/* Map Context Item */}
        <BentoMapPreview />
      </ContentLayer>

      {/* Floating Footer */}
      <FooterContainer pointerEvents="box-none">
        <ContinueButton onPress={onContinuePress} activeOpacity={0.95}>
          <ContinueGradient 
            colors={[theme.colors.primary, '#00875a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ContinueButtonText>{t.continue}</ContinueButtonText>
            <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
          </ContinueGradient>
        </ContinueButton>
      </FooterContainer>
    </Container>
  );
};
