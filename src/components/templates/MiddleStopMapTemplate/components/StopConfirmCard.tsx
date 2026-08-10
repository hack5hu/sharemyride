import React from 'react';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, verticalScale } from '@/styles';
import { Button } from '@/components/atoms/Button';
import { LocationOption } from '@/components/organisms/MiddleStopSearchOverlay';
import { SnapResult } from '@/utils/routeSnap';
import * as S from './StopConfirmCard.styles';

export interface StopConfirmCardProps {
  selectedLocation: LocationOption;
  isReverseGeocoding?: boolean;
  snapResult: SnapResult | null;
  isWarning: boolean;
  distanceText: string;
  onConfirm: () => void;
  canConfirm: boolean;
  t: MiddleStopStopTranslations;
}

// Helper interface to extract only what we need from translation
interface MiddleStopStopTranslations {
  confirmStop: string;
}

export const StopConfirmCard: React.FC<StopConfirmCardProps> = ({
  selectedLocation,
  isReverseGeocoding,
  snapResult,
  isWarning,
  distanceText,
  onConfirm,
  canConfirm,
  t,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <S.BottomCard
      $paddingBottom={insets.bottom + verticalScale(20)}
    >
      <S.BottomGradient />

      <S.StopInfoCard>
        <S.StopInfoRow>
          <S.StopInfoLeft>
            <S.StopNameText numberOfLines={1}>
              {isReverseGeocoding
                ? 'Locating...'
                : selectedLocation.name}
            </S.StopNameText>
            {!!(isReverseGeocoding || selectedLocation.address) && (
              <S.StopAddressText numberOfLines={1}>
                {isReverseGeocoding
                  ? 'Please wait...'
                  : selectedLocation.address}
              </S.StopAddressText>
            )}
          </S.StopInfoLeft>

          {!isReverseGeocoding && snapResult && (
            <S.DistancePill $isWarning={isWarning}>
              <MaterialIcons
                name={isWarning ? 'warning' : 'near-me'}
                size={moderateScale(12)}
                color={
                  isWarning
                    ? theme.colors.error
                    : theme.colors.primary
                }
              />
              <S.DistancePillText $isWarning={isWarning}>
                {distanceText}
              </S.DistancePillText>
            </S.DistancePill>
          )}
        </S.StopInfoRow>
      </S.StopInfoCard>

      <Button
        onPress={onConfirm}
        disabled={!canConfirm || isReverseGeocoding}
        icon="add-location-alt"
        iconPosition="left"
      >
        {t.confirmStop}
      </Button>
    </S.BottomCard>
  );
};
