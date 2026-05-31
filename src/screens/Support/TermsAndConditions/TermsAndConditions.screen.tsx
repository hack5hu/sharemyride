import { useAppNavigation } from '@/hooks/useAppNavigation';
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { SupportTemplate } from '@/components/templates/SupportTemplate';

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
