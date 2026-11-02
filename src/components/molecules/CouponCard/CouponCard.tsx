import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import * as S from './CouponCard.styles';
import { type CouponCardProps } from './types.d';

export const CouponCard: React.FC<CouponCardProps> = memo(
  ({ coupon, claimedCoupon, userCoins = 0, onRedeem, onCopyCode }) => {
    const { t } = useTranslation();

    if (claimedCoupon) {
      return (
        <S.CardContainer isClaimed>
          <S.CardHeader>
            <S.DiscountTag isClaimed>
              <S.DiscountTagText isClaimed>
                ₹{claimedCoupon.discountAmount} OFF
              </S.DiscountTagText>
            </S.DiscountTag>
            <S.CostBadge>
              <Icon
                name="verified"
                size={moderateScale(14)}
                color="#B45309"
              />
              <S.CostText>{t('rewards.activeBadge')}</S.CostText>
            </S.CostBadge>
          </S.CardHeader>

          <S.CardBody>
            <S.Title>{claimedCoupon.title}</S.Title>
            <S.Description>
              {t('rewards.validTill', {
                date: new Date(claimedCoupon.expiresAt).toLocaleDateString(),
              })}
            </S.Description>
          </S.CardBody>

          <S.DashedDivider />

          <S.CardFooter>
            <S.CodePill>
              <S.CodeText>{claimedCoupon.code}</S.CodeText>
            </S.CodePill>
            <S.ActionButton
              isClaimed
              onPress={() => onCopyCode?.(claimedCoupon.code)}
              accessibilityRole="button"
            >
              <S.ActionButtonText>{t('rewards.copyCouponCode')}</S.ActionButtonText>
            </S.ActionButton>
          </S.CardFooter>
        </S.CardContainer>
      );
    }

    if (!coupon) return null;

    const hasEnoughCoins = userCoins >= coupon.coinCost;
    const neededCoins = coupon.coinCost - userCoins;

    return (
      <S.CardContainer>
        <S.CardHeader>
          <S.DiscountTag>
            <S.DiscountTagText>₹{coupon.discountAmount} OFF</S.DiscountTagText>
          </S.DiscountTag>
          <S.CostBadge>
            <Icon
              name="monetization-on"
              size={moderateScale(14)}
              color="#B45309"
            />
            <S.CostText>{coupon.coinCost} Coins</S.CostText>
          </S.CostBadge>
        </S.CardHeader>

        <S.CardBody>
          <S.Title>{coupon.title}</S.Title>
          <S.Description>{coupon.description}</S.Description>
        </S.CardBody>

        <S.DashedDivider />

        <S.CardFooter>
          <S.MinFareText>
            {t('rewards.minRideAmount', { min: coupon.minRideFare })}
          </S.MinFareText>
          <S.ActionButton
            disabled={!hasEnoughCoins}
            onPress={() => onRedeem?.(coupon)}
            accessibilityRole="button"
          >
            <S.ActionButtonText disabled={!hasEnoughCoins}>
              {hasEnoughCoins
                ? t('rewards.redeemBtn', { cost: coupon.coinCost })
                : t('rewards.insufficientCoins', { needed: neededCoins })}
            </S.ActionButtonText>
          </S.ActionButton>
        </S.CardFooter>
      </S.CardContainer>
    );
  },
);

CouponCard.displayName = 'CouponCard';
