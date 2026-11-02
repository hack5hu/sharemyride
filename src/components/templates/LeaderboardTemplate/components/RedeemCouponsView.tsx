import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

    return (
      <S.ScrollArea
        contentContainerStyle={{ paddingBottom: moderateScale(40) }}
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
