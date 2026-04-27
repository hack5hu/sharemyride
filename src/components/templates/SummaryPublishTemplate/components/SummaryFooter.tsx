import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { 
  FloatingFooter, 
  FooterGradient, 
  PublishButton, 
  PublishGradient, 
  PublishText, 
  TermsText, 
  TermsLink 
} from './SummaryFooter.styles';

interface SummaryFooterProps {
  isPublishing: boolean;
  canPublish: boolean;
  onPublish: () => void;
}

export const SummaryFooter: React.FC<SummaryFooterProps> = ({ isPublishing, canPublish, onPublish }) => {
  const theme = useTheme();

  return (
    <FloatingFooter>
      <FooterGradient 
        colors={['transparent', theme.colors.surface]} 
        start={{x: 0, y: 0}} 
        end={{x: 0, y: 0.4}} 
      />
      
      <PublishButton 
        onPress={onPublish} 
        disabled={!canPublish || isPublishing}
        activeOpacity={0.8}
      >
        <PublishGradient 
          colors={canPublish ? [theme.colors.primary, theme.colors.primary_container] : [theme.colors.surface_container_high, theme.colors.surface_container_highest]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
          {isPublishing ? (
            <ActivityIndicator color={theme.colors.on_primary} />
          ) : (
            <PublishText>Publish Ride</PublishText>
          )}
        </PublishGradient>
      </PublishButton>
      
      <TermsText>
        By publishing, you agree to our <TermsLink>Community Guidelines</TermsLink> and <TermsLink>Safety Terms</TermsLink>.
      </TermsText>
    </FloatingFooter>
  );
};
