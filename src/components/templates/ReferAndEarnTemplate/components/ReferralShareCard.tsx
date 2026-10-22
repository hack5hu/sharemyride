import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

interface ReferralShareCardProps {
  referralCode: string;
  onCopyCode: () => void;
  onShareWhatsApp: () => void;
  onShareOther: () => void;
}

const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(18)}px;
  padding: ${moderateScale(18)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  margin-bottom: ${verticalScale(18)}px;
`;

const CodeLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  text-align: center;
  margin-bottom: ${verticalScale(10)}px;
`;

const CodeRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1.5px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(12)}px;
  padding-horizontal: ${scale(14)}px;
  padding-vertical: ${verticalScale(10)}px;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(0, 88, 188, 0.12)' : '#F0F7FF'};
  margin-bottom: ${verticalScale(16)}px;
`;

const CodeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1.5px;
`;

const CopyButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(8)}px;
`;

const CopyButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: #FFFFFF;
  margin-left: ${scale(4)}px;
`;

const WhatsAppButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #25D366;
  border-radius: ${moderateScale(12)}px;
  padding-vertical: ${verticalScale(13)}px;
  margin-bottom: ${verticalScale(10)}px;
`;

const WhatsAppButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(14)}px;
  color: #FFFFFF;
  margin-left: ${scale(8)}px;
`;

const OtherShareButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(12)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
`;

const OtherShareButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-left: ${scale(8)}px;
`;

export const ReferralShareCard: React.FC<ReferralShareCardProps> = memo(
  ({ referralCode, onCopyCode, onShareWhatsApp, onShareOther }) => {
    const { t } = useTranslation();

    return (
      <CardContainer>
        <CodeLabel>{t('rewards.yourReferralCode')}</CodeLabel>

        <CodeRow>
          <CodeText>{referralCode}</CodeText>
          <CopyButton onPress={onCopyCode} accessibilityRole="button">
            <Icon name="content-copy" size={moderateScale(14)} color="#FFFFFF" />
            <CopyButtonText>{t('rewards.copyCode')}</CopyButtonText>
          </CopyButton>
        </CodeRow>

        <WhatsAppButton onPress={onShareWhatsApp} accessibilityRole="button">
          <Icon name="chat" size={moderateScale(20)} color="#FFFFFF" />
          <WhatsAppButtonText>{t('rewards.shareOnWhatsApp')}</WhatsAppButtonText>
        </WhatsAppButton>

        <OtherShareButton onPress={onShareOther} accessibilityRole="button">
          <Icon name="share" size={moderateScale(18)} color="#475569" />
          <OtherShareButtonText>{t('rewards.shareViaOther')}</OtherShareButtonText>
        </OtherShareButton>
      </CardContainer>
    );
  },
);

ReferralShareCard.displayName = 'ReferralShareCard';
