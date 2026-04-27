import React from 'react';
import { Platform, KeyboardAvoidingView, View, FlatList } from 'react-native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { 
  ScreenContainer, 
} from './ChatDetailsTemplate.styles';
import { moderateScale } from '@/styles';

export interface ChatDetailsTemplateProps {
  header: React.ReactNode;
  data: any[];
  renderItem: any;
  ListHeaderComponent?: React.ReactNode;
  input: React.ReactNode;
}

export const ChatDetailsTemplate: React.FC<ChatDetailsTemplateProps> = ({
  header,
  data,
  renderItem,
  ListHeaderComponent,
  input,
}) => {
  return (
    <ScreenShell>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScreenContainer>
          {header}
          
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{
              padding: moderateScale(24),
              gap: moderateScale(12)
            }}
            ListHeaderComponent={
              <View style={{ marginBottom: moderateScale(16) }}>
                {ListHeaderComponent}
              </View>
            }
          />

          <View>
            {input}
          </View>
        </ScreenContainer>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
};
