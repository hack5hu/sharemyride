import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { moderateScale } from '@/styles';
import * as S from './BookingConfirmedTemplate.styles';
import { BookingConfirmedTemplateProps } from './types.d';
import { BookingDetailCard } from './components/BookingDetailCard';

export const BookingConfirmedTemplate: React.FC<
  BookingConfirmedTemplateProps
> = ({ t, rideData, handleGoToMyRides, handleShareDetails }) => {
  const theme = useTheme();

  return (
    <ScreenShell>
      <S.MainContent showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <S.SuccessArea>
          <S.SuccessIconContainer
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons
              name="check-circle"
              size={moderateScale(48)}
              color={theme.colors.on_primary}
            />
          </S.SuccessIconContainer>
          <S.SuccessTitle>{t.successTitle}</S.SuccessTitle>
          <S.SuccessSubtitle>{t.successSubtitle}</S.SuccessSubtitle>
        </S.SuccessArea>

        {/* Bento Grid */}
        <S.RideSummaryGrid>
          {/* Driver Info */}
          <S.DriverCard>
            <Avatar size="lg" source={{ uri: rideData.driver.avatar }} placeholder={rideData.driver.name} />
            <S.DriverMeta>
              <S.DriverNameText variant="title" size="md" weight="bold">
                {rideData.driver.name}
              </S.DriverNameText>
              <S.RatingRow>
                <MaterialIcons
                  name="star"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
                <Typography variant="label" size="sm" weight="bold">
                  {typeof rideData.driver.rating === 'number'
                    ? rideData.driver.rating.toFixed(1)
                    : rideData.driver.rating}
                </Typography>
                <Typography
                  variant="label"
                  size="sm"
                  color={theme.colors.on_surface_variant}
                >
                  • {rideData.driver.car}
                </Typography>
              </S.RatingRow>
            </S.DriverMeta>
          </S.DriverCard>

          {/* Time & Seat details */}
          <S.Row>
            <BookingDetailCard
              iconName="schedule"
              label={t.pickupTimeLabel}
              value={rideData.pickupTime}
              subValue={rideData.departureDate}
            />

            <BookingDetailCard
              iconName="event-seat"
              label={t.seatNumberLabel}
              value={rideData.seatNumber}
              subValue={rideData.seatPreference}
            />
          </S.Row>

          {/* Safety Guard */}
          <S.SafetyBadge>
            <S.SafetyIconBox>
              <MaterialIcons
                name="security"
                size={24}
                color={theme.colors.secondary}
              />
            </S.SafetyIconBox>
            <S.SafetyMeta>
              <Typography
                variant="body"
                size="sm"
                weight="bold"
                color={theme.colors.on_secondary_container}
              >
                {t.safetyGuardTitle}
              </Typography>
              <S.SafetySubtitleText
                variant="label"
                size="xs"
                color={theme.colors.on_secondary_container}
              >
                {t.safetyGuardSubtitle}
              </S.SafetySubtitleText>
            </S.SafetyMeta>
          </S.SafetyBadge>
        </S.RideSummaryGrid>

        {/* Final Actions */}
        <S.ActionArea>
          <S.PrimaryButtonWrapper
            onPress={handleGoToMyRides}
            activeOpacity={0.8}
          >
            <S.PrimaryButton
              colors={[theme.colors.primary, theme.colors.primary_container]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Typography
                variant="body"
                size="md"
                weight="bold"
                color={theme.colors.on_primary}
              >
                {t.primaryCTA}
              </Typography>
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color={theme.colors.on_primary}
              />
            </S.PrimaryButton>
          </S.PrimaryButtonWrapper>

          <S.SecondaryButton onPress={handleShareDetails}>
            <MaterialIcons
              name="share"
              size={20}
              color={theme.colors.primary}
            />
            <Typography
              variant="body"
              size="md"
              weight="bold"
              color={theme.colors.primary}
            >
              {t.secondaryCTA}
            </Typography>
          </S.SecondaryButton>
        </S.ActionArea>

        {/* Trust Indicators */}
        <S.TrustSection>
          <S.TrustIconsRow>
            <MaterialIcons name="verified-user" size={16} />
            <MaterialIcons name="eco" size={16} />
            <MaterialIcons name="electric-car" size={16} />
          </S.TrustIconsRow>
          <S.TrustText variant="label" size="xxs" weight="bold">
            {t.carbonNeutralTransit}
          </S.TrustText>
        </S.TrustSection>
      </S.MainContent>
    </ScreenShell>
  );
};
