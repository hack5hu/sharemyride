import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Marker } from '@/components/organisms/OlaMap';
import { moderateScale, scale, verticalScale } from '@/styles';

interface LocalRideDistanceBadgeProps {
  id: string;
  lngLat: [number, number];
  text: string;
  bgColor: string;
}

const BadgeContainer = styled.View<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: ${moderateScale(4)}px;
  elevation: 5;
  border-width: 1.5px;
  border-color: #ffffff;
`;

const BadgeTextContainer = styled.View`
  margin-left: ${scale(3)}px;
`;

export const LocalRideDistanceBadge: React.FC<LocalRideDistanceBadgeProps> = React.memo(
  ({ id, lngLat, text, bgColor }) => (
    <Marker id={id} lngLat={lngLat}>
      <BadgeContainer $bgColor={bgColor}>
        <MaterialIcons name="directions-walk" size={moderateScale(12)} color="#FFFFFF" />
        <BadgeTextContainer>
          <Typography variant="label" size="xs" weight="bold" color="#FFFFFF">
            {text}
          </Typography>
        </BadgeTextContainer>
      </BadgeContainer>
    </Marker>
  ),
);

LocalRideDistanceBadge.displayName = 'LocalRideDistanceBadge';
