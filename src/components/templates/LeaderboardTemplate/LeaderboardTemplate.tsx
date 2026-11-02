import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { CoinBadge } from '@/components/atoms/CoinBadge';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { LeaderboardView } from './components/LeaderboardView';
import { MyCouponsView } from './components/MyCouponsView';
import { RedeemCouponsView } from './components/RedeemCouponsView';
import * as S from './LeaderboardTemplate.styles';
import { type LeaderboardTemplateProps } from './types.d';

export const LeaderboardTemplate: React.FC<LeaderboardTemplateProps> = memo(
  ({
    coins,
    activeTab,
    activeRole,
    topDrivers,
    topRiders,
    currentUser,
    redeemableCoupons,
    claimedCoupons,
    onSelectTab,
    onSelectRole,
    onRedeemCoupon,
    onCopyCouponCode,
    onBack,
    onOpenRules,
  }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
      <S.Container>
        <S.Header>
          <S.BackButton onPress={onBack} accessibilityRole="button">
            <Icon
              name="arrow-back"
              size={moderateScale(24)}
              color={theme.colors.on_surface}
            />
          </S.BackButton>
          <S.HeaderTitle>{t('rewards.leaderboardTitle')}</S.HeaderTitle>
          <CoinBadge coins={coins} onPress={onOpenRules} />
        </S.Header>

        <S.TabBar>
          <S.TabButton
            active={activeTab === 'leaderboard'}
            onPress={() => onSelectTab('leaderboard')}
          >
            <S.TabText active={activeTab === 'leaderboard'}>
              {t('rewards.tabLeaderboard')}
            </S.TabText>
          </S.TabButton>
          <S.TabButton
            active={activeTab === 'redeem'}
            onPress={() => onSelectTab('redeem')}
          >
            <S.TabText active={activeTab === 'redeem'}>
              {t('rewards.tabRedeem')}
            </S.TabText>
          </S.TabButton>
          <S.TabButton
            active={activeTab === 'coupons'}
            onPress={() => onSelectTab('coupons')}
          >
            <S.TabText active={activeTab === 'coupons'}>
              {t('rewards.tabMyCoupons')} ({claimedCoupons.length})
            </S.TabText>
          </S.TabButton>
        </S.TabBar>

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            activeRole={activeRole}
            topDrivers={topDrivers}
            topRiders={topRiders}
            currentUser={currentUser}
            onSelectRole={onSelectRole}
          />
        )}

        {activeTab === 'redeem' && (
          <RedeemCouponsView
            coins={coins}
            redeemableCoupons={redeemableCoupons}
            onRedeemCoupon={onRedeemCoupon}
          />
        )}

        {activeTab === 'coupons' && (
          <MyCouponsView
            claimedCoupons={claimedCoupons}
            onCopyCouponCode={onCopyCouponCode}
          />
        )}
      </S.Container>
    );
  },
);

LeaderboardTemplate.displayName = 'LeaderboardTemplate';
