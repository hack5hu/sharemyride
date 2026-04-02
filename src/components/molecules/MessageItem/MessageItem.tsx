import React from 'react';
import { useTheme } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from '@/components/atoms/Avatar';
import { Typography } from '@/components/atoms/Typography';
import { MessageItemProps } from './types';
import { 
  Container, 
  ContentContainer, 
  HeaderRow, 
  RouteContainer, 
  BadgeContainer, 
  InfoColumn 
} from './MessageItem.styles';
import { moderateScale } from '@/styles';

export const MessageItem: React.FC<MessageItemProps> = ({
  name,
  lastMessage,
  time,
  avatarSource,
  unreadCount = 0,
  source,
  destination,
  isOnline = false,
  isVerified = false,
  onPress,
  style,
}) => {
  const isUnread = unreadCount > 0;
  const theme = useTheme();

  return (
    <Container isUnread={isUnread} onPress={onPress} style={style}>
      <Avatar 
        source={avatarSource} 
        size="md" 
        status={isOnline ? 'online' : 'none'} 
        isVerified={isVerified}
        placeholder={name}
      />
      
      <ContentContainer>
        <HeaderRow>
          <Typography 
            variant="title" 
            size="md" 
            weight="bold" 
            color={isUnread ? 'on_surface' : 'on_surface_variant'}
            numberOfLines={1}
          >
            {name}
          </Typography>
          <Typography 
            variant="label" 
            size="sm" 
            weight={isUnread ? 'bold' : 'medium'}
            color={isUnread ? 'primary' : 'on_surface_variant'}
          >
            {time}
          </Typography>
        </HeaderRow>

        <RouteContainer>
          <Typography 
            variant="label" 
            size="xs" 
            weight="medium" 
            color="secondary"
            numberOfLines={1}
          >
            {source} → {destination}
          </Typography>
        </RouteContainer>

        <Typography 
          variant="body" 
          size="sm" 
          weight={isUnread ? 'bold' : 'medium'}
          color={isUnread ? 'on_surface' : 'on_surface_variant'}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {lastMessage}
        </Typography>
      </ContentContainer>

      {isUnread ? (
        <BadgeContainer>
          <Typography 
            variant="label" 
            size="xs" 
            weight="bold" 
            color="on_primary"
          >
            {unreadCount}
          </Typography>
        </BadgeContainer>
      ) : (
        <MaterialIcon 
          name="done-all" 
          size={moderateScale(16)} 
          color={theme.colors.primary} 
        />
      )}
    </Container>
  );
};
