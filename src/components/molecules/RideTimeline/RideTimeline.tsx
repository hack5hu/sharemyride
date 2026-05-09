import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale } from '@/styles';
import { TimelinePoint } from '@/screens/BookFlow/3_AvailableRides/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const Point = styled.View<{ type: 'pickup' | 'stop' | 'destination', isHighlighted?: boolean }>`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme, type, isHighlighted }) => 
    isHighlighted ? theme.colors.primary :
    type === 'pickup' ? theme.colors.primary : 
    type === 'destination' ? theme.colors.tertiary : 
    theme.colors.outline_variant};
  z-index: 2;
  margin-top: ${verticalScale(4)}px;
  border-width: ${moderateScale(2)}px;
  border-color: ${({ theme, type, isHighlighted }) => 
    isHighlighted ? theme.colors.on_primary :
    type === 'pickup' ? theme.colors.primary_fixed : 
    type === 'destination' ? theme.colors.tertiary_fixed : 
    'white'};
  elevation: ${({ isHighlighted }) => isHighlighted ? 4 : 0};
  transform: scale(${({ isHighlighted }) => isHighlighted ? 1.3 : 1});
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

const IconButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(8)}px;
`;

const InlineActionGroup = styled.View`
  flex-direction: row;
  gap: ${scale(8)}px;
  align-items: center;
`;

const FeedbackText = styled(Typography)`
  position: absolute;
  top: ${verticalScale(28)}px;
  right: 0;
  background-color: ${({ theme }) => theme.colors.on_surface};
  color: ${({ theme }) => theme.colors.surface};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(9)}px;
  border-radius: ${moderateScale(8)}px;
  z-index: 10;
  width: ${scale(54)}px;
`;

const LocationWrapper = styled.View`
  width: 100%;
`;

const LocationHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

const LocationPressable = styled.TouchableOpacity`
  flex: 1;
  padding-right: ${scale(8)}px;
`;

const DescriptionText = styled(Typography)`
  margin-vertical: ${verticalScale(2)}px;
`;



export const RideTimeline: React.FC<{ 
  points: TimelinePoint[]; 
  showActions?: boolean;
  onMapPress?: (index: number) => void;
  onCopyAddress?: (address: string) => void;
}> = ({ points, showActions, onMapPress, onCopyAddress }) => {
  const theme = useTheme();
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (address: string, index: number) => {
    onCopyAddress?.(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  return (
    <Container>
      {points.map((point, index) => (
        <TimelineRow key={index}>
          <LeftContent>
            <TimeText color={point.type === 'stop' ? theme.colors.on_surface_variant : undefined}>
              {point.time}
            </TimeText>
            {point.durationSincePrevious && (
              <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>
                {point.durationSincePrevious}
              </Typography>
            )}
          </LeftContent>

            <DashColumn>
              <Point type={point.type} isHighlighted={point.isHighlighted} />
              {index < points.length - 1 && <DashLine />}
            </DashColumn>
  
            <RightContent>
              <Typography 
                variant="body" 
                size="md" 
                weight={point.isHighlighted ? "bold" : "medium"} 
                numberOfLines={2} 
                ellipsizeMode='tail'
                color={point.isHighlighted ? theme.colors.primary : theme.colors.on_surface_variant}
              >
                {point.location}
              </Typography>
            {point.description && (
              <DescriptionText variant="label" size="xs" color={theme.colors.on_surface_variant} numberOfLines={2} ellipsizeMode='tail'>
                {point.description}
              </DescriptionText>
            )}

            {point.isHighlighted && (
              <ActionGroup>
                <IconButton onPress={() => handleCopy(point.location, index)}>
                  {copiedIndex === index && <FeedbackText variant="label" size="xs">Copied!</FeedbackText>}
                  <Icon name={copiedIndex === index ? "check" : "content-copy"} size={moderateScale(16)} />
                </IconButton>
                <IconButton onPress={() => onMapPress?.(index)}>
                  <Icon name="map" size={moderateScale(18)} color={theme.colors.primary} />
                </IconButton>
              </ActionGroup>
            )}
          </RightContent>
        </TimelineRow>
      ))}
    </Container>
  );
};

