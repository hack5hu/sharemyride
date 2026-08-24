import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Toggle } from '@/components/atoms/Toggle';
import { moderateScale } from '@/styles';
import { ActiveRideDriverTemplateProps } from './types.d';
import { StopItemCard } from '@/components/molecules/StopItemCard';
import * as S from './ActiveRideDriverTemplate.styles';

export const ActiveRideDriverTemplate: React.FC<ActiveRideDriverTemplateProps> =
  React.memo(
    ({
      onBack,
      nextStop,
      isLiveLocationEnabled,
      onToggleLiveLocation,
      groupedStops,
      vehicleInfo,
      onChatPress,
      onCallPress,
      onSafetyCenterPress,
    }) => {
      const theme = useTheme();
      const { activeRideDriver: t } = useLocale();

      return (
        <ScreenShell title={t.screenTitle} onBack={onBack}>
          <S.Container>
            <S.ScrollContent showsVerticalScrollIndicator={false}>
              {/* Top Hero Section */}
              <S.HeroSection>
                <S.NextStopBadge>{t.nextStopLabel}</S.NextStopBadge>
                <S.PassengerName>{nextStop.passengerName}</S.PassengerName>

                <S.MetricsRow>
                  <S.MetricBlock>
                    <S.MetricLabel>{t.distanceLabel}</S.MetricLabel>
                    <S.MetricValue>
                      {t.distanceValue.replace(
                        '{{km}}',
                        nextStop.distanceKm.toFixed(1),
                      )}
                    </S.MetricValue>
                  </S.MetricBlock>

                  <S.MetricBlock>
                    <S.MetricLabel>{t.etaLabel}</S.MetricLabel>
                    <S.MetricValue>
                      {t.etaValue.replace(
                        '{{mins}}',
                        String(nextStop.etaMinutes),
                      )}
                    </S.MetricValue>
                  </S.MetricBlock>
                </S.MetricsRow>
              </S.HeroSection>

              <S.BodyContent>
                {/* Live Location Toggle */}
                <S.LiveLocationCard>
                  <S.LiveLocationLeft>
                    <Icon
                      name="location-on"
                      size={moderateScale(22)}
                      color={theme.colors.primary}
                    />
                    <S.LiveLocationText>
                      {t.liveLocationTitle}
                    </S.LiveLocationText>
                  </S.LiveLocationLeft>
                  <Toggle
                    value={isLiveLocationEnabled}
                    onValueChange={onToggleLiveLocation}
                  />
                </S.LiveLocationCard>

                {/* Stops List */}
                <S.StopsSection>
                  <S.StopsHeader>{t.stopsTitle}</S.StopsHeader>
                  {groupedStops.map(group => {
                    return (
                      <React.Fragment key={group.stopId}>
                        <S.StopGroupName>{group.stopName}</S.StopGroupName>
                        {group.passengers.map((stop, index) => {
                          const isLast = index === group.passengers.length - 1;
                          const subtitle = stop.pickupLocation
                            ? t.pickupSubtitle.replace(
                                '{{location}}',
                                stop.pickupLocation,
                              )
                            : t.pickupDistanceSubtitle.replace(
                                '{{distance}}',
                                stop.distanceAway || '',
                              );

                          return (
                            <StopItemCard
                              key={stop.id}
                              stop={stop}
                              isLast={isLast}
                              subtitle={subtitle}
                              chatAccessibilityLabel={t.chatUser.replace(
                                '{{name}}',
                                stop.passengerName,
                              )}
                              callAccessibilityLabel={t.callUser.replace(
                                '{{name}}',
                                stop.passengerName,
                              )}
                              onChatPress={onChatPress}
                              onCallPress={onCallPress}
                            />
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </S.StopsSection>

                {/* Vehicle Status */}
                <S.VehicleStatusSection>
                  <S.VehicleText>
                    {vehicleInfo.licensePlate
                      ? t.vehicleStatus
                          .replace('{{vehicle}}', vehicleInfo.model)
                          .replace('{{license}}', vehicleInfo.licensePlate)
                      : vehicleInfo.model}
                  </S.VehicleText>
                  <S.BatteryText>
                    {t.batteryRemaining.replace(
                      '{{percent}}',
                      String(vehicleInfo.batteryPercentage),
                    )}
                  </S.BatteryText>
                </S.VehicleStatusSection>

                {/* Safety Center Button */}
                <S.SafetyButton onPress={onSafetyCenterPress}>
                  <Icon
                    name="shield"
                    size={moderateScale(20)}
                    color={theme.colors.on_error_container || '#93000a'}
                  />
                  <S.SafetyButtonText>{t.safetyCenter}</S.SafetyButtonText>
                </S.SafetyButton>
              </S.BodyContent>
            </S.ScrollContent>
          </S.Container>
        </ScreenShell>
      );
    },
  );

ActiveRideDriverTemplate.displayName = 'ActiveRideDriverTemplate';
