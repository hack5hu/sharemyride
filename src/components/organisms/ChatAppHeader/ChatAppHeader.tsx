import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { IconButton } from '@/components/atoms/IconButton';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import {
  Container,
  ProfileInfo,
  ProfileTouchable,
  TextContainer,
  MetaRow,
  RatingBox,
  PulseDot,
  Actions,
} from './ChatAppHeader.styles';
import { type ChatAppHeaderProps } from './types.d';

export const ChatAppHeader: React.FC<ChatAppHeaderProps> = ({
  name,
  rating,
  isTyping,
  avatarUri,
  isVerified = true,
  phoneNumber,
  onBackPress,
  onCallPress,
  onReportPress,
  onProfilePress,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <ProfileInfo>
        {onBackPress && (
          <IconButton
            icon="arrow-back"
            onPress={onBackPress}
            variant="surface"
          />
        )}
        <ProfileTouchable
          onPress={onProfilePress}
          disabled={!onProfilePress}
          activeOpacity={0.7}
        >
          <Avatar
            source={avatarUri ? { uri: avatarUri } : undefined}
            placeholder={name}
            size="sm"
            isVerified={isVerified}
            border={false}
          />

          <TextContainer>
            <Typography variant="title" size="md" weight="bold" color="primary">
              {name}
            </Typography>
            <MetaRow>
              <RatingBox>
                <Typography
                  variant="label"
                  size="xs"
                  weight="bold"
                  color={theme.colors.secondary}
                >
                  {rating.toFixed(1)}
                </Typography>
                <Icon
                  name="star"
                  size={moderateScale(12)}
                  color={theme.colors.secondary}
                />
              </RatingBox>
              {phoneNumber ? (
                <Typography
                  variant="label"
                  size="xs"
                  color="on_surface_variant"
                  weight="medium"
                >
                  · {phoneNumber}
                </Typography>
              ) : null}
              {isTyping && (
                <>
                  <PulseDot />
                  <Typography
                    variant="label"
                    size="xs"
                    color="on_surface_variant"
                  >
                    Typing...
                  </Typography>
                </>
              )}
            </MetaRow>
          </TextContainer>
        </ProfileTouchable>
      </ProfileInfo>

      <Actions>
        {Boolean(phoneNumber) && Boolean(onCallPress) && (
          <IconButton icon="phone" onPress={onCallPress} variant="surface" />
        )}
        <IconButton icon="report" onPress={onReportPress} variant="surface" />
      </Actions>
    </Container>
  );
};

