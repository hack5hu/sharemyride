import React from 'react';
import { 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  View
} from 'react-native';
import { ScreenShell } from '../../molecules/ScreenShell';
import { 
  MainContent, 
  FooterContainer, 
  ScrollContainer 
} from './ProfileSetupTemplate.styles';
import { ProfileSetupTemplateProps } from './types.d';

export const ProfileSetupTemplate: React.FC<ProfileSetupTemplateProps> = ({
  hero,
  identityCard,
  preferences,
  infoBar,
  footer,
}) => {
  return (
    <ScreenShell>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            scrollEventThrottle={16}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
          >
            <ScrollContainer>
              <MainContent>
                {hero}
                {identityCard}
                {preferences}
                {infoBar}
              </MainContent>
            </ScrollContainer>
          </ScrollView>
        </KeyboardAvoidingView>

        <FooterContainer>
          {footer}
        </FooterContainer>
      </View>
    </ScreenShell>
  );
};
