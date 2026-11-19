import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { LeaderboardRow } from '@/components/molecules/LeaderboardRow';
import { PodiumCard } from '@/components/molecules/PodiumCard';
import { UserRankStickyBar } from '@/components/molecules/UserRankStickyBar';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import { type LeaderboardRole, type LeaderboardUser } from '@/types/rewards';
import * as S from '../LeaderboardTemplate.styles';

interface LeaderboardViewProps {
  activeRole: LeaderboardRole;
  topDrivers: LeaderboardUser[];
  topRiders: LeaderboardUser[];
  currentUser: LeaderboardUser;
  onSelectRole: (role: LeaderboardRole) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = memo(
  ({ activeRole, topDrivers, topRiders, currentUser, onSelectRole }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const currentList = activeRole === 'driver' ? topDrivers : topRiders;
    const topThree = currentList.slice(0, 3);
    const restList = currentList.slice(3);
    const listBottomPadding = moderateScale(90) + insets.bottom;

    return (
      <>
        <S.RoleSwitchContainer>
          <S.RolePill
            active={activeRole === 'driver'}
            onPress={() => onSelectRole('driver')}
          >
            <Icon
              name="drive-eta"
              size={moderateScale(16)}
              color={
                activeRole === 'driver'
                  ? theme.colors.on_primary
                  : theme.colors.on_surface
              }
            />
            <S.RoleText active={activeRole === 'driver'}>
              {t('rewards.topDrivers')}
            </S.RoleText>
          </S.RolePill>
          <S.RolePill
            active={activeRole === 'rider'}
            onPress={() => onSelectRole('rider')}
          >
            <Icon
              name="people"
              size={moderateScale(16)}
              color={
                activeRole === 'rider'
                  ? theme.colors.on_primary
                  : theme.colors.on_surface
              }
            />
            <S.RoleText active={activeRole === 'rider'}>
              {t('rewards.topRiders')}
            </S.RoleText>
          </S.RolePill>
        </S.RoleSwitchContainer>

        <S.InfoBanner>
          <Icon
            name="card-giftcard"
            size={moderateScale(20)}
            color={theme.colors.on_primary_container}
          />
          <S.InfoText>{t('rewards.top3RewardBadge')}</S.InfoText>
        </S.InfoBanner>

        <S.ScrollArea
          contentContainerStyle={{ paddingBottom: listBottomPadding }}
          showsVerticalScrollIndicator={false}
        >
          <PodiumCard topThree={topThree} />

          <S.SectionHeader>
            <S.SectionTitle>
              {activeRole === 'driver'
                ? t('rewards.driversSubtitle')
                : t('rewards.ridersSubtitle')}
            </S.SectionTitle>
          </S.SectionHeader>

          {restList.map(item => (
            <LeaderboardRow key={item.id} user={item} />
          ))}
        </S.ScrollArea>

        <UserRankStickyBar currentUser={currentUser} />
      </>
    );
  },
);

LeaderboardView.displayName = 'LeaderboardView';
