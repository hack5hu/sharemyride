import React from 'react';
import { useTheme } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from '@/components/atoms/Avatar';
import { Typography } from '@/components/atoms/Typography';
import { getMessageStatusIcon } from '@/utils/messageStatusUtil';
import { MessageStatus } from '@/constants/enums';
import { MessageItemProps } from './types';
import { 
  Container, 
  ContentContainer, 
  HeaderRow, 
  RouteContainer, 
  BadgeContainer, 
} from './MessageItem.styles';
import { moderateScale } from '@/styles';

export const MessageItem: React.FC<MessageItemProps> = React.memo(({
  name,
  lastMessage,
  time,
  avatarSource,
  unreadCount = 0,
  source,
  destination,
  isOnline = false,
  isVerified = false,
  isLastMessageFromMe = false,
  lastMessageStatus,
  onPress,
  style,
}) => {
  const isUnread = unreadCount > 0;
  const theme = useTheme();

  const renderStatus = () => {
    if (isUnread) {
      return (
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
      );
    }

    const iconInfo = getMessageStatusIcon(lastMessageStatus || MessageStatus.SENT, isLastMessageFromMe);
    if (!iconInfo) return null;

    return (
      <MaterialIcon 
        name={iconInfo.name} 
        size={moderateScale(16)} 
        color={iconInfo.color} 
      />
    );
  };

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
            weight={isUnread ? 'bold' : 'medium'}
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

        {source && destination ? (
          <RouteContainer>
            <Typography 
              variant="label" 
              size="xs" 
              weight={isUnread ? 'bold' : 'medium'}
              color="secondary"
              numberOfLines={1}
            >
              {source} → {destination}
            </Typography>
          </RouteContainer>
        ) : null}

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

      {renderStatus()}
    </Container>
  );
});

MessageItem.displayName = 'MessageItem';
