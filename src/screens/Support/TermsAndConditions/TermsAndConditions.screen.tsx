import React from 'react';
import { SupportTemplate } from '@/components/templates/SupportTemplate';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';

export const TermsAndConditionsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  return (
    <SupportTemplate
      title={t('dummyContent.termsTitle') || 'Terms & Conditions'}
      content={t('dummyContent.termsBody') || ''}
      onBack={() => navigation.goBack()}
    />
  );
};
