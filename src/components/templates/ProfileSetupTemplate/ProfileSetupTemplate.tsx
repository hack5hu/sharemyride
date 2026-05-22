import React from 'react';
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

        <FooterContainer>
          {footer}
        </FooterContainer>
      </Wrapper>
    </ScreenShell>
  );
};
