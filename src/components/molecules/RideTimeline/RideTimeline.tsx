/* eslint-disable max-lines */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { type TimelinePoint } from '@/screens/BookFlow/3_AvailableRides/types';
import { moderateScale, scale, verticalScale } from '@/styles';

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

const Point = styled.View<{
  type: 'pickup' | 'stop' | 'destination';
  isHighlighted?: boolean;
}>`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme, type, isHighlighted }) =>
    isHighlighted
      ? theme.colors.primary
      : type === 'pickup'
      ? theme.colors.primary
      : type === 'destination'
      ? theme.colors.tertiary
      : theme.colors.outline_variant};
  z-index: 2;
  margin-top: ${verticalScale(4)}px;
  border-width: ${moderateScale(2)}px;
  border-color: ${({ theme, type, isHighlighted }) =>
    isHighlighted
      ? theme.colors.on_primary
      : type === 'pickup'
      ? theme.colors.primary_fixed
      : type === 'destination'
      ? theme.colors.tertiary_fixed
      : theme.colors.surface_container_lowest};
  elevation: ${({ isHighlighted }) => (isHighlighted ? 4 : 0)};
  transform: scale(${({ isHighlighted }) => (isHighlighted ? 1.3 : 1)});
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
  width: ${scale(72)}px;
  align-items: flex-end;
  padding-right: ${scale(12)}px;
  padding-top: ${verticalScale(2)}px;
`;

const DurationTrackContainer = styled.View`
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(6)}px;
  align-items: flex-end;
`;

const RightContent = styled.View<{ isLast?: boolean }>`
  flex: 1;
  padding-left: ${scale(14)}px;
  padding-bottom: ${({ isLast }) =>
    isLast ? verticalScale(4) : verticalScale(16)}px;
  align-items: flex-start;
`;

const TimeText = styled(Typography)`
  font-size: ${moderateScale(12)}px;
  font-weight: 800;
`;

const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(4)}px;
  flex-wrap: wrap;
`;

const TagBadge = styled.View<{ type?: string }>`
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme, type }) =>
    type === 'pickup'
      ? `${theme.colors.primary}14`
      : type === 'destination'
      ? `${theme.colors.tertiary || theme.colors.primary}14`
      : theme.colors.surface_container_high};
`;

const ActionPill = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
`;

const LocationPressable = styled.TouchableOpacity`
  width: 100%;
`;

export const RideTimeline: React.FC<{
  points: TimelinePoint[];
  showActions?: boolean;
  onMapPress?: (index: number) => void;
  onCopyAddress?: (address: string) => void;
  isDriver?: boolean;
}> = ({
  points,
  showActions = true,
  onMapPress,
  onCopyAddress,
  isDriver = false,
}) => {
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
            <TimeText
              color={
                point.type === 'stop'
                  ? theme.colors.on_surface_variant
                  : theme.colors.primary
              }
            >
              {point.time}
            </TimeText>
            {points[index + 1]?.durationSincePrevious ? (
              <DurationTrackContainer>
                <Typography
                  variant="label"
                  size="xs"
                  weight="bold"
                  color={theme.colors.on_surface_variant}
                >
                  {points[index + 1].durationSincePrevious}
                </Typography>
              </DurationTrackContainer>
            ) : null}
          </LeftContent>

          <DashColumn>
            <Point
              type={point.type}
              isHighlighted={point.isHighlighted || isDriver}
            />
            {index < points.length - 1 && <DashLine />}
          </DashColumn>

          <RightContent isLast={index === points.length - 1}>
            <LocationPressable
              onPress={() => onMapPress?.(index)}
              disabled={!onMapPress}
              activeOpacity={0.7}
            >
              <Typography
                variant="body"
                size="sm"
                weight={point.isHighlighted || isDriver ? 'bold' : 'medium'}
                color={
                  point.isHighlighted || isDriver
                    ? theme.colors.primary
                    : theme.colors.on_surface_variant
                }
              >
                {point.location}
              </Typography>
            </LocationPressable>

            {(point.description || (showActions && (point.isHighlighted || isDriver))) ? (
              <MetaRow>
                {point.description ? (
                  <TagBadge type={point.type}>
                    <Typography
                      variant="label"
                      size="xs"
                      weight="bold"
                      color={
                        point.type === 'pickup'
                          ? theme.colors.primary
                          : point.type === 'destination'
                          ? theme.colors.tertiary || theme.colors.primary
                          : theme.colors.on_surface_variant
                      }
                    >
                      {point.description}
                    </Typography>
                  </TagBadge>
                ) : null}

                {showActions && (point.isHighlighted || isDriver) && (
                  <>
                    <ActionPill
                      onPress={() => handleCopy(point.location, index)}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name={copiedIndex === index ? 'check' : 'content-copy'}
                        size={moderateScale(12)}
                        color={
                          copiedIndex === index
                            ? theme.colors.success || '#10b981'
                            : theme.colors.on_surface_variant
                        }
                      />
                      <Typography
                        variant="label"
                        size="xs"
                        weight="medium"
                        color={
                          copiedIndex === index
                            ? theme.colors.success || '#10b981'
                            : theme.colors.on_surface_variant
                        }
                      >
                        {copiedIndex === index ? 'Copied' : 'Copy'}
                      </Typography>
                    </ActionPill>

                    {onMapPress && (
                      <ActionPill
                        onPress={() => onMapPress(index)}
                        activeOpacity={0.7}
                      >
                        <Icon
                          name="place"
                          size={moderateScale(12)}
                          color={theme.colors.primary}
                        />
                        <Typography
                          variant="label"
                          size="xs"
                          weight="medium"
                          color={theme.colors.primary}
                        >
                          Map
                        </Typography>
                      </ActionPill>
                    )}
                  </>
                )}
              </MetaRow>
            ) : null}
          </RightContent>
        </TimelineRow>
      ))}
    </Container>
  );
};
