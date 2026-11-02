import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { CoinBadge } from '@/components/atoms/CoinBadge';
import { CoinRulesModal } from '@/components/molecules/CoinRulesModal';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { HowItWorksCard } from './components/HowItWorksCard';
import { ReferralShareCard } from './components/ReferralShareCard';
import {
  BalanceCard,
  BalanceLabel,
  BalanceLeft,
  BalanceValueRow,
  Container,
  FaqTeaserCard,
  FaqTeaserText,
  HelpLink,
  HelpLinkText,
  HeroCard,
  HeroIconCircle,
  HeroSubtitle,
  HeroTitle,
  ScrollContent,
} from './ReferAndEarnTemplate.styles';
import { type ReferAndEarnTemplateProps } from './types.d';

export const ReferAndEarnTemplate: React.FC<ReferAndEarnTemplateProps> = memo(
  ({
    coins,
    referralCode,
    isRulesModalVisible,
    onBackPress,
    onCopyCode,
    onShareWhatsApp,
    onShareOther,
    onOpenRulesModal,
    onCloseRulesModal,
    onNavigateToLeaderboard,
  }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
      <ScreenShell
        title={t('rewards.referAndEarn')}
        onBack={onBackPress}
        rightElement={
          <CoinBadge
            coins={coins}
            onPress={onOpenRulesModal}
            showHelpIcon
            variant="compact"
          />
        }
      >
        <Container>
          <ScrollContent showsVerticalScrollIndicator={false}>
            {/* Top Balance Summary Card */}
            <BalanceCard>
              <BalanceLeft>
                <BalanceLabel>{t('rewards.coinBalance')}</BalanceLabel>
                <BalanceValueRow>
                  <CoinBadge coins={coins} variant="header" />
                </BalanceValueRow>
              </BalanceLeft>
              <HelpLink onPress={onOpenRulesModal} accessibilityRole="button">
                <Icon
                  name="help-outline"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
                <HelpLinkText>{t('rewards.rulesAndFaq')}</HelpLinkText>
              </HelpLink>
            </BalanceCard>

            {/* Hero Invite Card */}
            <HeroCard>
              <HeroIconCircle>
                <Icon name="card-giftcard" size={moderateScale(34)} color="#FFFFFF" />
              </HeroIconCircle>
              <HeroTitle>{t('rewards.referAndEarnTitle')}</HeroTitle>
              <HeroSubtitle>{t('rewards.referAndEarnSubtitle')}</HeroSubtitle>
            </HeroCard>

            {/* Referral Code & Share CTA */}
            <ReferralShareCard
              referralCode={referralCode}
              onCopyCode={onCopyCode}
              onShareWhatsApp={onShareWhatsApp}
              onShareOther={onShareOther}
            />

            {/* How It Works */}
            <HowItWorksCard />

            {onNavigateToLeaderboard && (
              <FaqTeaserCard onPress={onNavigateToLeaderboard} accessibilityRole="button">
                <FaqTeaserText>{t('rewards.leaderboardTitle')}</FaqTeaserText>
                <Icon
                  name="chevron-right"
                  size={moderateScale(22)}
                  color={theme.colors.on_surface_variant}
                />
              </FaqTeaserCard>
            )}

            {/* Rules & FAQ Teaser */}
            <FaqTeaserCard onPress={onOpenRulesModal} accessibilityRole="button">
              <FaqTeaserText>{t('rewards.rulesModalTitle')}</FaqTeaserText>
              <Icon
                name="chevron-right"
                size={moderateScale(22)}
                color={theme.colors.on_surface_variant}
              />
            </FaqTeaserCard>
          </ScrollContent>
        </Container>

        {/* Coin Rules, FAQ & Terms Modal */}
        <CoinRulesModal
          isVisible={isRulesModalVisible}
          onClose={onCloseRulesModal}
        />
      </ScreenShell>
    );
  },
);

ReferAndEarnTemplate.displayName = 'ReferAndEarnTemplate';
