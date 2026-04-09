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
  Title,
  Subtitle,
  PhoneRow,
  PhoneText,
  EditButton,
  VerifyButton,
  VerifyButtonText,
  ResendContainer,
  ResendHintText,
  ResendActionRow,
  ResendActionText,
  FooterContainer,
  SupportRow,
  AvatarImage,
  SupportTextCol,
  SupportLabel,
  SupportSub,
  LinksRow,
  LinkText,
  DotSeparator,
} from './OTPVerification.styles';

export const OTPVerificationScreen: React.FC<OTPVerificationProps> = ({
  phoneNumber = '+1 (555) 000-8492',
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [toastConfig, setToastConfig] = React.useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  }>({ isVisible: false, type: 'info', message: '' });

  const {
    formik,
    timer,
    loading,
    inputRefs,
    handleOtpChange,
    handleKeyPress,
    handleResend,
  } = useOTPVerification();

  const hideToast = () => setToastConfig({ ...toastConfig, isVisible: false });

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  const { otpVerification: t } = useLocale();

  return (
    <ScreenShell
      title={t.titleHighlight}
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

          <Title>
            {t.titlePrefix}{' '}
            <Title style={{ color: theme.colors.primary }}>
              {t.titleHighlight}
            </Title>
          </Title>
          <Subtitle>{t.subtitle}</Subtitle>

          <PhoneRow>
            <PhoneText>{phoneNumber}</PhoneText>
            <EditButton>
              <Icon name="edit" size={20} color={theme.colors.primary} />
            </EditButton>
          </PhoneRow>

          <OtpInput
            length={6}
            values={formik.values.otp}
            refs={inputRefs}
            onChangeText={handleOtpChange}
            onKeyPress={handleKeyPress}
            error={false}
          />

          <VerifyButton
            onPress={() => formik.handleSubmit()}
            activeOpacity={0.8}
            disabled={loading}
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

          <FooterContainer>
            <SupportRow>
              <AvatarImage
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcPdOwGM5q9KVqnJhNOKhYKjdCqLHPB0Yw19BaVuK65j8SnuMa1XRpWYiskYjFHOTKoKa2F56K44A_AB4PX4ulZpv1OCqbhDWRLjkf8TJrFwZiA2w6QvK0NrKZYSPEhRyAhtDW8A0kMoAprlCkYeLt1ydZa4zvZN2vkaEU6kJNKbgopW7FAyiVJVz31PDpIzBa3w7tevcEl4nQy7Jn2CgOOitZvq7uA8W_O_pCh-ExfAdl9puRHleZruqBFTxWhcraYQbuojF1AVZs',
                }}
              />
              <SupportTextCol>
                <SupportLabel>{t.secureAuth}</SupportLabel>
                <SupportSub>{t.needHelp}</SupportSub>
              </SupportTextCol>
            </SupportRow>
          </FooterContainer>
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
