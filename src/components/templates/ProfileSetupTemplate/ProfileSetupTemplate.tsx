import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenShell } from '../../molecules/ScreenShell';
import { 
  MainContent, 
  FooterContainer, 
  ScrollContainer,
  Wrapper,
  StyledKeyboardScrollView
} from './ProfileSetupTemplate.styles';
import { ProfileSetupTemplateProps } from './types.d';

export const ProfileSetupTemplate: React.FC<ProfileSetupTemplateProps> = ({
  hero,
  identityCard,
  preferences,
  infoBar,
  footer,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenShell>
      <Wrapper>
        <StyledKeyboardScrollView>
          <ScrollContainer>
            <MainContent>
              {hero}
              {identityCard}
              {preferences}
              {infoBar}
            </MainContent>
          </ScrollContainer>
        </StyledKeyboardScrollView>

        <FooterContainer insetsBottom={insets.bottom}>
          {footer}
        </FooterContainer>
      </Wrapper>
    </ScreenShell>
  );
};
