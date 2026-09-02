import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { Typography } from '@/components/atoms/Typography';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { type Translations } from '@/constants/localization/types';
import { type UserProfile } from '@/screens/Common/UserProfileDetail/types.d';
import { moderateScale } from '@/styles';
import * as S from '../UserProfileDetailTemplate.styles';

interface ProfileHeroCardProps {
  profile: UserProfile;
  t: Translations['userProfileDetail'];
  handleChat?: () => void;
  handleCall?: () => void;
}

export const ProfileHeroCard: React.FC<ProfileHeroCardProps> = React.memo(
  ({ profile, t, handleChat, handleCall }) => {
    const theme = useTheme();

    return (
      <S.ProfileHeroCard>
        <S.AvatarWrapper>
          <Avatar
            source={
              profile.profileImage ? { uri: profile.profileImage } : undefined
            }
            placeholder={profile.name}
            size="xl"
            border={false}
          />
          {profile.isVerified && (
            <S.BadgePin>
              <VerifiedBadge size={28} />
            </S.BadgePin>
          )}
        </S.AvatarWrapper>

        <S.HeroName>{profile.name}</S.HeroName>

        {Boolean(profile.bio) && (
          <S.BioText numberOfLines={3}>{profile.bio}</S.BioText>
        )}

        <S.StatsRow>
          {profile.isVerified && (
            <S.VerifiedTag>
              <Icon
                name="verified"
                size={moderateScale(14)}
                color={theme.colors.primary}
              />
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color="primary"
              >
                {t.verifiedMember || 'Verified Member'}
              </Typography>
            </S.VerifiedTag>
          )}
          <S.RatingBadge>
            <Icon
              name="star"
              size={moderateScale(14)}
              color={theme.colors.warning || '#f59e0b'}
            />
            <Typography
              variant="label"
              size="xs"
              weight="bold"
              color="on_surface"
            >
              {profile.rating > 0 ? profile.rating.toFixed(1) : '5.0'} ·{' '}
              {profile.ridesCount !== undefined
                ? `${profile.ridesCount} ${profile.ridesCount === 1 ? 'ride' : 'rides'} completed`
                : t.rideCountLabel.replace(
                    '{{count}}',
                    String(profile.ratingCount),
                  )}
            </Typography>
          </S.RatingBadge>
        </S.StatsRow>

        {(Boolean(handleChat) || Boolean(handleCall)) && (
          <S.HeroActionsRow>
            {Boolean(handleChat) && (
              <S.ActionPillButton
                variant="primary"
                onPress={handleChat}
                activeOpacity={0.85}
              >
                <Icon
                  name="chat-bubble-outline"
                  size={moderateScale(16)}
                  color={theme.colors.on_primary}
                />
                <Typography
                  variant="label"
                  size="xs"
                  weight="bold"
                  color="on_primary"
                >
                  Chat with {profile.name.split(' ')[0]}
                </Typography>
              </S.ActionPillButton>
            )}

            {Boolean(handleCall) && (
              <S.ActionPillButton
                variant="secondary"
                onPress={handleCall}
                activeOpacity={0.85}
              >
                <Icon
                  name="phone"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
                <Typography
                  variant="label"
                  size="xs"
                  weight="bold"
                  color="primary"
                >
                  {profile.phoneNumber
                    ? `Call ${profile.phoneNumber}`
                    : `Call ${profile.name.split(' ')[0]}`}
                </Typography>
              </S.ActionPillButton>
            )}
          </S.HeroActionsRow>
        )}
      </S.ProfileHeroCard>
    );
  },
);

ProfileHeroCard.displayName = 'ProfileHeroCard';
