import { useAppNavigation } from '@/hooks/useAppNavigation';
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { SupportTemplate } from '@/components/templates/SupportTemplate';

export const AboutUsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  return (
    <SupportTemplate
      title={t('dummyContent.aboutTitle') || 'About Us'}
      content={t('dummyContent.aboutBody') || ''}
      onBack={() => navigation.goBack()}
    />
  );
};
