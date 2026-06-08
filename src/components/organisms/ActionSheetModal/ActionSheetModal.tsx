import React from 'react';
import { Pressable } from 'react-native';
import { ModalBackdrop } from '@/components/atoms/ModalBackdrop';
import { Typography } from '@/components/atoms/Typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { ActionSheetModalProps } from './types.d';
import { ModalContainer, TitleContainer, OptionItem } from './ActionSheetModal.styles';

export const ActionSheetModal: React.FC<ActionSheetModalProps> = ({
  isVisible,
  onClose,
  title,
  options,
}) => {
  const theme = useTheme();

  return (
    <ModalBackdrop isVisible={isVisible} onPress={onClose}>
      <Pressable 
        onPress={(e) => e.stopPropagation()} 
        style={{ width: '100%', alignItems: 'center' }}
      >
        <ModalContainer>
          {title && (
            <TitleContainer>
              <Typography variant="title" size="md" weight="bold" color="on_surface">
                {title}
              </Typography>
            </TitleContainer>
          )}
          
          {options.map((option) => (
            <OptionItem 
              key={option.id} 
              onPress={option.onPress}
            >
              {option.icon && (
                <Icon 
                  name={option.icon} 
                  size={20} 
                  color={option.isDestructive ? theme.colors.error : theme.colors.on_surface} 
                />
              )}
              <Typography 
                variant="body" 
                size="lg" 
                weight={option.isDestructive ? 'bold' : 'medium'}
                color={option.isDestructive ? 'error' : 'on_surface'}
              >
                {option.label}
              </Typography>
            </OptionItem>
          ))}
        </ModalContainer>
      </Pressable>
    </ModalBackdrop>
  );
};
