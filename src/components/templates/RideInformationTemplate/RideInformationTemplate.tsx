import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { RideInformationTemplateProps } from './types.d';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './RideInformationTemplate.styles';
import { moderateScale } from '@/styles';

export const RideInformationTemplate: React.FC<RideInformationTemplateProps> = ({
  ride,
  t,
  handleBack,
  handleBook,
  handleViewRoute,
  handleCopyAddress,
}) => {
  const theme = useTheme();

  if (!ride) return null;

  return (
    <ScreenShell
      title={t.title}
      onBack={handleBack}

    >
      <S.ScrollContent showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <S.ContentPadding>
          {/* Route Timeline */}
          <S.SectionCard>
            <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant} style={{ marginBottom: 24 }}>
              {t.timelineTitle.toUpperCase()}
            </Typography>
            <RideTimeline
              points={ride.timeline}
              showActions={true}
              onMapPress={handleViewRoute}
              onCopyAddress={handleCopyAddress}
            />

            {ride.totalDuration > 0 && (
              <S.AmenityRow style={{ marginTop: 16 }}>
                <Icon name="schedule" size={moderateScale(18)} color={theme.colors.primary} />
                <Typography variant="label" size="sm" weight="bold">
                  Estimated Travel Time: {Math.floor(ride.totalDuration / 60)}h {ride.totalDuration % 60}m
                </Typography>
              </S.AmenityRow>
            )}
          </S.SectionCard>

          {/* Reorganized Detail Stack (Driver then Car) */}
          <S.DetailStack>
            <S.DriverCard>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View>
                  <Avatar source={{ uri: ride.driver.driverPhotoUrl || ride.driver.avatar }} size="md" />
                  <View style={{ position: 'absolute', bottom: -2, right: -2 }}>
                    <VerifiedBadge size={14} />
                  </View>
                </View>
                <View>
                  <Typography variant="title" size="sm" weight="bold">{ride.driver.name}</Typography>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Icon name="star" size={moderateScale(14)} color="#EAB308" />
                    <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                      {ride.driver.rating} ({ride.driver.rideCount} rides)
                    </Typography>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <S.RoundAction><Icon name="chat" size={moderateScale(20)} color={theme.colors.primary} /></S.RoundAction>
                <S.RoundAction><Icon name="call" size={moderateScale(20)} color={theme.colors.primary} /></S.RoundAction>
              </View>
            </S.DriverCard>
          </S.DetailStack>



          {/* Rules & Amenities */}
          <S.GridRow>
            <S.GridItem>
              <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant} style={{ marginBottom: 4 }}>
                {t.rulesTitle.toUpperCase()}
              </Typography>
              {ride.features.includes('noSmoking') && (
                <S.AmenityRow>
                  <Icon name="smoke-free" size={moderateScale(18)} color={theme.colors.error} />
                  <Typography variant="label" size="sm" weight="bold">{t.noSmoking}</Typography>
                </S.AmenityRow>
              )}
              {ride.features.includes('petFriendly') ? (
                <S.AmenityRow>
                  <Icon name="pets" size={moderateScale(18)} color={theme.colors.primary} />
                  <Typography variant="label" size="sm" weight="bold">{t.petsAllowed}</Typography>
                </S.AmenityRow>
              ) : (
                <S.AmenityRow>
                  <Icon name="no-pets" size={moderateScale(18)} color={theme.colors.on_surface_variant} />
                  <Typography variant="label" size="sm" weight="bold">No Pets</Typography>
                </S.AmenityRow>
              )}
            </S.GridItem>

          </S.GridRow>

          {/* Pricing */}
          <S.FareCard>
            <S.FareRow isTotal>
              <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                {t.fareDetailsTitle.toUpperCase()}
              </Typography>
              <Typography variant="title" size="lg" weight="bold" color={theme.colors.primary}>
                ₹{ride.price.toFixed(0)}
              </Typography>
            </S.FareRow>
            <View style={{ marginTop: 12 }}>
              <S.FareRow>
                <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>{t.seatFareLabel}</Typography>
                <Typography variant="label" size="sm" weight="bold">₹{(ride.price * 0.9).toFixed(0)}</Typography>
              </S.FareRow>
              <S.FareRow>
                <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>{t.serviceFeeLabel}</Typography>
                <Typography variant="label" size="sm" weight="bold">₹{(ride.price * 0.1).toFixed(0)}</Typography>
              </S.FareRow>
            </View>
          </S.FareCard>

          {/* Action Area */}
          <S.Footer>
            <S.BookButton onPress={handleBook}>
              <Typography variant="title" size="sm" weight="bold" color={theme.colors.on_primary}>
                {t.bookSeatButton}
              </Typography>
            </S.BookButton>
            <Typography variant="label" size="xs" color={theme.colors.on_surface_variant} style={{ textAlign: 'center', marginTop: 16, lineHeight: 16 }}>
              {t.guidelinesNote}
            </Typography>
          </S.Footer>
        </S.ContentPadding>
      </S.ScrollContent>
    </ScreenShell>
  );
};
