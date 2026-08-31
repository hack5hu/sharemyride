import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { moderateScale } from '@/styles';
import { UserProfile } from '@/screens/Common/UserProfileDetail/types.d';
import { Translations } from '@/constants/localization/types';
import * as S from '../UserProfileDetailTemplate.styles';

interface ProfileHeroCardProps {
  profile: UserProfile;
  t: Translations['userProfileDetail'];
  handleChat?: () => void;
}

export const ProfileHeroCard: React.FC<ProfileHeroCardProps> = React.memo(
  ({ profile, t, handleChat }) => {
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

        {Boolean(handleChat) && (
          <S.ChatButton onPress={handleChat} activeOpacity={0.85}>
            <Icon
              name="chat-bubble-outline"
              size={moderateScale(18)}
              color={theme.colors.on_primary}
            />
            <Typography
              variant="label"
              size="sm"
              weight="bold"
              color="on_primary"
            >
              Chat with {profile.name.split(' ')[0]}
            </Typography>
          </S.ChatButton>
        )}
      </S.ProfileHeroCard>
    );
  },
);

ProfileHeroCard.displayName = 'ProfileHeroCard';
