import React from 'react';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { 
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
    <ScreenShell>
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
    </ScreenShell>
  );
};
