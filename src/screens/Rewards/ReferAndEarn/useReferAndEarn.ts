import Clipboard from '@react-native-clipboard/clipboard';
import { useCallback, useMemo } from 'react';
import { Linking, Share } from 'react-native';
import { showNotification } from '@/components/organisms/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useTranslation } from '@/hooks/useTranslation';
import { useRewardsStore } from '@/store/useRewardsStore';

export const useReferAndEarn = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const coins = useRewardsStore(state => state.coins);
  const getReferralCode = useRewardsStore(state => state.getReferralCode);
  const isRulesModalVisible = useRewardsStore(state => state.isRulesModalVisible);
  const setRulesModalVisible = useRewardsStore(state => state.setRulesModalVisible);

  const referralCode = useMemo(() => {
    return getReferralCode();
  }, [getReferralCode]);

  const shareText = useMemo(() => {
    return t('rewards.shareMessage', { code: referralCode });
  }, [referralCode, t]);

  const handleCopyCode = useCallback(() => {
    Clipboard.setString(referralCode);
    showNotification(
      NotificationType.SUCCESS,
      t('rewards.codeCopied'),
      t('rewards.codeCopiedMessage'),
    );
  }, [referralCode, t]);

  const handleShareWhatsApp = useCallback(async () => {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        await Share.share({
          message: shareText,
          title: t('rewards.referAndEarnTitle'),
        });
      }
    } catch {
      await Share.share({
        message: shareText,
        title: t('rewards.referAndEarnTitle'),
      });
    }
  }, [shareText, t]);

  const handleShareOther = useCallback(async () => {
    try {
      await Share.share({
        message: shareText,
        title: t('rewards.referAndEarnTitle'),
      });
    } catch {
      // Ignored if dismissed by user
    }
  }, [shareText, t]);

  const handleOpenRulesModal = useCallback(() => {
    setRulesModalVisible(true);
  }, [setRulesModalVisible]);

  const handleCloseRulesModal = useCallback(() => {
    setRulesModalVisible(false);
  }, [setRulesModalVisible]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigateToLeaderboard = useCallback(() => {
    navigation.navigate('Leaderboard');
  }, [navigation]);

  return {
    coins,
    referralCode,
    isRulesModalVisible,
    handleBackPress,
    handleCopyCode,
    handleShareWhatsApp,
    handleShareOther,
    handleOpenRulesModal,
    handleCloseRulesModal,
    handleNavigateToLeaderboard,
  };
};
