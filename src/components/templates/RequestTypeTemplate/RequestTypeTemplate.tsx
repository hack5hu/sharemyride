import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '@/styles';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { RequestTypeTemplateProps } from './types.d';
import {
  Content,
  TitleSection,
  PageTitle,
  PageSubtitle,
  OptionsContainer,
  OptionCard,
  OptionContent,
  IconContainer,
  OptionTextWrapper,
  OptionTitle,
  OptionDescription,
  RadioOuter,
  RadioInner,
  ProTipCard,
  ProTipHeader,
  ProTipTitle,
  ProTipText,
  FloatingFooter,
  FooterGradient,
  ContinueButton,
  ContinueGradient,
  ContinueText,
} from './RequestTypeTemplate.styles';

export const RequestTypeTemplate: React.FC<RequestTypeTemplateProps> = ({
  bookingType,
  setBookingType,
  handleBackPress,
  handleContinue,
  t,
  theme,
}) => {
  return (
    <ScreenShell title={'Request Type'} onBack={handleBackPress}>
      <Content>
        <TitleSection>
          <PageTitle>{t.title}</PageTitle>
          <PageSubtitle>{t.subtitle}</PageSubtitle>
        </TitleSection>

        <OptionsContainer>
          {/* Instant Booking Option */}
          <OptionCard
            selected={bookingType === 'instant'}
            activeOpacity={0.8}
            onPress={() => setBookingType('instant')}
          >
            <OptionContent>
              <IconContainer type="instant">
                <MaterialIcons
                  name="bolt"
                  size={moderateScale(28)}
                  color={theme.colors.primary}
                />
              </IconContainer>
              <OptionTextWrapper>
                <OptionTitle>{t.instantBookingTitle}</OptionTitle>
                <OptionDescription>
                  {t.instantBookingSubtitle}
                </OptionDescription>
              </OptionTextWrapper>
            </OptionContent>
            <RadioOuter selected={bookingType === 'instant'}>
              <RadioInner selected={bookingType === 'instant'} />
            </RadioOuter>
          </OptionCard>

          {/* Request & Review Option */}
          <OptionCard
            selected={bookingType === 'review'}
            activeOpacity={0.8}
            onPress={() => setBookingType('review')}
          >
            <OptionContent>
              <IconContainer type="review">
                <MaterialIcons
                  name="verified-user"
                  size={moderateScale(28)}
                  color={theme.colors.secondary}
                />
              </IconContainer>
              <OptionTextWrapper>
                <OptionTitle>{t.requestReviewTitle}</OptionTitle>
                <OptionDescription>{t.requestReviewSubtitle}</OptionDescription>
              </OptionTextWrapper>
            </OptionContent>
            <RadioOuter selected={bookingType === 'review'}>
              <RadioInner selected={bookingType === 'review'} />
            </RadioOuter>
          </OptionCard>
        </OptionsContainer>

        {/* Pro Tip Box */}
        <ProTipCard>
          <ProTipHeader>
            <MaterialIcons
              name="info"
              size={moderateScale(16)}
              color={theme.colors.primary}
            />
            <ProTipTitle>{t.proTipTitle}</ProTipTitle>
          </ProTipHeader>
          <ProTipText>{t.proTipText}</ProTipText>
        </ProTipCard>
      </Content>

      <FloatingFooter pointerEvents="box-none">
        <FooterGradient
          colors={['transparent', theme.colors.surface, theme.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
        />
        <ContinueButton onPress={handleContinue} activeOpacity={0.9}>
          <ContinueGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ContinueText>{t.continueButton}</ContinueText>
            <MaterialIcons
              name="arrow-forward"
              size={moderateScale(20)}
              color={theme.colors.on_primary}
            />
          </ContinueGradient>
        </ContinueButton>
      </FloatingFooter>
    </ScreenShell>
  );
};
