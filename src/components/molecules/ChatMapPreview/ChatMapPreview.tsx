import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { OLA_API_KEY } from '@/constants/OlaStyle';
import { moderateScale } from '@/styles';
import {
  Container,
  MapWrapper,
  StaticMapImage,
  MapPlaceholder,
  InfoContainer,
  LocationName,
  Address,
  MarkerOverlay,
} from './ChatMapPreview.styles';
import { type ChatMapPreviewProps } from './types.d';

export const ChatMapPreview: React.FC<ChatMapPreviewProps> = ({
  latitude,
  longitude,
  locationName,
  address,
  onPress,
}) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  const staticMapUrl = `https://api.olamaps.io/places/v1/staticmap?center=${latitude},${longitude}&zoom=15&size=480x280&api_key=${OLA_API_KEY}`;

  return (
    <Container activeOpacity={0.9} onPress={onPress}>
      <MapWrapper pointerEvents="none">
        {!imageError ? (
          <StaticMapImage
            source={{ uri: staticMapUrl }}
            onError={() => setImageError(true)}
            resizeMode="cover"
          />
        ) : (
          <MapPlaceholder>
            <Icon
              name="map"
              size={moderateScale(40)}
              color={theme.colors.surface_variant}
            />
          </MapPlaceholder>
        )}
        <MarkerOverlay>
          <Icon
            name="location-on"
            size={moderateScale(32)}
            color={theme.colors.error}
          />
        </MarkerOverlay>
      </MapWrapper>
      <InfoContainer>
        <LocationName numberOfLines={1}>{locationName}</LocationName>
        {!!address && <Address numberOfLines={1}>{address}</Address>}
      </InfoContainer>
    </Container>
  );
};
