import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Toggle } from '@/components/atoms/Toggle';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { StopGroupCard } from '@/components/molecules/StopGroupCard';
import { TrackingFeedback } from '@/components/molecules/TrackingFeedback';
import { useLocale } from '@/constants/localization';
import { useTrackingFeedback } from '@/hooks/useTrackingFeedback';
import { moderateScale } from '@/styles';
import * as S from './ActiveRideDriverTemplate.styles';
import { DriverVehicleCard } from './DriverVehicleCard';
import { type ActiveRideDriverTemplateProps } from './types.d';

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
      const tracking = useTrackingFeedback();
      const { activeRideDriver: t } = useLocale();


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
                        </S.LiveLocationTitleRow>
                      </S.LiveLocationTextGroup>
                    </S.LiveLocationLeft>
                    <Toggle
                      value={isLiveLocationEnabled || tracking.isStarting}
                      onValueChange={onToggleLiveLocation}
                    />
                  </S.LiveLocationTopRow>

                  <TrackingFeedback status={tracking.status} secondsSinceUpload={tracking.secondsSinceUpload} />
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
                  <Icon name="shield" size={moderateScale(20)} color={theme.colors.error} />
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
