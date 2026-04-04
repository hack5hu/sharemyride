import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { DriverProfileSummary } from '@/components/molecules/DriverProfileSummary';
import { 
  Container, 
  GhostIconWrapper, 
  Header, 
  RouteSummary, 
  RouteItem, 
  StopPoint, 
  StopLabel, 
  ActionButton, 
  ActionText 
} from './MatchedRideBento.styles';
import { MatchedRideBentoProps } from './types.d';
import { moderateScale } from '@/styles';

export const MatchedRideBento: React.FC<MatchedRideBentoProps> = ({
  driverName,
  rating,
  totalRides,
  avatarUri,
  pickup,
  dropoff,
  onAccept,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Container onPress={onPress} activeOpacity={0.9}>
      <GhostIconWrapper>
        <Icon name="auto-awesome" size={moderateScale(80)} color="#fff" />
      </GhostIconWrapper>
      
      <Header>
        <DriverProfileSummary 
          name={driverName}
          rating={rating}
          totalRides={totalRides}
          avatarUri={avatarUri}
          isVerified={true}
          variant="bento"
        />
        <StatusBadge label="Matched" variant="matched" />
      </Header>

      <RouteSummary>
        <RouteItem>
          <Icon name="radio-button-unchecked" size={moderateScale(16)} color={theme.colors.on_primary_fixed_variant} style={{ opacity: 0.6 }} />
          <StopLabel>{pickup}</StopLabel>
        </RouteItem>
        <StopPoint />
        <RouteItem>
          <Icon name="location-on" size={moderateScale(16)} color={theme.colors.on_primary_fixed_variant} />
          <StopLabel>{dropoff}</StopLabel>
        </RouteItem>
      </RouteSummary>

      <ActionButton onPress={onAccept} activeOpacity={0.8}>
        <ActionText>Accept Ride Request</ActionText>
      </ActionButton>
    </Container>
  );
};
