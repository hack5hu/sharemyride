import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { OtpInput } from '../../../components/molecules/OtpInput';
import { Toast } from '../../../components/molecules/Toast';
import { useOTPVerification } from './useOTPVerification';
import { OTPVerificationProps } from './types';
import { useLocale } from '../../../constants/localization';
import {
  KeyboardContainer,
  ScrollContainer,
  BackgroundBlob,
  IconContainer,
  Subtitle,
  PhoneRow,
  PhoneText,
  VerifyButton,
  VerifyButtonText,
  ResendContainer,
  ResendHintText,
  ResendActionRow,
  ResendActionText,
  LinksRow,
  LinkText,
  DotSeparator,
} from './OTPVerification.styles';

export const OTPVerificationScreen: React.FC<OTPVerificationProps> = ({
  phoneNumber: propPhoneNumber,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [toastConfig, setToastConfig] = React.useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  }>({ isVisible: false, type: 'info', message: '' });

  const {
    timer,
    loading,
    otpValue,
    handleTextChange,
    handleVerify,
    handleResend,
    phoneNumber: dynamicPhoneNumber,
  } = useOTPVerification();

  const hideToast = () => setToastConfig({ ...toastConfig, isVisible: false });

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  const { otpVerification: t } = useLocale();

  const isButtonDisabled = otpValue.length < 6 || loading;

  return (
    <ScreenShell
      title={t.screenName}
      onBack={() => navigation.goBack()}
    >
      <Toast
        type={toastConfig.type}
        message={toastConfig.message}
        isVisible={toastConfig.isVisible}
        onHide={hideToast}
      />
      <KeyboardContainer>
        <ScrollContainer>
          <BackgroundBlob />

          <IconContainer>
            <Icon
              name="verified-user"
              size={28}
              color={theme.colors.on_primary}
            />
          </IconContainer>

          <Subtitle>{t.subtitle}</Subtitle>

          <PhoneRow>
            <PhoneText>+91 {dynamicPhoneNumber || propPhoneNumber}</PhoneText>
          </PhoneRow>

          <OtpInput
            length={6}
            onTextChange={handleTextChange}
            onFilled={handleVerify}
            error={false}
          />

          <VerifyButton
            onPress={() => handleVerify(otpValue)}
            activeOpacity={0.8}
            disabled={isButtonDisabled}
          >
            <VerifyButtonText>
              {loading ? t.verifyingButton : t.verifyButton}
            </VerifyButtonText>
          </VerifyButton>

          <ResendContainer>
            <ResendHintText>{t.didNotReceive}</ResendHintText>
            <ResendActionRow>
              <Icon
                name="replay"
                size={16}
                color={
                  timer === 0
                    ? theme.colors.primary
                    : theme.colors.on_surface_variant
                }
              />
              <ResendActionText
                active={timer === 0}
                onPress={timer === 0 ? handleResend : undefined}
                suppressHighlighting
              >
                {timer === 0 ? t.resendNow : `${t.resendIn} ${formattedTimer}`}
              </ResendActionText>
            </ResendActionRow>
          </ResendContainer>
        </ScrollContainer>
      </KeyboardContainer>
      <LinksRow
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <LinkText>{t.privacyPolicy}</LinkText>
        <DotSeparator />
        <LinkText>{t.supportCenter}</LinkText>
      </LinksRow>
    </ScreenShell>
  );
};
