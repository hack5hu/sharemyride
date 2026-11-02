import React, { memo } from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { useTranslation } from '@/hooks/useTranslation';
import * as S from './LeaderboardRow.styles';
import { type LeaderboardRowProps } from './types.d';

export const LeaderboardRow: React.FC<LeaderboardRowProps> = memo(
  ({ user, onPress }) => {
    const { t } = useTranslation();

    return (
      <S.RowContainer
        isCurrentUser={user.isCurrentUser}
        onPress={() => onPress?.(user)}
        accessibilityRole="button"
      >
        <S.RankWrapper>
          <S.RankText isCurrentUser={user.isCurrentUser}>
            {t('rewards.rankText', { rank: user.rank })}
          </S.RankText>
        </S.RankWrapper>

        <S.AvatarBox>
          <Avatar
            source={user.avatarUri ? { uri: user.avatarUri } : undefined}
            placeholder={user.name}
            size="sm"
            border={false}
          />
        </S.AvatarBox>

        <S.UserInfo>
          <S.NameText isCurrentUser={user.isCurrentUser} numberOfLines={1}>
            {user.isCurrentUser ? t('rewards.you') : user.name}
          </S.NameText>
          {user.rewardTitle && (
            <S.SubtitleText numberOfLines={1}>{user.rewardTitle}</S.SubtitleText>
          )}
        </S.UserInfo>

        <S.RidesPill isCurrentUser={user.isCurrentUser}>
          <S.RidesPillText isCurrentUser={user.isCurrentUser}>
            {t('rewards.ridesCompleted', { count: user.ridesCount })}
          </S.RidesPillText>
        </S.RidesPill>
      </S.RowContainer>
    );
  },
);

LeaderboardRow.displayName = 'LeaderboardRow';
