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
import { TouchableOpacity } from 'react-native';

export const CompactRideItem: React.FC<CompactRideItemProps> = ({
  title,
  subtitle,
  price,
  icon,
  iconBg,
  type,
  onPress,
  actionIcon,
  onActionPress
}) => {
  const theme = useTheme();
  const isDraft = type === 'draft';
  const isCompleted = type === 'completed';
  
  const displayIcon = isDraft ? 'edit-note' : isCompleted ? 'check' : icon;
  
  const displayIconColor = isDraft 
    ? theme.colors.on_surface_variant 
    : isCompleted 
      ? theme.colors.primary 
      : theme.colors.on_secondary_fixed_variant;
      
  const displayIconBg = isDraft 
    ? theme.colors.surface_container_high 
    : isCompleted 
      ? theme.colors.primary + '15' 
      : theme.colors.secondary_fixed;

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
      
      {actionIcon && onActionPress ? (
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            onActionPress();
          }} 
          activeOpacity={0.6}
          style={{ padding: moderateScale(8) }}
        >
          <Icon 
            name={actionIcon} 
            size={moderateScale(20)} 
            color={theme.colors.error} 
          />
        </TouchableOpacity>
      ) : isDraft && (
        <Icon 
          name="arrow-forward" 
          size={moderateScale(18)} 
          color={theme.colors.primary} 
        />
      )}
    </Container>
  );
};
