import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale } from '@/styles';
import { TimelinePoint } from '@/screens/BookFlow/3_AvailableRides/types';

const Container = styled.View`
  padding-top: ${verticalScale(6)}px;
`;

const TimelineRow = styled.View`
  flex-direction: row;
  min-height: ${verticalScale(32)}px;

`;

const DashColumn = styled.View`
  align-items: center;
  width: ${moderateScale(20)}px;
  position: relative;
`;

const Point = styled.View<{ type: 'pickup' | 'stop' | 'destination' }>`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme, type }) => 
    type === 'pickup' ? theme.colors.primary : 
    type === 'destination' ? theme.colors.tertiary : 
    theme.colors.outline_variant};
  z-index: 2;
  margin-top: ${verticalScale(4)}px;
  border-width: ${moderateScale(2)}px;
  border-color: ${({ theme, type }) => 
    type === 'pickup' ? theme.colors.primary_fixed : 
    type === 'destination' ? theme.colors.tertiary_fixed : 
    'white'};
`;

const DashLine = styled.View`
  position: absolute;
  top: ${verticalScale(16)}px;
  bottom: -${verticalScale(4)}px;
  width: ${moderateScale(2)}px;
  background-color: ${({ theme }) => theme.colors.primary_fixed_dim};
  z-index: 1;
`;

const LeftContent = styled.View`
  width: ${scale(70)}px;
  align-items: flex-end;
  padding-right: ${scale(12)}px;
  padding-top: ${verticalScale(2)}px;
`;

const RightContent = styled.View`
  flex: 1;
  padding-left: ${scale(16)}px;
  padding-bottom: ${verticalScale(32)}px;
  align-items: flex-start;
`;

const LocationInfo = styled.View`
  flex: 1;
`;


const TimeText = styled(Typography)`
  font-size: ${moderateScale(12)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

const ActionGroup = styled.View`
  flex-direction: row;
  gap: ${scale(8)}px;
  align-items: center;
  margin-top: ${verticalScale(10)}px;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}20;
`;


import Icon from 'react-native-vector-icons/MaterialIcons';

export const RideTimeline: React.FC<{ 
  points: TimelinePoint[]; 
  showActions?: boolean;
  onMapPress?: () => void;
  onCopyAddress?: (address: string) => void;
}> = ({ points, showActions, onMapPress, onCopyAddress }) => {
  const theme = useTheme();

  return (
    <Container>
      {points.map((point, index) => (
        <TimelineRow key={index}>
          <LeftContent>
            <TimeText color={point.type === 'stop' ? theme.colors.on_surface_variant : undefined}>
              {point.time}
            </TimeText>
          </LeftContent>

          <DashColumn>
            <Point type={point.type} />
            {index < points.length - 1 && <DashLine />}
          </DashColumn>

          <RightContent>
            <LocationInfo>
              <TouchableOpacity onPress={onMapPress} disabled={!onMapPress} activeOpacity={0.7}>
                <Typography variant="body" size="md" weight="bold" numberOfLines={2} ellipsizeMode='tail'>
                  {point.location}
                </Typography>
                {point.description && (
                  <Typography variant="label" size="xs" color={theme.colors.on_surface_variant} numberOfLines={2} ellipsizeMode='tail' style={{ marginVertical: 2 }}>
                    {point.description}
                  </Typography>
                )}
              </TouchableOpacity>

              {showActions && (
                <ActionGroup>
                  <ActionButton onPress={() => onCopyAddress?.(point.location)}>
                    <Icon name="content-copy" size={moderateScale(14)} color={theme.colors.on_surface_variant} />
                    <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant}>
                      Copy
                    </Typography>
                  </ActionButton>
                  <ActionButton onPress={onMapPress}>
                    <Icon name="map-outline" size={moderateScale(16)} color={theme.colors.primary} />
                    <Typography variant="label" size="xs" weight="bold" color={theme.colors.primary}>
                      View Map
                    </Typography>
                  </ActionButton>
                </ActionGroup>
              )}
            </LocationInfo>
          </RightContent>
        </TimelineRow>
      ))}
    </Container>
  );
};

