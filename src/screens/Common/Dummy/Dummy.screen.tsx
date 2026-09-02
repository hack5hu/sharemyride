import { useRoute, type RouteProp } from '@react-navigation/native';
import React from 'react';
import { Linking } from 'react-native';
import { type BottomTabType } from '@/components/organisms/BottomNav';
import { DummyTemplate } from '@/components/templates/DummyTemplate';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { type RootStackParamList } from '@/navigation/types';

export const DummyScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Dummy'>>();
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const {
    title,
    activeTab,
    showBottomNav = true,
    showBack = false,
    contentKey,
  } = route.params;

  const getContent = () => {
    if (!contentKey) return null;
    switch (contentKey) {
      case 'about':
        return {
          title: t('dummyContent.aboutTitle'),
          body: t('dummyContent.aboutBody'),
        };
      case 'help':
        return {
          title: t('dummyContent.helpTitle'),
          body: t('dummyContent.helpBody'),
        };
      case 'terms':
        return {
          title: t('dummyContent.termsTitle'),
          body: t('dummyContent.termsBody'),
        };
      default:
        return null;
    }
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@ridepoolcompany.com');
  };

  const content = getContent();

  return (
    <DummyTemplate
      title={title}
      activeTab={activeTab as BottomTabType}
      showBottomNav={showBottomNav}
      contentKey={contentKey}
      content={content}
      handleEmailSupport={handleEmailSupport}
      goBack={() => navigation.goBack()}
      t={t}
    />
  );
};
