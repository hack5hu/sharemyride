import React from 'react';
import { Camera } from '@maplibre/maplibre-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  Container, 
  MapWrapper, 
  StyledOlaMap, 
  InfoContainer, 
  LocationName, 
  Address,
  MarkerOverlay,
} from './ChatMapPreview.styles';
import { ChatMapPreviewProps } from './types.d';
import { moderateScale } from '@/styles';

export const ChatMapPreview: React.FC<ChatMapPreviewProps> = ({
  latitude,
  longitude,
  locationName,
  address,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Container activeOpacity={0.9} onPress={onPress}>
      <MapWrapper pointerEvents="none">
        <StyledOlaMap
          mapStyle="https://api.olamaps.io/tiles/vector/v1/styles/default-dark-standard/style.json"
        >
          <Camera
            center={[longitude, latitude]}
            zoom={15}
          />
        </StyledOlaMap>
        <MarkerOverlay>
          <Icon name="location-on" size={moderateScale(32)} color={theme.colors.error} />
        </MarkerOverlay>
      </MapWrapper>
      <InfoContainer>
        <LocationName numberOfLines={1}>
          {locationName || 'Selected Location'}
        </LocationName>
        {!!address && (
          <Address numberOfLines={1}>{address}</Address>
        )}
      </InfoContainer>
    </Container>
  );
};
