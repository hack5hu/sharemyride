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

      const subtitleText = isLiveLocationEnabled
        ? t.liveLocationSubtitleOn
        : t.liveLocationSubtitleOff;

      return (
        <ScreenShell title={t.screenTitle} onBack={onBack}>
          <S.Container>
            <S.ScrollContent showsVerticalScrollIndicator={false}>
              <S.BodyContent>
                {/* Live Location Explanation Card */}
                <S.LiveLocationCard $active={isLiveLocationEnabled}>
                  <S.LiveLocationTopRow>
                    <S.LiveLocationLeft>
                      <S.LiveLocationIconContainer
                        $active={isLiveLocationEnabled}
                      >
                        <Icon
                          name={
                            isLiveLocationEnabled
                              ? 'my-location'
                              : 'location-off'
                          }
                          size={moderateScale(22)}
                          color={
                            isLiveLocationEnabled
                              ? theme.colors.primary
                              : theme.colors.on_surface_variant
                          }
                        />
                      </S.LiveLocationIconContainer>
                      <S.LiveLocationTextGroup>
                        <S.LiveLocationTitleRow>
                          <S.LiveLocationText>
                            {t.liveLocationTitle}
                          </S.LiveLocationText>
                          {isLiveLocationEnabled && (
                            <S.LiveBadge>
                              <S.LiveDot />
                              <S.LiveBadgeText>
                                {t.liveLocationBadge}
                              </S.LiveBadgeText>
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

                  <S.LiveLocationSubtitle>
                    {subtitleText}
                  </S.LiveLocationSubtitle>
                </S.LiveLocationCard>

                {/* Stops List */}
                <S.StopsSection>
                  <S.StopsHeader>{t.stopsTitle}</S.StopsHeader>
                  {groupedStops.map(group => {
                    return (
                      <React.Fragment key={group.stopId}>
                        <S.StopGroupNameContainer>
                          <Icon
                            name="place"
                            size={moderateScale(16)}
                            color={theme.colors.primary}
                          />
                          <S.StopGroupName numberOfLines={2}>
                            {group.stopName}
                          </S.StopGroupName>
                        </S.StopGroupNameContainer>
                        {group.passengers.map((stop, index) => {
                          const isLast = index === group.passengers.length - 1;
                          const subtitle =
                            stop.distanceAway ||
                            (stop.pickupLocation
                              ? t.pickupSubtitle.replace(
                                  '{{location}}',
                                  stop.pickupLocation,
                                )
                              : '');

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

                {/* Vehicle Section */}
                <S.VehicleCard>
                  <S.VehicleIconContainer>
                    <Icon
                      name="directions-car"
                      size={moderateScale(22)}
                      color={theme.colors.primary}
                    />
                  </S.VehicleIconContainer>
                  <S.VehicleInfoGroup>
                    <S.VehicleText numberOfLines={1}>
                      {vehicleInfo.company}{' '}
                      <S.VehicleTextLight>
                        {vehicleInfo.model}
                      </S.VehicleTextLight>
                    </S.VehicleText>
                    <S.VehicleSubtext numberOfLines={1}>
                      {[
                        vehicleInfo.color,
                        vehicleInfo.type,
                        vehicleInfo.fuelType,
                        vehicleInfo.licensePlate,
                        vehicleInfo.batteryPercentage !== undefined
                          ? t.batteryRemaining.replace(
                              '{{percent}}',
                              String(vehicleInfo.batteryPercentage),
                            )
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' • ') || 'Verified Vehicle'}
                    </S.VehicleSubtext>
                  </S.VehicleInfoGroup>
                </S.VehicleCard>

                {/* Safety Center */}
                <S.SafetyButton onPress={onSafetyCenterPress}>
                  <Icon
                    name="shield"
                    size={moderateScale(20)}
                    color={theme.colors.error || '#ba1a1a'}
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
