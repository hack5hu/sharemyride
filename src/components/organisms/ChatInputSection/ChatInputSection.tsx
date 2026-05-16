import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { SafetyBanner } from '@/components/molecules/SafetyBanner';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Container, 
  InputWrapper, 
  LocationButton, 
  InputFieldContainer, 
  StyledInput, 
  SendButton 
} from './ChatInputSection.styles';
import { ChatInputSectionProps } from './types.d';
import { moderateScale, verticalScale } from '@/styles';

export const ChatInputSection: React.FC<ChatInputSectionProps> = ({
  value,
  onChangeText,
  onSendPress,
  onLocationPress,
  placeholder = 'Type a message...',
  safetyMessage,
  onSafetyClose,
  isSendDisabled,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const bottomInset = isKeyboardVisible ? 0 : insets.bottom;

  return (
    <Container style={{ paddingBottom: Math.max(bottomInset, verticalScale(4)) }}>
      {safetyMessage && (
        <SafetyBanner message={safetyMessage} onClose={onSafetyClose} />
      )}
      
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
          <SendButton 
            onPress={onSendPress} 
            activeOpacity={0.9} 
            disabled={isSendDisabled}
          >
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
