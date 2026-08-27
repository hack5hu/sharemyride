import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Toggle } from '@/components/atoms/Toggle';
import { moderateScale } from '@/styles';
import { ActiveRideDriverTemplateProps } from './types.d';
import { StopGroupCard } from '@/components/molecules/StopGroupCard';
import { DriverVehicleCard } from './DriverVehicleCard';
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
      onCopyLocation,
      onOpenMap,
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
                {/* Live Location Card */}
                <S.LiveLocationCard $active={isLiveLocationEnabled}>
                  <S.LiveLocationTopRow>
                    <S.LiveLocationLeft>
                      <S.LiveLocationIconContainer $active={isLiveLocationEnabled}>
                        <Icon
                          name={isLiveLocationEnabled ? 'my-location' : 'location-off'}
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
                          <S.LiveLocationText>{t.liveLocationTitle}</S.LiveLocationText>
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

                  <S.LiveLocationSubtitle>{subtitleText}</S.LiveLocationSubtitle>
                </S.LiveLocationCard>

                {/* Stops List */}
                <S.StopsSection>
                  <S.StopsHeader>{t.stopsTitle}</S.StopsHeader>
                  {groupedStops.map((group, groupIndex) => (
                    <StopGroupCard
                      key={group.stopId}
                      group={group}
                      groupIndex={groupIndex + 1}
                      onChatPress={onChatPress}
                      onCallPress={onCallPress}
                      onCopyLocation={onCopyLocation}
                      onOpenMap={onOpenMap}
                    />
                  ))}
                </S.StopsSection>

                {/* Vehicle Section */}
                {!!vehicleInfo && (
                  <DriverVehicleCard
                    vehicleInfo={vehicleInfo}
                    batteryRemainingText={t.batteryRemaining}
                  />
                )}

                {/* Safety Center */}
                <S.SafetyButton onPress={onSafetyCenterPress}>
                  <Icon name="shield" size={moderateScale(20)} color={theme.colors.error || '#ba1a1a'} />
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
