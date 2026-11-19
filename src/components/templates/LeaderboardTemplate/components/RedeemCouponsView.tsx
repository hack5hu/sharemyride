import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { CouponCard } from '@/components/molecules/CouponCard';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { type RedeemableCoupon } from '@/types/rewards';
import * as S from '../LeaderboardTemplate.styles';

interface RedeemCouponsViewProps {
  coins: number;
  redeemableCoupons: RedeemableCoupon[];
  onRedeemCoupon: (coupon: RedeemableCoupon) => void;
}

export const RedeemCouponsView: React.FC<RedeemCouponsViewProps> = memo(
  ({ coins, redeemableCoupons, onRedeemCoupon }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const contentBottomPadding = moderateScale(40) + insets.bottom;

    return (
      <S.ScrollArea
        contentContainerStyle={{ paddingBottom: contentBottomPadding }}
        showsVerticalScrollIndicator={false}
      >
        <S.InfoBanner>
          <Icon
            name="toll"
            size={moderateScale(20)}
            color={theme.colors.on_primary_container}
          />
          <S.InfoText>
            {t('rewards.availableCoins', { count: coins })}
          </S.InfoText>
        </S.InfoBanner>

        {redeemableCoupons.map(coupon => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            userCoins={coins}
            onRedeem={onRedeemCoupon}
          />
        ))}
      </S.ScrollArea>
    );
  },
);

RedeemCouponsView.displayName = 'RedeemCouponsView';
