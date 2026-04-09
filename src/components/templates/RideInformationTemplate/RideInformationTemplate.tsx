import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { RideInformationTemplateProps } from './types.d';
import * as S from './RideInformationTemplate.styles';
import { moderateScale } from '@/styles';

export const RideInformationTemplate: React.FC<RideInformationTemplateProps> = ({
  ride,
  t,
  handleBack,
  handleBook,
}) => {
  const theme = useTheme();

  return (
    <S.Container>
      {/* Top App Bar */}
      <S.NavBar>
        <S.NavLeft>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
          </TouchableOpacity>
          <Typography variant="title" size="md" weight="bold" color={theme.colors.primary}>
            {t.title}
          </Typography>
        </S.NavLeft>
        <Avatar 
          size="sm" 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBosbgMtsx58eG37CNBKxBWcOvxxw1YUhUf7Uf_yJDXJx-zc6IBV-7yqhqGrBzQ9WroxNjbmxKvoFxFFB58SXwt2tlEwiiHlAQ8XTCsU9QJFFzwXKwRkbB-005vcDr7JLRNmjuyDE4zLYomxspAa-QsZTQAtEOOJQphmBwUC0UCgbiKo6l_CMm87uFP82wkaxf6qsfvIr6kjH4E1Xmuo6Zf1IK-LZiFUgkjrUwDCJNm_RmwJa6_--bUokVeTZQ31VQtQD6xun7eWASA' }} 
        />
      </S.NavBar>

      <S.ScrollContent showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <S.ContentPadding>
          <S.MapSection>
            <S.MapImage 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ppZ4XsaXa8yEWbv_wXbvnGYccdP1l0XlyDfAQOr72baIAylPooCCYwQ6QRikRX0FzowHwWAKgIZKbEp7QKzEg8zTFNVvpb8Nm5FyK8sxLyE1-Qx3G64B_foJPKJcCwr7CzTUEOxWE4GEqxp4WjfyHmHseVnNO9qWEs-JV_67pwGzhed9X1ygvZNPnIy2MyAlSnqWa0jblv-vD0V6qOhPBDH1fj8drt7AVk5tWNGLbXxreK3cdWaQPksAViPulXzRuM8Tl2hZgcqv' }} 
            />
            <S.DistanceOverlay>
              <Icon name="distance" size={moderateScale(14)} color={theme.colors.primary} />
              <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                {t.distanceRemaining.replace('{distance}', '12.4')}
              </Typography>
            </S.DistanceOverlay>
          </S.MapSection>

          {/* Reorganized Detail Stack (Driver then Car) */}
          <S.DetailStack>
            <S.DriverCard>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View>
                  <Avatar source={{ uri: ride.driver.avatar }} size="md" />
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

            <S.CarCard>
              <Icon name="electric-car" size={moderateScale(28)} color={theme.colors.primary} />
              <S.CarTextGroup>
                <Typography variant="label" size="sm" weight="bold">Tesla Model 3</Typography>
                <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant}>
                  KNT-4092
                </Typography>
              </S.CarTextGroup>
            </S.CarCard>
          </S.DetailStack>

          {/* Route Timeline */}
          <S.SectionCard>
            <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant} style={{ marginBottom: 24 }}>
              {t.timelineTitle.toUpperCase()}
            </Typography>
            <RideTimeline points={ride.timeline} />
          </S.SectionCard>

          {/* Rules & Amenities */}
          <S.GridRow>
            <S.GridItem>
              <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant} style={{ marginBottom: 4 }}>
                {t.rulesTitle.toUpperCase()}
              </Typography>
              <S.AmenityRow>
                <Icon name="smoke-free" size={moderateScale(18)} color={theme.colors.error} />
                <Typography variant="label" size="sm" weight="bold">{t.noSmoking}</Typography>
              </S.AmenityRow>
              <S.AmenityRow>
                <Icon name="pets" size={moderateScale(18)} color={theme.colors.primary} />
                <Typography variant="label" size="sm" weight="bold">{t.petsAllowed}</Typography>
              </S.AmenityRow>
            </S.GridItem>

            <S.GridItem>
              <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant} style={{ marginBottom: 4 }}>
                {t.amenitiesTitle.toUpperCase()}
              </Typography>
              <S.AmenityRow>
                <Icon name="wifi" size={moderateScale(18)} color={theme.colors.primary} />
                <Typography variant="label" size="sm" weight="bold">{t.freeWifi}</Typography>
              </S.AmenityRow>
              <S.AmenityRow>
                <Icon name="usb" size={moderateScale(18)} color={theme.colors.primary} />
                <Typography variant="label" size="sm" weight="bold">{t.usbCharging}</Typography>
              </S.AmenityRow>
            </S.GridItem>
          </S.GridRow>

          {/* Pricing */}
          <S.FareCard>
            <S.FareRow isTotal>
              <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                {t.fareDetailsTitle.toUpperCase()}
              </Typography>
              <Typography variant="title" size="lg" weight="bold" color={theme.colors.primary}>
                $32.50
              </Typography>
            </S.FareRow>
            <View style={{ marginTop: 12 }}>
              <S.FareRow>
                <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>{t.seatFareLabel}</Typography>
                <Typography variant="label" size="sm" weight="bold">$28.00</Typography>
              </S.FareRow>
              <S.FareRow>
                <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>{t.serviceFeeLabel}</Typography>
                <Typography variant="label" size="sm" weight="bold">$3.50</Typography>
              </S.FareRow>
              <S.FareRow>
                <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>{t.sustainabilityFeeLabel}</Typography>
                <Typography variant="label" size="sm" weight="bold">$1.00</Typography>
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
    </S.Container>
  );
};
