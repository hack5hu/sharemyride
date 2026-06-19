import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '@/styles';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { PublishSuccessTemplateProps } from './types.d';
import {
  MainContent,
  SuccessIconWrapper,
  Title,
  Subtitle,
  InfoCard,
  InfoHeader,
  InfoTitle,
  InfoText,
  ActionArea,
  PrimaryButton,
  PrimaryGradient,
  PrimaryButtonText,
  SecondaryButton,
  SecondaryButtonText,
} from './PublishSuccessTemplate.styles';

export const PublishSuccessTemplate: React.FC<PublishSuccessTemplateProps> = ({
  handleGoToMyRides,
  handleShareResult,
  t,
  theme,
}) => {
  return (
    <ScreenShell>
      <MainContent>
        <SuccessIconWrapper>
          <MaterialIcons
            name="check"
            size={moderateScale(56)}
            color={theme.colors.on_primary}
          />
        </SuccessIconWrapper>

        <Title>{t.title}</Title>
        <Subtitle>{t.subtitle}</Subtitle>

        <InfoCard>
          <InfoHeader>
            <MaterialIcons
              name="security"
              size={moderateScale(20)}
              color={theme.colors.primary}
            />
            <InfoTitle>{t.infoTitle}</InfoTitle>
          </InfoHeader>
          <InfoText>{t.infoText}</InfoText>
        </InfoCard>
      </MainContent>

      <ActionArea>
        <PrimaryButton onPress={handleGoToMyRides} activeOpacity={0.9}>
          <PrimaryGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <PrimaryButtonText>{t.primaryCTA}</PrimaryButtonText>
            <MaterialIcons
              name="arrow-forward"
              size={moderateScale(20)}
              color={theme.colors.on_primary}
            />
          </PrimaryGradient>
        </PrimaryButton>

        <SecondaryButton onPress={handleShareResult} activeOpacity={0.7}>
          <SecondaryButtonText>{t.secondaryCTA}</SecondaryButtonText>
        </SecondaryButton>
      </ActionArea>
    </ScreenShell>
  );
};
