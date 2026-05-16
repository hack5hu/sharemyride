import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { DriverProfileSummary } from '@/components/molecules/DriverProfileSummary';
import { RideTimestampRow } from '@/components/molecules/RideTimestampRow';
import { 
  Container, 
  CardHeader, 
  TimerBadge, 
  TimerText, 
  StatusTag,
  StatusTagText,
  ProfileWrapper
} from './UpcomingRideCard.styles';
import { UpcomingRideCardProps } from './types.d';
import { moderateScale } from '@/styles';

export const UpcomingRideCard: React.FC<UpcomingRideCardProps> = ({
  timerLabel,
  driverName,
  carModel,
  rating,
  price,
  avatarUri,
  isVerified = true,
  pickupTime,
  pickupLocation,
  dropoffTime,
  dropoffLocation,
  onPress,
  statusTag
}) => {
  const theme = useTheme();

  return (
    <Container onPress={onPress} activeOpacity={0.9}>

      <CardHeader>
        <TimerBadge>
          <Icon 
            name="schedule" 
            size={moderateScale(14)} 
            color={theme.colors.on_secondary_container} 
          />
          <TimerText>{timerLabel}</TimerText>
        </TimerBadge>

        {statusTag && (
          <StatusTag>
            <StatusTagText>{statusTag}</StatusTagText>
          </StatusTag>
        )}
      </CardHeader>

      {(driverName || carModel || rating || avatarUri || price) && (
        <ProfileWrapper>
          <DriverProfileSummary 
            name={driverName}
            vehicleInfo={carModel}
            rating={rating}
            avatarUri={avatarUri}
            isVerified={isVerified}
            price={price}
            variant="upcoming"
          />
        </ProfileWrapper>
      )}

      <RideTimestampRow 
        pickupTime={pickupTime}
        pickupLocation={pickupLocation}
        dropoffTime={dropoffTime}
        dropoffLocation={dropoffLocation}
      />
    </Container>
  );
};
