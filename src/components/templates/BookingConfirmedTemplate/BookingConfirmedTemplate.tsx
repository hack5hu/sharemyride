import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { Button } from '@/components/atoms/Button';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
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
          <S.SuccessGlowRing>
            <S.SuccessIconContainer
              colors={[
                theme.colors.primary,
                theme.colors.primary_container || '#0070eb',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialIcons
                name="check"
                size={moderateScale(40)}
                color={theme.colors.on_primary}
              />
            </S.SuccessIconContainer>
          </S.SuccessGlowRing>
          <S.SuccessTitle>{t.successTitle}</S.SuccessTitle>
          <S.SuccessSubtitle>{t.successSubtitle}</S.SuccessSubtitle>
        </S.SuccessArea>

        {/* Bento Grid */}
        <S.RideSummaryGrid>
          {/* Driver Info */}
          <S.DriverCard>
            <S.AvatarWrapper>
              <Avatar
                size="md"
                source={{ uri: rideData.driver.avatar }}
                placeholder={rideData.driver.name}
              />
              <S.BadgePin>
                <VerifiedBadge size={18} />
              </S.BadgePin>
            </S.AvatarWrapper>

            <S.DriverMeta>
              <Typography variant="title" size="sm" weight="bold">
                {rideData.driver.name}
              </Typography>
              <S.RatingRow>
                <S.RatingPill>
                  <MaterialIcons
                    name="star"
                    size={moderateScale(13)}
                    color={theme.colors.warning || '#f59e0b'}
                  />
                  <Typography
                    variant="label"
                    size="xs"
                    weight="bold"
                    color={theme.colors.on_surface}
                  >
                    {typeof rideData.driver.rating === 'number'
                      ? rideData.driver.rating.toFixed(1)
                      : rideData.driver.rating || '5.0'}
                  </Typography>
                </S.RatingPill>

                {rideData.driver.car ? (
                  <S.MetaBadge>
                    <Typography
                      variant="label"
                      size="xs"
                      weight="medium"
                      color={theme.colors.on_surface_variant}
                    >
                      {rideData.driver.car}
                    </Typography>
                  </S.MetaBadge>
                ) : null}
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
                name="verified-user"
                size={moderateScale(22)}
                color={theme.colors.primary}
              />
            </S.SafetyIconBox>
            <S.SafetyMeta>
              <Typography
                variant="body"
                size="sm"
                weight="bold"
                color={theme.colors.on_surface}
              >
                {t.safetyGuardTitle || 'Safety Guard Active'}
              </Typography>
              <S.SafetySubtitleText
                variant="label"
                size="xs"
                color={theme.colors.on_surface_variant}
              >
                {t.safetyGuardSubtitle ||
                  'Your journey is GPS tracked with 24/7 support.'}
              </S.SafetySubtitleText>
            </S.SafetyMeta>
          </S.SafetyBadge>
        </S.RideSummaryGrid>

        {/* Final Actions */}
        <S.ActionArea>
          <Button
            onPress={handleGoToMyRides}
            icon="arrow-forward"
            iconPosition="right"
          >
            {t.primaryCTA}
          </Button>

          <Button
            onPress={handleShareDetails}
            variant="secondary"
            icon="share"
            iconPosition="left"
          >
            {t.secondaryCTA}
          </Button>
        </S.ActionArea>
      </S.MainContent>
    </ScreenShell>
  );
};
