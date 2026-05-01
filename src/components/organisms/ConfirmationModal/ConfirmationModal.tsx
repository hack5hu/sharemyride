import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { ModalBackdrop } from '@/components/atoms/ModalBackdrop';
import {
  ModalContainer,
  IconContainer,
  TextContainer,
  ButtonContainer,
  PrimaryButton,
  GradientBtn,
  SecondaryButton,
} from './ConfirmationModal.styles';
import { ConfirmationModalProps } from './types.d';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  type = 'info',
}) => {
  const theme = useTheme();

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'error-outline',
          color: theme.colors.error || '#BA1A1A',
        };
      case 'warning':
        return {
          icon: 'warning-amber',
          color: theme.colors.tertiary || '#7D5800',
        };
      default:
        return {
          icon: 'info-outline',
          color: theme.colors.primary,
        };
    }
  };

  const { icon, color } = getTypeStyles();

  return (
    <ModalBackdrop isVisible={isVisible} onPress={isLoading ? undefined : onClose}>
      <Pressable 
        onPress={(e) => e.stopPropagation()} 
        style={{ width: '100%', alignItems: 'center' }}
      >
        <ModalContainer>
          <IconContainer color={color}>
            <Icon name={icon} size={32} color={color} />
          </IconContainer>

          <TextContainer>
            <Typography variant="headline" size="sm" weight="bold" align="center">
              {title}
            </Typography>
            <Typography 
              variant="body" 
              size="sm" 
              color="on_surface_variant" 
              align="center"
              style={{ marginTop: 8 }}
            >
              {message}
            </Typography>
          </TextContainer>

          <ButtonContainer>
            <SecondaryButton onPress={onClose} disabled={isLoading}>
              <Typography variant="title" size="sm" weight="bold" color="on_surface_variant">
                {cancelLabel}
              </Typography>
            </SecondaryButton>

            <PrimaryButton onPress={onConfirm} disabled={isLoading}>
              <GradientBtn
                colors={
                  type === 'danger'
                    ? [theme.colors.error || '#BA1A1A', theme.colors.error_container || '#FFDAD6']
                    : [theme.colors.primary, theme.colors.primary_container]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.on_primary} />
                ) : (
                  <Typography variant="title" size="sm" weight="bold" color="on_primary">
                    {confirmLabel}
                  </Typography>
                )}
              </GradientBtn>
            </PrimaryButton>
          </ButtonContainer>
        </ModalContainer>
      </Pressable>
    </ModalBackdrop>
  );
};
