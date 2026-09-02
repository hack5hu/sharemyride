import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@/components/atoms/Button';
import { OtpInput } from '@/components/molecules/OtpInput';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import {
  KeyboardContainer,
  ScrollContainer,
  BackgroundBlob,
  IconContainer,
  Subtitle,
  PhoneRow,
  PhoneText,
  ButtonContainer,
  ResendContainer,
  ResendHintText,
  ResendActionRow,
  ResendActionText,
  LinksRow,
  LinkText,
  DotSeparator,
} from './OTPVerificationTemplate.styles';
import { type OTPVerificationTemplateProps } from './types.d';

export const OTPVerificationTemplate: React.FC<OTPVerificationTemplateProps> = ({
  propPhoneNumber,
  dynamicPhoneNumber,
  timer,
  loading,
  otpValue,
  handleTextChange,
  handleVerify,
  handleResend,
  t,
  theme,
}) => {
  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;
  const isButtonDisabled = otpValue.length < 6 || loading;

  return (
    <ScreenShell title={t.screenName} onBack={true}>
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
            disabled={loading}
          />

          <ButtonContainer>
            <Button
              onPress={() => handleVerify(otpValue)}
              disabled={isButtonDisabled}
              loading={loading}
            >
              {t.verifyButton}
            </Button>
          </ButtonContainer>

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
