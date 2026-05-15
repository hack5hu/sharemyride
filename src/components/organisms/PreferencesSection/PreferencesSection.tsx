import React from 'react';
import { Toggle } from '@/components/atoms/Toggle';
import { 
  ToggleRow, 
  Container, 
  Row, 
  NewsletterSurface, 
  NewsletterLabel 
} from './PreferencesSection.styles';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/hooks/useTranslation';

export interface PreferencesSectionProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = React.memo(({
  values,
  setFieldValue,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <NewsletterSurface elevation="low" rounded="md" padding="lg">
          <NewsletterLabel
            variant="label"
            size="sm"
            weight="bold"
            color="on_surface_variant"
          >
            {t('profileSetup.newsletter')}
          </NewsletterLabel>
          <ToggleRow>
            <Typography variant="body" size="sm" weight="bold">
              {t('profileSetup.personalizedSuggestions')}
            </Typography>
            <Toggle
              value={values.newsletter}
              onValueChange={(val) => setFieldValue('newsletter', val)}
            />
          </ToggleRow>
        </NewsletterSurface>
      </Row>
    </Container>
  );
});

PreferencesSection.displayName = 'PreferencesSection';
