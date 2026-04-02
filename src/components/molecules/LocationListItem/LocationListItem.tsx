import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  Container, 
  IconBox, 
  TextContent, 
  Title, 
  SubAddress 
} from './LocationListItem.styles';
import { LocationListItemProps } from './types.d';
import { moderateScale } from '@/styles';

export const LocationListItem: React.FC<LocationListItemProps> = ({ 
  title, 
  address, 
  icon, 
  onPress,
  isCurrentLocation = false
}) => {
  const theme = useTheme();

  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <IconBox isCurrent={isCurrentLocation}>
        <Icon 
          name={icon} 
          size={moderateScale(20)} 
          color={isCurrentLocation ? theme.colors.on_secondary_container : theme.colors.on_surface_variant} 
          style={isCurrentLocation ? { fontVariationSettings: "'FILL' 1" } : {}}
        />
      </IconBox>
      <TextContent>
        <Title>{title}</Title>
        <SubAddress numberOfLines={1}>{address}</SubAddress>
      </TextContent>
    </Container>
  );
};
