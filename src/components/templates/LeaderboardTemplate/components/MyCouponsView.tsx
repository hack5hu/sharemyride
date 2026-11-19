import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { CouponCard } from '@/components/molecules/CouponCard';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { type ClaimedCoupon } from '@/types/rewards';
import * as S from '../LeaderboardTemplate.styles';

interface MyCouponsViewProps {
  claimedCoupons: ClaimedCoupon[];
  onCopyCouponCode: (code: string) => void;
}

export const MyCouponsView: React.FC<MyCouponsViewProps> = memo(
  ({ claimedCoupons, onCopyCouponCode }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const contentBottomPadding = moderateScale(40) + insets.bottom;

    return (
      <S.ScrollArea
        contentContainerStyle={{ paddingBottom: contentBottomPadding }}
        showsVerticalScrollIndicator={false}
      >
        {claimedCoupons.length === 0 ? (
          <S.EmptyContainer>
            <Icon
              name="local-activity"
              size={moderateScale(48)}
              color={theme.colors.outline}
            />
            <S.EmptyText>{t('rewards.myCouponsEmpty')}</S.EmptyText>
          </S.EmptyContainer>
        ) : (
          claimedCoupons.map(item => (
            <CouponCard
              key={item.id}
              claimedCoupon={item}
              onCopyCode={onCopyCouponCode}
            />
          ))
        )}
      </S.ScrollArea>
    );
  },
);

MyCouponsView.displayName = 'MyCouponsView';
