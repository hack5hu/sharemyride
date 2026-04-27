import React from 'react';
import { useTheme } from 'styled-components/native';
import { 
  FloatingFooter, 
  FooterGradient, 
  ErrorText, 
  PublishButton, 
  PublishGradient, 
  LoadingIndicator, 
  PublishText, 
  TermsText, 
  TermsLink 
} from './PublishFooter.styles';

interface PublishFooterProps {
  isPublishing?: boolean;
  validationError?: string | null;
  canPublish?: boolean;
  onPublish: () => void;
  t: any;
}

export const PublishFooter: React.FC<PublishFooterProps> = ({ 
  isPublishing, 
  validationError, 
  canPublish, 
  onPublish, 
  t 
}) => {
  const theme = useTheme();

  return (
    <FloatingFooter pointerEvents="box-none">
      <FooterGradient
        colors={['transparent', theme.colors.surface, theme.colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        pointerEvents="none"
      />
      {validationError && <ErrorText>{validationError}</ErrorText>}

      <PublishButton 
        onPress={onPublish} 
        activeOpacity={0.9} 
        disabled={!canPublish || isPublishing}
      >
        <PublishGradient
          colors={[theme.colors.primary, theme.colors.primary_container]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ opacity: (!canPublish || isPublishing) ? 0.6 : 1 }}
        >
          {isPublishing ? (
            <LoadingIndicator color={theme.colors.on_primary} />
          ) : (
            <PublishText>{t.publishRideButton}</PublishText>
          )}
        </PublishGradient>
      </PublishButton>
      <TermsText>
        {t.termsText1}
        <TermsLink>{t.termsLink}</TermsLink>
        {t.termsText2}
      </TermsText>
    </FloatingFooter>
  );
};
