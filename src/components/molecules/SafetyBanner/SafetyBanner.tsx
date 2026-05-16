import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Container, Message, ContentWrapper, CloseButton } from './SafetyBanner.styles';
import { SafetyBannerProps } from './types.d';
import { moderateScale } from '@/styles';

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ message, onClose }) => {
  const theme = useTheme();

  return (
    <Container>
      <ContentWrapper>
        <Icon 
          name="security" 
          size={moderateScale(18)} 
          color={theme.colors.on_tertiary_container} 
        />
        <Message>{message}</Message>
      </ContentWrapper>
      
      {onClose && (
        <CloseButton onPress={onClose} activeOpacity={0.7}>
          <Icon 
            name="close" 
            size={moderateScale(18)} 
            color={theme.colors.on_tertiary_container} 
            style={{ opacity: 0.7 }}
          />
        </CloseButton>
      )}
    </Container>
  );
};
