/* eslint-disable max-lines */
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale, scale, verticalScale } from '@/styles';
import { RideData } from '@/screens/BookFlow/3_AvailableRides/types';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { useTranslation } from '@/hooks/useTranslation';

const CardContainer = styled.TouchableOpacity<{ isSpecial?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px ${moderateScale(20)}px;
  margin-bottom: ${verticalScale(14)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
`;

const SpecialBadge = styled.View`
  position: absolute;
  top: -${verticalScale(10)}px;
  right: ${scale(20)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(999)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  elevation: 4;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(12)}px;
`;

const DriverInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

const DriverTextGroup = styled.View`
  flex: 1;
`;

const PriceGroup = styled.View`
  align-items: flex-end;
`;

const PriceText = styled(Typography)`
  font-size: ${moderateScale(22)}px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoRow = styled.View<{ marginTop?: number }>`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
`;

const Footer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(10)}px;
  padding-top: ${verticalScale(10)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant}20;
`;

const FeatureBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high}66;
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(8)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(5)}px;
`;

export const RideCard: React.FC<{
  ride: RideData;
  onPress?: (id: string) => void;
}> = ({ ride, onPress }) => {
  const theme = useTheme();
  const { t, translations } = useTranslation();
  const {
    availableRides: tVal,
    rideDetails: rd,
    travelPreferences: tp,
  } = translations;
  return (
    <CardContainer
      isSpecial={ride.isFrequentCoRider}
      onPress={() => onPress?.(ride.id)}
    >
      {ride.isFrequentCoRider && (
        <SpecialBadge>
          <Icon
            name="verified-user"
            size={moderateScale(12)}
            color={theme.colors.on_primary_container}
          />
          <Typography
            variant="label"
            size="sm"
            weight="bold"
            color={theme.colors.on_primary_container}
          >
            {tVal.frequentCoRiderBadge.toUpperCase()}
          </Typography>
        </SpecialBadge>
      )}

      <Header>
        <DriverInfo>
          <Avatar
            source={{ uri: ride.driver.driverPhotoUrl }}
            placeholder={ride.driver.name}
            size="md"
          />
          <DriverTextGroup>
            <Typography variant="title" size="sm" weight="bold">
              {ride.driver.name}
            </Typography>
            <InfoRow marginTop={2}>
              <Icon
                name="star"
                size={moderateScale(13)}
                color={theme.colors.warning || '#f59e0b'}
              />
              <Typography
                variant="label"
                size="sm"
                weight="bold"
                color={theme.colors.on_surface}
              >
                {ride.driver.rating && Number(ride.driver.rating) > 0
                  ? ride.driver.rating
                  : 5}
              </Typography>
              {ride.pickupDistance !== undefined && ride.pickupDistance < 50 && (
                <>
                  <Typography
                    variant="label"
                    size="sm"
                    color={theme.colors.outline_variant}
                  >
                    •
                  </Typography>
                  <Typography
                    variant="label"
                    size="sm"
                    weight="medium"
                    color={theme.colors.on_surface_variant}
                  >
                    {t('availableRides.kmFromPickup', {
                      distance: ride.pickupDistance.toFixed(1),
                    })}
                  </Typography>
                </>
              )}
            </InfoRow>
          </DriverTextGroup>
        </DriverInfo>

        <PriceGroup>
          <PriceText>₹{ride.price.toFixed(0)}</PriceText>
          <Typography
            variant="label"
            size="xs"
            weight="bold"
            color={theme.colors.on_surface_variant}
          >
            {tVal.perSeatLabel.toUpperCase()}
          </Typography>
          {ride.totalDuration > 0 && (
            <InfoRow marginTop={3}>
              <Icon
                name="schedule"
                size={moderateScale(12)}
                color={theme.colors.primary}
              />
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color={theme.colors.primary}
              >
                {t('availableRides.durationValue', {
                  hours: Math.floor(ride.totalDuration / 60),
                  minutes: ride.totalDuration % 60,
                })}
              </Typography>
            </InfoRow>
          )}
        </PriceGroup>
      </Header>

      <RideTimeline
        points={ride.timeline.filter(
          (_, i, a) => i === 0 || i === a.length - 1,
        )}
      />

      <Footer>
        {ride.features.map((feature, idx) => {
          let iconName = 'stars';
          let label = feature;

          if (feature === 'noSmoking') {
            iconName = 'smoke-free';
            label = rd.smokeFree;
          } else if (feature === 'ladiesOnly') {
            iconName = 'pregnant-woman';
            label = rd.ladiesOnly;
          } else if (feature === 'petFriendly') {
            iconName = 'pets';
            label = tp.petFriendly;
          } else if (feature === 'luggageAllowed') {
            iconName = 'luggage';
            label = tp.luggageAllowed;
          } else if (feature === 'autoApproval') {
            iconName = 'flash-on';
            label = rd.instantBooking;
          } else if (feature.startsWith('music:')) return;

          return (
            <FeatureBadge key={idx}>
              <Icon
                name={iconName}
                size={moderateScale(14)}
                color={theme.colors.on_surface_variant}
              />
              <Typography
                variant="label"
                size="sm"
                weight="bold"
                color={theme.colors.on_surface_variant}
              >
                {label}
              </Typography>
            </FeatureBadge>
          );
        })}

        <FeatureBadge>
          <Icon
            name="event-seat"
            size={moderateScale(14)}
            color={theme.colors.on_surface_variant}
          />
          <Typography
            variant="label"
            size="sm"
            weight="bold"
            color={theme.colors.on_surface_variant}
          >
            {t('availableRides.seatsLeftLabel', { count: ride.seatsLeft ?? 0 })}
          </Typography>
        </FeatureBadge>
      </Footer>
    </CardContainer>
  );
};
