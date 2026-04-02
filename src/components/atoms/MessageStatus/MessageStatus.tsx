import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { IconContainer } from './MessageStatus.styles';
import { MessageStatusProps } from './types.d';
import { moderateScale } from '@/styles';

export const MessageStatus: React.FC<MessageStatusProps> = ({ status, color }) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (status) {
      case 'sent':
        return 'done';
      case 'delivered':
      case 'read':
        return 'done-all';
      case 'pending':
        return 'schedule';
      default:
        return 'done';
    }
  };

  const getIconColor = () => {
    if (color) return color;
    if (status === 'read') return theme.colors.primary;
    return theme.colors.on_surface_variant;
  };

  return (
    <IconContainer>
      <Icon 
        name={getIcon()} 
        size={moderateScale(14)} 
        color={getIconColor()} 
      />
    </IconContainer>
  );
};
