import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { SafetyBanner } from '@/components/molecules/SafetyBanner';
import { 
  Container, 
  InputWrapper, 
  LocationButton, 
  InputFieldContainer, 
  StyledInput, 
  SendButton 
} from './ChatInputSection.styles';
import { ChatInputSectionProps } from './types.d';
import { moderateScale } from '@/styles';

export const ChatInputSection: React.FC<ChatInputSectionProps> = ({
  value,
  onChangeText,
  onSendPress,
  onLocationPress,
  placeholder = 'Type a message...',
  safetyMessage,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <SafetyBanner message={safetyMessage} />
      
      <InputWrapper>
        <LocationButton onPress={onLocationPress} activeOpacity={0.8}>
          <Icon 
            name="share-location" 
            size={moderateScale(24)} 
            color={theme.colors.primary} 
          />
        </LocationButton>
        
        <InputFieldContainer>
          <StyledInput 
            placeholder={placeholder}
            placeholderTextColor={theme.colors.on_surface_variant}
            value={value}
            onChangeText={onChangeText}
            multiline={false}
          />
          <SendButton onPress={onSendPress} activeOpacity={0.9}>
            <Icon 
              name="send" 
              size={moderateScale(20)} 
              color="#FFFFFF" 
            />
          </SendButton>
        </InputFieldContainer>
      </InputWrapper>
    </Container>
  );
};
