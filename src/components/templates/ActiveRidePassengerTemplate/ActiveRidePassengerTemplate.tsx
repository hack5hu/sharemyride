import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Toggle } from '@/components/atoms/Toggle';
import { moderateScale } from '@/styles';
import { ActiveRidePassengerTemplateProps } from './types.d';
import { TimelineStopItem } from '@/components/molecules/TimelineStopItem';
import { PassengerHeroCard } from './PassengerHeroCard';
import { PassengerDriverCard } from './PassengerDriverCard';
import { PassengerVehicleCard } from './PassengerVehicleCard';
import * as S from './ActiveRidePassengerTemplate.styles';

export const ActiveRidePassengerTemplate: React.FC<ActiveRidePassengerTemplateProps> =
  React.memo(
    ({
      onBack,
      etaMinutes,
      distanceKm,
      isLiveLocationEnabled,
      onToggleLiveLocation,
      driver,
      vehicleInfo,
      timeline,
      onChatPress,
      onCallPress,
      onSafetyCenterPress,
      nextStopName,
      nextStopLat,
      nextStopLon,
      onCopyLocation,
      onOpenMap,
    }) => {
      const theme = useTheme();
      const { activeRidePassenger: t } = useLocale();

      const safeEta = Number(etaMinutes || 0);
      const safeDistance = Number(distanceKm || 0);
      const liveSubtitle = isLiveLocationEnabled
        ? t.liveLocationSubtitleOn
        : t.liveLocationSubtitleOff;

      return (
        <ScreenShell title={t.screenTitle} onBack={onBack}>
          <S.Container>
            <S.ScrollContent showsVerticalScrollIndicator={false}>
              <PassengerHeroCard
                t={t}
                safeEta={safeEta}
                safeDistance={safeDistance}
                nextStopName={nextStopName}
                nextStopLat={nextStopLat}
                nextStopLon={nextStopLon}
                onCopyLocation={onCopyLocation}
                onOpenMap={onOpenMap}
              />

              {/* Share My Location Toggle */}
              <S.LiveLocationCard $active={isLiveLocationEnabled}>
                <S.LiveLocationTopRow>
                  <S.LiveLocationLeft>
                    <S.LiveLocationIconContainer $active={isLiveLocationEnabled}>
                      <Icon
                        name={isLiveLocationEnabled ? 'my-location' : 'location-off'}
                        size={moderateScale(20)}
                        color={
                          isLiveLocationEnabled
                            ? theme.colors.primary
                            : theme.colors.on_surface_variant
                        }
                      />
                    </S.LiveLocationIconContainer>
                    <S.LiveLocationTextGroup>
                      <S.LiveLocationTitleRow>
                        <S.LiveLocationText>{t.shareMyLocation}</S.LiveLocationText>
                        {isLiveLocationEnabled && (
                          <S.LiveBadge>
                            <S.LiveDot />
                            <S.LiveBadgeText>{t.liveLocationBadge}</S.LiveBadgeText>
                          </S.LiveBadge>
                        )}
                      </S.LiveLocationTitleRow>
                    </S.LiveLocationTextGroup>
                  </S.LiveLocationLeft>
                  <Toggle
                    value={isLiveLocationEnabled}
                    onValueChange={onToggleLiveLocation}
                  />
                </S.LiveLocationTopRow>
                <S.LiveLocationSubtitle>{liveSubtitle}</S.LiveLocationSubtitle>
              </S.LiveLocationCard>

              {/* Driver Section */}
              <PassengerDriverCard
                driver={driver}
                chatLabel={t.chat}
                callLabel={t.call}
                onChatPress={onChatPress}
                onCallPress={onCallPress}
              />

              {/* Ride Vehicle Section */}
              {!!vehicleInfo && (
                <PassengerVehicleCard vehicleInfo={vehicleInfo} />
              )}

              {/* Timeline Section */}
              <S.TimelineCard>
                <S.TimelineHeader>{t.timelineTitle}</S.TimelineHeader>
                {timeline.map((item, index) => (
                  <TimelineStopItem
                    key={item.id}
                    item={item}
                    isLast={index === timeline.length - 1}
                    onCopyLocation={onCopyLocation}
                    onOpenMap={onOpenMap}
                    copyLabel={t.copyLocation}
                    copiedLabel={t.copiedLocation}
                    mapLabel={t.openInMap}
                  />
                ))}
              </S.TimelineCard>

              {/* Safety Center Button */}
              <S.SafetyCenterButton onPress={onSafetyCenterPress}>
                <Icon
                  name="shield"
                  size={moderateScale(18)}
                  color={theme.colors.error || '#ba1a1a'}
                />
                <S.SafetyCenterButtonText>
                  {t.safetyEmergencyCenter}
                </S.SafetyCenterButtonText>
              </S.SafetyCenterButton>
            </S.ScrollContent>
          </S.Container>
        </ScreenShell>
      );
    },
  );

ActiveRidePassengerTemplate.displayName = 'ActiveRidePassengerTemplate';
