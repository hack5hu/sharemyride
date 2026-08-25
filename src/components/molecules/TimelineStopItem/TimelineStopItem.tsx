import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale } from '@/styles';
import { TimelineStopItemProps } from './types';
import * as S from './TimelineStopItem.styles';

export const TimelineStopItem: React.FC<TimelineStopItemProps> = React.memo(
  ({
    item,
    isLast,
    onCopyLocation,
    onOpenMap,
    copyLabel = 'Copy',
    copiedLabel = 'Copied',
    mapLabel = 'Map',
  }) => {
    const theme = useTheme();
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
      if (onCopyLocation) {
        onCopyLocation(item.title);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [item.title, onCopyLocation]);

    const handleMap = useCallback(() => {
      if (onOpenMap) {
        onOpenMap(item.lat, item.lon, item.title);
      }
    }, [item.lat, item.lon, item.title, onOpenMap]);

    return (
      <S.TimelineRow $isPending={item.isPending}>
        <S.IndicatorColumn>
          <S.StatusDot
            $isCurrentUser={item.isCurrentUser}
            $isCompleted={item.isCompleted}
          />
          {!isLast && <S.TimelineConnector />}
        </S.IndicatorColumn>

        <S.ContentBox $isCurrentUser={item.isCurrentUser}>
          <S.HeaderRow>
            <S.TextGroup>
              <S.TitleText $isCurrentUser={item.isCurrentUser} numberOfLines={2}>
                {item.title}
              </S.TitleText>
              {!!item.subtitle && (
                <S.SubtitleText $isCurrentUser={item.isCurrentUser}>
                  {item.subtitle}
                </S.SubtitleText>
              )}
            </S.TextGroup>

            {item.isCurrentUser ? (
              <S.UserIconBadge>
                <Icon
                  name="person"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
              </S.UserIconBadge>
            ) : item.avatar ? (
              <Avatar
                source={{ uri: item.avatar }}
                placeholder={item.title}
                size="sm"
              />
            ) : null}
          </S.HeaderRow>

          <S.ActionsRow>
            <S.ActionPill $copied={copied} onPress={handleCopy} activeOpacity={0.7}>
              <Icon
                name={copied ? 'check' : 'content-copy'}
                size={moderateScale(12)}
                color={copied ? '#15803d' : theme.colors.primary}
              />
              <S.ActionPillText $copied={copied}>
                {copied ? copiedLabel : copyLabel}
              </S.ActionPillText>
            </S.ActionPill>

            <S.ActionPill onPress={handleMap} activeOpacity={0.7}>
              <Icon
                name="place"
                size={moderateScale(12)}
                color={theme.colors.primary}
              />
              <S.ActionPillText>{mapLabel}</S.ActionPillText>
            </S.ActionPill>
          </S.ActionsRow>
        </S.ContentBox>
      </S.TimelineRow>
    );
  },
);

TimelineStopItem.displayName = 'TimelineStopItem';
