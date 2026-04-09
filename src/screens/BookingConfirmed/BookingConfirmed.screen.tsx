import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale, scale, verticalScale } from '@/styles';
import { useBookingConfirmed } from './useBookingConfirmed';
import * as S from './BookingConfirmed.styles';

export const BookingConfirmedScreen: React.FC = () => {
  const theme = useTheme();
  const {
    t,
    rideData,
    handleGoToMyRides,
    handleShareDetails,
    handleMenuPress,
  } = useBookingConfirmed();

  return (
    <S.Container>
      {/* Glass-blurred header */}
      <S.Header>
        <S.BrandTitle>Ride Pool Company</S.BrandTitle>
        <TouchableOpacity onPress={handleMenuPress}>
          <Avatar
            size="sm"
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT8CtvbR50leYL8XxUP9zBxvxtvIdEFm9TMFjFtbTR2ARvypHTHMyAVrQU1IA0JHOzndM_R8TI6h6xaHSxwTrYV2x0LGbf4nZ8iV53UHviumUHqV_x3-p6fCmcY7Q03AV0DTqlrT1XB9yrh-4QV2bb9tGuf4DaJ5cz1Pf5snop55Y4K6MhTj90ZeEjlluxARZaUj1YvC53Lq1zFoO5LlCaKzNf5NF6SHmuRpKR_lThpbz6-On3dm5bZfEL_iXs81RuVLKBTH8JWOCD' }}
            style={{ borderWidth: 2, borderColor: theme.colors.primary_container + '33' }}
          />
        </TouchableOpacity>
      </S.Header>

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
              <S.Row style={{ alignItems: 'center', marginBottom: 4, gap: 8 }}>
                <Typography variant="label" size="xs" weight="bold" color={theme.colors.primary_container} style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                  {t.driverLabel}
                </Typography>
                <S.DriverBadge>
                  <MaterialIcons name="verified" size={12} color={theme.colors.on_primary_fixed_variant} />
                  <Typography variant="label" size="xxs" weight="bold" color={theme.colors.on_primary_fixed_variant} style={{ marginLeft: 4 }}>
                    {t.verifiedLabel}
                  </Typography>
                </S.DriverBadge>
              </S.Row>
              <S.SuccessTitle style={{ fontSize: 20, marginBottom: 4 }}>{rideData.driver.name}</S.SuccessTitle>
              <S.Row style={{ alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="star" size={14} color={theme.colors.primary} />
                <Typography variant="body" size="sm" weight="bold">{rideData.driver.rating}</Typography>
                <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>• {rideData.driver.car}</Typography>
              </S.Row>
            </S.DriverMeta>
            <View style={{ alignItems: 'flex-end' }}>
              <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant} style={{ textTransform: 'uppercase' }}>
                {t.plateLabel}
              </Typography>
              <Typography variant="title" size="sm" weight="bold" style={{ letterSpacing: 1.5 }}>
                {rideData.driver.plate}
              </Typography>
            </View>
          </S.DriverCard>

          {/* Time & Seat details */}
          <S.Row>
            <S.DetailCard>
              <View>
                <S.IconBox>
                  <MaterialIcons name="schedule" size={20} color={theme.colors.primary_container} />
                </S.IconBox>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.pickupTimeLabel}
                </Typography>
              </View>
              <View style={{ marginTop: 12 }}>
                <Typography variant="title" size="md" weight="bold">{rideData.pickupTime}</Typography>
                <Typography variant="label" size="xs" weight="bold" color={theme.colors.primary_container}>
                  {t.arrivingIn.replace('{min}', rideData.arrivalInMins.toString())}
                </Typography>
              </View>
            </S.DetailCard>

            <S.DetailCard>
              <View>
                <S.IconBox>
                  <MaterialIcons name="event-seat" size={20} color={theme.colors.primary_container} />
                </S.IconBox>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.seatNumberLabel}
                </Typography>
              </View>
              <View style={{ marginTop: 12 }}>
                <Typography variant="title" size="md" weight="bold">{rideData.seatNumber}</Typography>
                <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>
                  {rideData.seatPreference}
                </Typography>
              </View>
            </S.DetailCard>
          </S.Row>

          {/* Safety Guard */}
          <S.SafetyBadge>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
              <MaterialIcons name="security" size={24} color={theme.colors.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="body" size="sm" weight="bold" color={theme.colors.on_secondary_container}>
                {t.safetyGuardTitle}
              </Typography>
              <Typography variant="label" size="xs" color={theme.colors.on_secondary_container} style={{ opacity: 0.8 }}>
                {t.safetyGuardSubtitle}
              </Typography>
            </View>
          </S.SafetyBadge>
        </S.RideSummaryGrid>

        {/* Final Actions */}
        <S.ActionArea>
          <TouchableOpacity onPress={handleGoToMyRides} activeOpacity={0.8}>
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
          </TouchableOpacity>

          <S.SecondaryButton onPress={handleShareDetails}>
            <MaterialIcons name="share" size={20} color={theme.colors.primary} />
            <Typography variant="body" size="md" weight="bold" color={theme.colors.primary}>
              {t.secondaryCTA}
            </Typography>
          </S.SecondaryButton>
        </S.ActionArea>

        {/* Trust Indicators */}
        <View style={{ alignItems: 'center', opacity: 0.5, paddingBottom: 40 }}>
          <S.Row style={{ marginBottom: 8, gap: 16 }}>
            <MaterialIcons name="verified-user" size={16} />
            <MaterialIcons name="eco" size={16} />
            <MaterialIcons name="electric-car" size={16} />
          </S.Row>
          <Typography variant="label" size="xxs" weight="bold" style={{ textTransform: 'uppercase', letterSpacing: 1.5 }}>
            Ride Pool Company Carbon Neutral Transit
          </Typography>
        </View>
      </S.MainContent>
    </S.Container>
  );
};
