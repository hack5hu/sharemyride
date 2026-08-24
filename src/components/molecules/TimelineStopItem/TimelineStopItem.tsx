import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale } from '@/styles';
import { TimelineStopItemProps } from './types';
import * as S from './TimelineStopItem.styles';

export const TimelineStopItem: React.FC<TimelineStopItemProps> = React.memo(
  ({ item, isLast }) => {
    const theme = useTheme();

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
          <S.TextGroup>
            <S.TitleText $isCurrentUser={item.isCurrentUser}>
              {item.title}
            </S.TitleText>
            {item.subtitle ? (
              <S.SubtitleText $isCurrentUser={item.isCurrentUser}>
                {item.subtitle}
              </S.SubtitleText>
            ) : null}
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
        </S.ContentBox>
      </S.TimelineRow>
    );
  },
);

TimelineStopItem.displayName = 'TimelineStopItem';
