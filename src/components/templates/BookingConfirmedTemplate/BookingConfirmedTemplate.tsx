import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { moderateScale } from '@/styles';
import * as S from './BookingConfirmedTemplate.styles';
import { BookingConfirmedTemplateProps } from './types.d';

export const BookingConfirmedTemplate: React.FC<BookingConfirmedTemplateProps> = ({
  t,
  rideData,
  handleGoToMyRides,
  handleShareDetails,
  handleMenuPress,
}) => {
  const theme = useTheme();

  return (
    <ScreenShell title="Ride Pool Company">
      <S.MainContent showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <S.SuccessArea>
          <S.SuccessIconContainer
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons name="check-circle" size={moderateScale(48)} color="#fff" />
          </S.SuccessIconContainer>
          <S.SuccessTitle>{t.successTitle}</S.SuccessTitle>
          <S.SuccessSubtitle>{t.successSubtitle}</S.SuccessSubtitle>
        </S.SuccessArea>

        {/* Bento Grid */}
        <S.RideSummaryGrid>
          {/* Driver Info */}
          <S.DriverCard>
            <Avatar size="lg" source={{ uri: rideData.driver.avatar }} />
            <S.DriverMeta>
              <S.DriverNameText variant="title" size="md" weight="bold">
                {rideData.driver.name}
              </S.DriverNameText>
              <S.RatingRow>
                <MaterialIcons name="star" size={14} color={theme.colors.primary} />
                <Typography variant="body" size="sm" weight="bold">{rideData.driver.rating}</Typography>
                <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>• {rideData.driver.car}</Typography>
              </S.RatingRow>
            </S.DriverMeta>
          </S.DriverCard>

          {/* Time & Seat details */}
          <S.Row>
            <S.DetailCard>
              <S.DetailCardHeader>
                <S.IconBox>
                  <MaterialIcons name="schedule" size={20} color={theme.colors.primary_container} />
                </S.IconBox>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.pickupTimeLabel}
                </Typography>
              </S.DetailCardHeader>
              <S.ValueWrapper>
                <Typography variant="title" size="md" weight="bold">{rideData.pickupTime}</Typography>
              </S.ValueWrapper>
            </S.DetailCard>

            <S.DetailCard>
              <S.DetailCardHeader>
                <S.IconBox>
                  <MaterialIcons name="event-seat" size={20} color={theme.colors.primary_container} />
                </S.IconBox>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.seatNumberLabel}
                </Typography>
              </S.DetailCardHeader>
              <S.ValueWrapper>
                <Typography variant="title" size="md" weight="bold">{rideData.seatNumber}</Typography>
                <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>
                  {rideData.seatPreference}
                </Typography>
              </S.ValueWrapper>
            </S.DetailCard>
          </S.Row>

          {/* Safety Guard */}
          <S.SafetyBadge>
            <S.SafetyIconBox>
              <MaterialIcons name="security" size={24} color={theme.colors.secondary} />
            </S.SafetyIconBox>
            <S.SafetyMeta>
              <Typography variant="body" size="sm" weight="bold" color={theme.colors.on_secondary_container}>
                {t.safetyGuardTitle}
              </Typography>
              <S.SafetySubtitleText variant="label" size="xs" color={theme.colors.on_secondary_container}>
                {t.safetyGuardSubtitle}
              </S.SafetySubtitleText>
            </S.SafetyMeta>
          </S.SafetyBadge>
        </S.RideSummaryGrid>

        {/* Final Actions */}
        <S.ActionArea>
          <S.PrimaryButtonWrapper onPress={handleGoToMyRides} activeOpacity={0.8}>
            <S.PrimaryButton
              colors={[theme.colors.primary, theme.colors.primary_container]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Typography variant="body" size="md" weight="bold" color="#fff">
                {t.primaryCTA}
              </Typography>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </S.PrimaryButton>
          </S.PrimaryButtonWrapper>

          <S.SecondaryButton onPress={handleShareDetails}>
            <MaterialIcons name="share" size={20} color={theme.colors.primary} />
            <Typography variant="body" size="md" weight="bold" color={theme.colors.primary}>
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
            Ride Pool Company Carbon Neutral Transit
          </S.TrustText>
        </S.TrustSection>
      </S.MainContent>
    </ScreenShell>
  );
};
