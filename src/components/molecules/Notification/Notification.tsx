import React, { memo } from 'react';
import { Typography } from '@/components/atoms/Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import {
  NotificationContainer,
  IconContainer,
  ContentContainer,
  CloseButton,
} from './Notification.styles';
import { NotificationProps } from './types';
import { moderateScale } from '@/styles';
import { NotificationType } from '@/constants/enums';

export const Notification: React.FC<NotificationProps> = memo(
  ({ type = NotificationType.INFO, text1, text2, onHide }) => {
    const theme = useTheme();

    const getIcon = () => {
      switch (type) {
        case NotificationType.SUCCESS:
          return { name: 'check-circle', color: theme.colors.primary };
        case NotificationType.ERROR:
          return { name: 'alert-circle', color: theme.colors.error };
        case NotificationType.WARNING:
          return { name: 'alert', color: '#FFAB00' };
        case NotificationType.INFO:
        default:
          return { name: 'information', color: theme.colors.tertiary };
      }
    };

    const icon = getIcon();

    return (
      <NotificationContainer type={type}>
        <IconContainer>
          <Icon name={icon.name} size={moderateScale(24)} color={icon.color} />
        </IconContainer>
        <ContentContainer>
          {text1 && (
            <Typography variant="label" weight="bold" color="on_surface">
              {text1}
            </Typography>
          )}
          {text2 && (
            <Typography variant="body" size="sm" color="on_surface_variant">
              {text2}
            </Typography>
          )}
        </ContentContainer>
        {onHide && (
          <CloseButton onPress={onHide}>
            <Icon
              name="close"
              size={moderateScale(18)}
              color={theme.colors.on_surface_variant}
            />
          </CloseButton>
        )}
      </NotificationContainer>
    );
  }
);
