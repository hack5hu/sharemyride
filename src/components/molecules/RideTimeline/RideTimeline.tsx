import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale } from '@/styles';
import { TimelinePoint } from '@/screens/AvailableRides/types.d';

const Container = styled.View`
  padding-left: ${scale(8)}px;
`;

const TimelineRow = styled.View`
  flex-direction: row;
  min-height: ${verticalScale(64)}px;
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
  padding-bottom: ${verticalScale(24)}px;
`;

const TimeText = styled(Typography)`
  font-size: ${moderateScale(12)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RideTimeline: React.FC<{ points: TimelinePoint[] }> = ({ points }) => {
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
            <Typography variant="body" size="md" weight="bold">
              {point.location}
            </Typography>
            {point.description && (
              <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>
                {point.description}
              </Typography>
            )}
          </RightContent>
        </TimelineRow>
      ))}
    </Container>
  );
};
