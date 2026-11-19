import React, { memo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '@/hooks/useTranslation';
import { verticalScale } from '@/styles';
import * as S from './UserRankStickyBar.styles';
import { type UserRankStickyBarProps } from './types.d';

export const UserRankStickyBar: React.FC<UserRankStickyBarProps> = memo(
  ({ currentUser }) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const isTopThree = currentUser.rank <= 3;
    const ridesToTop3 = Math.max(1, 28 - currentUser.ridesCount);
    const bottomPadding = Math.max(insets.bottom, verticalScale(16));

    return (
      <S.StickyContainer style={{ paddingBottom: bottomPadding }}>
        <S.InnerRow>
          <S.RankBadge>
            <S.RankText>{t('rewards.rankText', { rank: currentUser.rank })}</S.RankText>
          </S.RankBadge>

          <S.InfoCol>
            <S.Title>{t('rewards.yourRank')}</S.Title>
            <S.Subtitle>
              {isTopThree
                ? t('rewards.stayInTop3')
                : t('rewards.climbRank', { count: ridesToTop3 })}
            </S.Subtitle>
          </S.InfoCol>

          <S.RidesCountPill>
            <S.RidesCountText>
              {t('rewards.ridesCompleted', { count: currentUser.ridesCount })}
            </S.RidesCountText>
          </S.RidesCountPill>
        </S.InnerRow>
      </S.StickyContainer>
    );
  },
);

UserRankStickyBar.displayName = 'UserRankStickyBar';
