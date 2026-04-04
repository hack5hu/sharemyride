import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { 
  Container, 
  LeftSection, 
  AvatarWrapper, 
  Avatar, 
  InfoSection, 
  Name, 
  RatingRow, 
  SubInfo, 
  PriceText 
} from './DriverProfileSummary.styles';
import { DriverProfileSummaryProps } from './types.d';
import { moderateScale } from '@/styles';

export const DriverProfileSummary: React.FC<DriverProfileSummaryProps> = ({
  name,
  rating,
  totalRides,
  vehicleInfo,
  avatarUri,
  isVerified = false,
  price,
  variant = 'upcoming'
}) => {
  const theme = useTheme();
  const iconColor = variant === 'bento' ? theme.colors.on_primary_fixed_variant : theme.colors.primary;

  return (
    <Container>
      <LeftSection>
        <AvatarWrapper>
          <Avatar source={{ uri: avatarUri }} />
          {isVerified && (
            <View style={{ position: 'absolute', bottom: -2, right: -2 }}>
               <VerifiedBadge size={16} />
            </View>
          )}
        </AvatarWrapper>
        
        <InfoSection>
          <Name variant={variant}>{name}</Name>
          <RatingRow>
            {rating && (
              <>
                <Icon 
                  name="star" 
                  size={moderateScale(12)} 
                  color={iconColor} 
                  style={{ fontVariationSettings: "'FILL' 1" }}
                />
                <SubInfo variant={variant}>{rating} {totalRides ? `• ${totalRides}` : ''}</SubInfo>
              </>
            )}
            {vehicleInfo && !totalRides && (
              <SubInfo variant={variant}>{vehicleInfo}</SubInfo>
            )}
          </RatingRow>
        </InfoSection>
      </LeftSection>
      
      {price && <PriceText>{price}</PriceText>}
    </Container>
  );
};

import { View } from 'react-native';
