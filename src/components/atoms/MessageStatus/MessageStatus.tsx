import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { IconContainer } from './MessageStatus.styles';
import { type MessageStatusProps } from './types.d';

export const MessageStatus: React.FC<MessageStatusProps> = ({
  status,
  color,
}) => {
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
      case 'failed':
        return 'error-outline';
      default:
        return 'done';
    }
  };

  const getIconColor = () => {
    if (color) return color;
    if (status?.toLowerCase() === 'read') return theme.colors.read_receipt; // Classic blue for read receipts
    if (status?.toLowerCase() === 'failed') return theme.colors.error;

    return theme.colors.on_surface_variant;
  };

  return (
    <IconContainer>
      <Icon name={getIcon()} size={moderateScale(14)} color={getIconColor()} />
    </IconContainer>
  );
};
