import React from 'react';
import { Platform, KeyboardAvoidingView, View, Keyboard } from 'react-native';
import { 
  SafeAreaContainer, 
  ScreenContainer, 
  ScrollLayout, 
} from './ChatDetailsTemplate.styles';
import { ChatDetailsTemplateProps } from './types.d';

export const ChatDetailsTemplate: React.FC<ChatDetailsTemplateProps> = ({
  header,
  content,
  input,
}) => {
  return (
    <SafeAreaContainer edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScreenContainer>
          {header}
          
          <ScrollLayout 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {content}
          </ScrollLayout>

          <View>
            {input}
          </View>
        </ScreenContainer>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};
