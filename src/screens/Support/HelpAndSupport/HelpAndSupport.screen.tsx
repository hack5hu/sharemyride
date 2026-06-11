import { useAppNavigation } from '@/hooks/useAppNavigation';
import React from 'react';
import { Linking } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { SupportTemplate } from '@/components/templates/SupportTemplate';
import { Button } from '@/components/atoms/Button';

export const HelpAndSupportScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@ridepoolcompany.com');
  };

  return (
    <SupportTemplate
      title={t('dummyContent.helpTitle') || 'Help Center'}
      content={t('dummyContent.helpBody') || ''}
      onBack={() => navigation.goBack()}
      actionButton={
        <Button 
          title={t('dummyContent.emailUs') || 'Email Support'} 
          onPress={handleEmailSupport}
          variant="primary"
        />
      }
    />
  );
};
