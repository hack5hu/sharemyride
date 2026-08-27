import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { StopItemCard } from '@/components/molecules/StopItemCard';
import { StopGroupCardProps } from './types.d';
import * as S from './StopGroupCard.styles';

export const StopGroupCard: React.FC<StopGroupCardProps> = React.memo(
  ({
    group,
    groupIndex,
    onChatPress,
    onCallPress,
    onCopyLocation,
    onOpenMap,
  }) => {
    const theme = useTheme();
    const { activeRideDriver: t } = useLocale();
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
      if (onCopyLocation && group.stopName) {
        onCopyLocation(group.stopName);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }, [group.stopName, onCopyLocation]);

    const handleMap = useCallback(() => {
      if (onOpenMap && group.stopName) {
        onOpenMap(group.lat, group.lon, group.stopName);
      }
    }, [group.lat, group.lon, group.stopName, onOpenMap]);

    const totalSeats = group.passengers.reduce(
      (acc, curr) => acc + (curr.seatCount || 1),
      0,
    );
    const passengerCount = group.passengers.length;

    const summaryText = t.pickupSummary
      .replace('{{passengers}}', String(passengerCount))
      .replace('{{seats}}', String(totalSeats));

    return (
      <S.Container>
        {/* Stop Header Top Row */}
        <S.HeaderTopRow>
          <S.StopBadge>
            <Icon name="navigation" size={moderateScale(12)} color={theme.colors.primary} />
            <S.StopBadgeText>{`${t.nextStopLabel || 'NEXT STOP'} ${groupIndex}`}</S.StopBadgeText>
          </S.StopBadge>

          <S.SummaryBadge>
            <S.SummaryBadgeText>{summaryText}</S.SummaryBadgeText>
          </S.SummaryBadge>
        </S.HeaderTopRow>

        {/* Address and Actions */}
        <S.AddressRow>
          <S.PinIconBox>
            <Icon name="place" size={moderateScale(18)} color={theme.colors.primary} />
          </S.PinIconBox>
          <S.StopNameText>{group.stopName}</S.StopNameText>
        </S.AddressRow>

        <S.ActionsRow>
          <S.ActionPill $copied={copied} onPress={handleCopy} activeOpacity={0.75}>
            <Icon
              name={copied ? 'check' : 'content-copy'}
              size={moderateScale(12)}
              color={copied ? '#15803d' : theme.colors.primary}
            />
            <S.ActionPillText $copied={copied}>
              {copied ? t.copiedLocation : t.copyLocation}
            </S.ActionPillText>
          </S.ActionPill>

          <S.ActionPill onPress={handleMap} activeOpacity={0.75}>
            <Icon name="place" size={moderateScale(12)} color={theme.colors.primary} />
            <S.ActionPillText>{t.openInMap}</S.ActionPillText>
          </S.ActionPill>
        </S.ActionsRow>

        <S.SectionDivider />

        {/* Passengers at this Stop */}
        <S.SectionHeaderRow>
          <Icon name="group" size={moderateScale(14)} color={theme.colors.primary} />
          <S.SectionHeaderText>
            {t.passengersToPickup.replace('{{count}}', String(passengerCount))}
          </S.SectionHeaderText>
        </S.SectionHeaderRow>

        <S.PassengersList>
          {group.passengers.map((stop, index) => {
            const isLast = index === group.passengers.length - 1;
            const subtitle =
              stop.distanceAway ||
              (stop.pickupLocation
                ? t.pickupSubtitle.replace('{{location}}', stop.pickupLocation)
                : '');

            return (
              <StopItemCard
                key={stop.id}
                stop={stop}
                isLast={isLast}
                subtitle={subtitle}
                chatAccessibilityLabel={t.chatUser.replace('{{name}}', stop.passengerName)}
                callAccessibilityLabel={t.callUser.replace('{{name}}', stop.passengerName)}
                onChatPress={onChatPress}
                onCallPress={onCallPress}
                isNested
              />
            );
          })}
        </S.PassengersList>
      </S.Container>
    );
  },
);

StopGroupCard.displayName = 'StopGroupCard';
