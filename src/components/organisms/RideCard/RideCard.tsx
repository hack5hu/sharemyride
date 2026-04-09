import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { moderateScale, scale, verticalScale } from '@/styles';
import { RideData } from '@/screens/AvailableRides/types.d';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { useLocale } from '@/constants/localization';

const CardContainer = styled.TouchableOpacity<{ isSpecial?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(28)}px;
  padding: ${moderateScale(24)}px;
  margin-bottom: ${verticalScale(16)}px;
  box-shadow: ${({ theme, isSpecial }) => 
    isSpecial ? '0px 8px 32px rgba(0, 107, 71, 0.06)' : '0px 4px 24px rgba(23, 29, 25, 0.04)'};
  elevation: 4;
  border-width: ${({ isSpecial }) => (isSpecial ? 2 : 0)}px;
  border-color: ${({ theme, isSpecial }) => 
    isSpecial ? `${theme.colors.primary}1A` : 'transparent'};
`;

const SpecialBadge = styled.View`
  position: absolute;
  top: -${verticalScale(12)}px;
  right: ${scale(24)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(999)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  elevation: 6;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(24)}px;
`;

const DriverInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

const DriverTextGroup = styled.View``;

const PriceGroup = styled.View`
  align-items: flex-end;
`;

const PriceText = styled(Typography)`
  font-size: ${moderateScale(24)}px;
  font-weight: 800;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Footer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
  padding-top: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant}1A;
`;

const FeatureBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(8)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const RideCard: React.FC<{ ride: RideData; onPress?: (id: string) => void }> = ({ ride, onPress }) => {
  const theme = useTheme();
  const { availableRides: t } = useLocale();

  return (
    <CardContainer isSpecial={ride.isFrequentCoRider} onPress={() => onPress?.(ride.id)}>
      {ride.isFrequentCoRider && (
        <SpecialBadge>
          <Icon name="verified-user" size={moderateScale(12)} color={theme.colors.on_primary_container} />
          <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_primary_container}>
            {t.frequentCoRiderBadge.toUpperCase()}
          </Typography>
        </SpecialBadge>
      )}

      <Header>
        <DriverInfo>
          <Avatar 
            source={{ uri: ride.driver.avatar }} 
            size="md" 
          />
          <DriverTextGroup>
            <Typography variant="title" size="sm" weight="bold">
              {ride.driver.name}
            </Typography>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Icon name="star" size={moderateScale(16)} color={theme.colors.primary} />
              <Typography variant="label" size="sm" weight="bold" color={theme.colors.primary}>
                {ride.driver.rating}
              </Typography>
              <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>
                ({ride.driver.rideCount} rides)
              </Typography>
            </View>
          </DriverTextGroup>
        </DriverInfo>

        <PriceGroup>
          <PriceText>${ride.price.toFixed(2)}</PriceText>
          <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
            {t.perSeatLabel.toUpperCase()}
          </Typography>
        </PriceGroup>
      </Header>

      <RideTimeline points={ride.timeline} />

      <Footer>
        {ride.features.map((feature, idx) => (
          <FeatureBadge key={idx}>
            <Icon 
              name={feature === 'noSmoking' ? 'smoke-free' : 'pregnant-woman'} 
              size={moderateScale(14)} 
              color={theme.colors.on_surface_variant} 
            />
            <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
              {feature === 'noSmoking' ? 'No Smoking' : 'Ladies Only'}
            </Typography>
          </FeatureBadge>
        ))}
        
        <FeatureBadge>
          <Icon name="event-seat" size={moderateScale(14)} color={theme.colors.on_surface_variant} />
          <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
            {t.seatsLeftLabel.replace('{count}', ride.seatsLeft.toString())}
          </Typography>
        </FeatureBadge>
      </Footer>
    </CardContainer>
  );
};
