import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from '@/components/atoms/Avatar';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { type LeaderboardUser } from '@/types/rewards';
import * as S from './PodiumCard.styles';
import { type PodiumCardProps } from './types.d';

const TIER_COLORS = {
  1: {
    border: '#EAB308',
    badge: '#CA8A04',
    pedestal: '#EAB308',
    prize: '#B45309',
  },
  2: {
    border: '#94A3B8',
    badge: '#64748B',
    pedestal: '#94A3B8',
    prize: '#475569',
  },
  3: {
    border: '#F97316',
    badge: '#EA580C',
    pedestal: '#F97316',
    prize: '#C2410C',
  },
} as const;

export const PodiumCard: React.FC<PodiumCardProps> = memo(
  ({ topThree, onUserPress }) => {
    const { t } = useTranslation();

    const rank1 = topThree.find(u => u.rank === 1);
    const rank2 = topThree.find(u => u.rank === 2);
    const rank3 = topThree.find(u => u.rank === 3);

    const renderSlot = (
      user: LeaderboardUser | undefined,
      rank: 1 | 2 | 3,
      height: number,
    ) => {
      if (!user) return null;
      const colors = TIER_COLORS[rank];
      const isFirst = rank === 1;

      return (
        <S.PodiumColumn
          key={user.id}
          isFirst={isFirst}
          onPress={() => onUserPress?.(user)}
          accessibilityRole="button"
        >
          {isFirst && (
            <S.CrownIconContainer>
              <Icon
                name="emoji-events"
                size={moderateScale(24)}
                color={colors.badge}
              />
            </S.CrownIconContainer>
          )}

          <S.AvatarWrapper borderColor={colors.border} isFirst={isFirst}>
            <Avatar
              source={user.avatarUri ? { uri: user.avatarUri } : undefined}
              placeholder={user.name}
              size={isFirst ? 'lg' : 'md'}
              border={false}
            />
            <S.RankBadge bgColor={colors.badge}>
              <S.RankText>{rank}</S.RankText>
            </S.RankBadge>
          </S.AvatarWrapper>

          <S.UserName numberOfLines={1}>{user.name}</S.UserName>

          <S.RidesBadge>
            <S.RidesText>
              {t('rewards.ridesCompleted', { count: user.ridesCount })}
            </S.RidesText>
          </S.RidesBadge>

          {user.rewardTitle && (
            <S.PrizeCard bgColor={colors.prize}>
              <S.PrizeText numberOfLines={1}>{user.rewardTitle}</S.PrizeText>
            </S.PrizeCard>
          )}

          <S.Pedestal height={height} bgColor={colors.pedestal}>
            <S.PedestalRank>{rank}</S.PedestalRank>
          </S.Pedestal>
        </S.PodiumColumn>
      );
    };

    return (
      <S.PodiumContainer>
        {renderSlot(rank2, 2, 60)}
        {renderSlot(rank1, 1, 86)}
        {renderSlot(rank3, 3, 44)}
      </S.PodiumContainer>
    );
  },
);

PodiumCard.displayName = 'PodiumCard';
