import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { PublishSuccessTemplate } from '@/components/templates/PublishSuccessTemplate';

export const PublishSuccessScreen: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useAppNavigation();
  const navigation = useAppNavigation();
  const { publishSuccess: t } = useLocale();

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
    />
  );
};
