import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useTheme } from 'styled-components/native';
import { PublishSuccessTemplate } from '@/components/templates/PublishSuccessTemplate';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export const PublishSuccessScreen: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useAppNavigation();
  const navigation = useAppNavigation();
  const route = useRoute();
  const { publishSuccess: t } = useLocale();

  const params = route.params as any;
  const skippedMessage: string | undefined = params?.skippedMessage;

  // Disable header back button
  useEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);

  // Disable hardware back button (Android)
  useFocusEffect(
    React.useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => true);

      return () => sub.remove();
    }, []),
  );

  const handleGoToMyRides = () => {
    navigate('MyRides');
  };

  const handleShareResult = () => {
    // Share functionality
  };

  return (
    <PublishSuccessTemplate
      handleGoToMyRides={handleGoToMyRides}
      handleShareResult={handleShareResult}
      t={t}
      theme={theme}
      skippedMessage={skippedMessage}
    />
  );
};
