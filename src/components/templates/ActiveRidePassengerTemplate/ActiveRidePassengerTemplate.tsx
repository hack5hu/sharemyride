import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Toggle } from '@/components/atoms/Toggle';
import { moderateScale } from '@/styles';
import { ActiveRidePassengerTemplateProps } from './types.d';
import { TimelineStopItem } from '@/components/molecules/TimelineStopItem';
import { DriverCardSection } from '@/components/molecules/DriverCardSection';
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
      timeline,
      onChatPress,
      onCallPress,
      onSafetyCenterPress,
      nextStopName,
    }) => {
      const theme = useTheme();
      const { activeRidePassenger: t } = useLocale();

      return (
        <ScreenShell title={t.screenTitle} onBack={onBack}>
          <S.Container>
            <S.ScrollContent showsVerticalScrollIndicator={false}>
              {/* Hero Card */}
              <S.HeroCard>
                <S.HeroContent>
                  <S.HeroLabel>{t.driverArrivingIn}</S.HeroLabel>
                  <S.ETARow>
                    <S.ETANumber>{etaMinutes}</S.ETANumber>
                    <S.ETAMinutesText>
                      {etaMinutes === 1 ? t.min : t.mins}
                    </S.ETAMinutesText>
                  </S.ETARow>

                  {!!nextStopName && (
                    <S.NextStopText>
                      {t.arrivingAt.replace('{{stop}}', nextStopName)}
                    </S.NextStopText>
                  )}

                  <S.DistancePill>
                    <Icon
                      name="navigation"
                      size={moderateScale(14)}
                      color={theme.colors.on_primary_container}
                    />
                    <S.DistanceText>
                      {t.distanceLabel.replace(
                        '{{km}}',
                        distanceKm.toFixed(1),
                      )}
                    </S.DistanceText>
                  </S.DistancePill>
                </S.HeroContent>

                <S.WatermarkCar>
                  <Icon
                    name="directions-car"
                    size={moderateScale(110)}
                    color={theme.colors.on_primary_container}
                  />
                </S.WatermarkCar>
              </S.HeroCard>

              {/* Share My Location Toggle */}
              <S.LiveLocationCard>
                <S.LiveLocationLeft>
                  <Icon
                    name="location-on"
                    size={moderateScale(22)}
                    color={theme.colors.primary}
                  />
                  <S.LiveLocationText>{t.shareMyLocation}</S.LiveLocationText>
                </S.LiveLocationLeft>
                <Toggle
                  value={isLiveLocationEnabled}
                  onValueChange={onToggleLiveLocation}
                />
              </S.LiveLocationCard>

              {/* Driver Section */}
              <DriverCardSection
                driver={driver}
                chatLabel={t.chat}
                callLabel={t.call}
                onChatPress={onChatPress}
                onCallPress={onCallPress}
              />

              {/* Timeline Section */}
              <S.TimelineCard>
                <S.TimelineHeader>{t.timelineTitle}</S.TimelineHeader>
                {timeline.map((item, index) => (
                  <TimelineStopItem
                    key={item.id}
                    item={item}
                    isLast={index === timeline.length - 1}
                  />
                ))}
              </S.TimelineCard>

              {/* Safety Center Button */}
              <S.SafetyCenterButton onPress={onSafetyCenterPress}>
                <Icon
                  name="shield"
                  size={moderateScale(20)}
                  color={theme.colors.on_error_container || '#93000a'}
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
