import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  Container,
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
} from './PublishSuccess.styles';

export const PublishSuccessScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { publishSuccess: t } = useLocale();

  const handleGoToMyRides = () => {
    navigation.navigate('ChatList' as any);
  };

  const handleShareResult = () => {
    // Share functionality
  };

  return (
    <Container edges={['top', 'bottom']}>
      <MainContent>
        <SuccessIconWrapper>
          <MaterialIcons name="check" size={moderateScale(56)} color={theme.colors.on_primary} />
        </SuccessIconWrapper>

        <Title>{t.title}</Title>
        <Subtitle>{t.subtitle}</Subtitle>

        <InfoCard>
          <InfoHeader>
            <MaterialIcons name="security" size={moderateScale(20)} color={theme.colors.primary} />
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
            <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
          </PrimaryGradient>
        </PrimaryButton>

        <SecondaryButton onPress={handleShareResult} activeOpacity={0.7}>
          <SecondaryButtonText>{t.secondaryCTA}</SecondaryButtonText>
        </SecondaryButton>
      </ActionArea>
    </Container>
  );
};
