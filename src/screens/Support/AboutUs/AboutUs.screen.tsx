import React from 'react';
import { SupportTemplate } from '@/components/templates/SupportTemplate';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';

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
