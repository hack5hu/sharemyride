import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(18)}px;
  padding: ${moderateScale(18)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  margin-bottom: ${verticalScale(16)}px;
`;

const SectionHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(14)}px;
  letter-spacing: -0.2px;
`;

const StepRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${verticalScale(14)}px;
`;

const StepNumberCircle = styled.View<{ $color: string }>`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ $color }) => $color};
  align-items: center;
  justify-content: center;
  margin-right: ${scale(12)}px;
`;

const StepNumber = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(14)}px;
  color: #FFFFFF;
`;

const StepContent = styled.View`
  flex: 1;
`;

const StepTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(2)}px;
`;

const StepDesc = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(16)}px;
`;

export const HowItWorksCard: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <SectionHeader>{t('rewards.howItWorks')}</SectionHeader>

      <StepRow>
        <StepNumberCircle $color="#0058bc">
          <StepNumber>1</StepNumber>
        </StepNumberCircle>
        <StepContent>
          <StepTitle>{t('rewards.step1Title')}</StepTitle>
          <StepDesc>{t('rewards.step1Desc')}</StepDesc>
        </StepContent>
      </StepRow>

      <StepRow>
        <StepNumberCircle $color="#F59E0B">
          <StepNumber>2</StepNumber>
        </StepNumberCircle>
        <StepContent>
          <StepTitle>{t('rewards.step2Title')}</StepTitle>
          <StepDesc>{t('rewards.step2Desc')}</StepDesc>
        </StepContent>
      </StepRow>

      <StepRow>
        <StepNumberCircle $color="#10B981">
          <StepNumber>3</StepNumber>
        </StepNumberCircle>
        <StepContent>
          <StepTitle>{t('rewards.step3Title')}</StepTitle>
          <StepDesc>{t('rewards.step3Desc')}</StepDesc>
        </StepContent>
      </StepRow>
    </CardContainer>
  );
});

HowItWorksCard.displayName = 'HowItWorksCard';
