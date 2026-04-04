import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  Container, 
  IconBox, 
  TextContent, 
  Title, 
  SubAddress, 
  PriceText 
} from './CompactRideItem.styles';
import { CompactRideItemProps } from './types.d';
import { moderateScale } from '@/styles';

export const CompactRideItem: React.FC<CompactRideItemProps> = ({
  title,
  subtitle,
  price,
  icon,
  iconBg,
  type,
  onPress
}) => {
  const theme = useTheme();
  const isDraft = type === 'draft';
  const displayIcon = isDraft ? 'edit-note' : icon;
  const displayIconColor = isDraft ? theme.colors.outline : theme.colors.on_secondary_fixed_variant;
  const displayIconBg = isDraft ? theme.colors.surface_container_highest : theme.colors.secondary_fixed;

  return (
    <Container isDraft={isDraft} onPress={onPress} activeOpacity={0.7}>
      <IconBox bgColor={iconBg || displayIconBg}>
        <Icon 
          name={displayIcon} 
          size={moderateScale(20)} 
          color={displayIconColor} 
        />
      </IconBox>
      <TextContent>
        <Title numberOfLines={1}>{title}</Title>
        <SubAddress numberOfLines={1}>{subtitle}</SubAddress>
      </TextContent>
      {price && <PriceText>{price}</PriceText>}
      {isDraft && (
        <Icon 
          name="arrow-forward" 
          size={moderateScale(18)} 
          color={theme.colors.primary} 
        />
      )}
    </Container>
  );
};
