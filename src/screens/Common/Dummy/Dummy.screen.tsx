import { useAppNavigation } from '@/hooks/useAppNavigation';
import React from 'react';
import { Linking } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { BottomNav, BottomTabType } from '@/components/organisms/BottomNav';
import { RootStackParamList } from '@/navigation/types';
import { useTranslation } from '@/hooks/useTranslation';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './Dummy.styles';

export const DummyScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Dummy'>>();
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const {
    title,
    activeTab,
    showBottomNav = true,
    showBack = false,
    contentKey
  } = route.params;

  const getContent = () => {
    if (!contentKey) return null;
    switch (contentKey) {
      case 'about':
        return {
          title: t('dummyContent.aboutTitle'),
          body: t('dummyContent.aboutBody')
        };
      case 'help':
        return {
          title: t('dummyContent.helpTitle'),
          body: t('dummyContent.helpBody')
        };
      case 'terms':
        return {
          title: t('dummyContent.termsTitle'),
          body: t('dummyContent.termsBody')
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
    <ScreenShell
      title={title}
      onBack={()=>navigation.goBack()}
    >
      <S.ContentScroll>
        <S.MainContainer>
          {content ? (
            <>
              <S.Card>
                <S.CardTitle>
                  {content.title}
                </S.CardTitle>
                <S.CardBody>
                  {content.body}
                </S.CardBody>

                {contentKey === 'help' && (
                  <S.ActionContainer>
                    <Button
                      title={t('dummyContent.emailUs') || 'Email Support'}
                      onPress={handleEmailSupport}
                      variant="primary"
                    />
                  </S.ActionContainer>
                )}
              </S.Card>

              <S.SectionTitle>
                LATEST UPDATES
              </S.SectionTitle>
              <S.UpdateBox>
                <Typography variant="body" size="sm" color="on_surface">
                  Our commitment to your safety and comfort is our top priority. New features are rolled out every week.
                </Typography>
              </S.UpdateBox>
            </>
          ) : (
            <S.EmptyState>
              <Typography variant="display" size="sm" weight="bold" align="center" color="on_surface">
                {title}
              </Typography>
              <S.EmptySubtitle>
                {title} is part of our upcoming premium feature set. Stay tuned!
              </S.EmptySubtitle>
            </S.EmptyState>
          )}
        </S.MainContainer>
      </S.ContentScroll>

      {showBottomNav && activeTab && (
        <BottomNav activeTab={activeTab as BottomTabType} />
      )}
    </ScreenShell>
  );
};
