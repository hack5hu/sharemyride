import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import * as S from './SeatButton.styles';

export interface SeatButtonProps {
  id: string;
  state: S.SeatState;
  onPress?: (id: string) => void;
  driverLabel?: string;
  occupiedLabel?: string;
  unavailableLabel?: string;
  price?: number;
}

export const SeatButton: React.FC<SeatButtonProps> = ({
  id,
  state,
  onPress,
  driverLabel,
  occupiedLabel,
  unavailableLabel,
  price,
}) => {
  const theme = useTheme();

  const isDIsabled =
    state === 'driver' || state === 'occupied' || state === 'unavailable';

  return (
    <S.Container>
      <S.SeatTouchable
        state={state}
        onPress={() => !isDIsabled && onPress?.(id)}
        activeOpacity={0.75}
        disabled={isDIsabled}
      >
        {state === 'selected' && (
          <S.SeatGradient
            colors={[
              theme.colors.primary,
              theme.colors.primary_container || '#0070eb',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        <S.ContentWrapper>
          {state === 'driver' ? (
            <>
              <MaterialIcons
                name="directions-car"
                size={moderateScale(26)}
                color={theme.colors.on_surface_variant}
              />
              <S.DriverLabelText>
                {driverLabel || 'Host'}
              </S.DriverLabelText>
            </>
          ) : state === 'occupied' ? (
            <>
              <MaterialIcons
                name="airline-seat-recline-normal"
                size={moderateScale(24)}
                color={theme.colors.outline}
              />
              <S.OccupiedLabelText>
                {occupiedLabel || 'Booked'}
              </S.OccupiedLabelText>
            </>
          ) : state === 'unavailable' ? (
            <>
              <MaterialIcons
                name="airline-seat-recline-normal"
                size={moderateScale(24)}
                color={theme.colors.outline}
              />
              <S.UnavailableLabelText>
                {unavailableLabel || 'Unavailable'}
              </S.UnavailableLabelText>
            </>
          ) : (
            <>
              <MaterialIcons
                name="airline-seat-recline-normal"
                size={moderateScale(26)}
                color={
                  state === 'selected'
                    ? theme.colors.on_primary
                    : theme.colors.primary
                }
              />
              {price !== undefined && (
                <S.PriceText selected={state === 'selected'}>
                  ₹{price}
                </S.PriceText>
              )}
            </>
          )}
        </S.ContentWrapper>
      </S.SeatTouchable>
    </S.Container>
  );
};
