import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { SupportTemplate } from '@/components/templates/SupportTemplate';

export const TermsAndConditionsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  return (
    <SupportTemplate
      title={t('dummyContent.termsTitle') || 'Terms & Conditions'}
      content={t('dummyContent.termsBody') || ''}
      onBack={() => navigation.goBack()}
    />
  );
};
