import React from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import * as S from './SeatButton.styles';

export interface SeatButtonProps {
  id: string;
  state: S.SeatState;
  onPress?: (id: string) => void;
  driverLabel?: string;
  price?: number;
}

export const SeatButton: React.FC<SeatButtonProps> = ({ id, state, onPress, driverLabel, price }) => {
  const theme = useTheme();

  const iconColor = state === 'selected'
    ? theme.colors.on_primary
    : state === 'driver'
    ? theme.colors.outline
    : state === 'occupied'
    ? theme.colors.outline + 'CC'
    : theme.colors.primary;

  const isDIsabled = state === 'driver' || state === 'occupied';

  return (
    <View style={{ alignItems: 'center', width: moderateScale(70) }}>
      <S.SeatTouchable
        state={state}
        onPress={() => !isDIsabled && onPress?.(id)}
        activeOpacity={0.75}
        disabled={isDIsabled}
      >
        {state === 'selected' && (
          <S.SeatGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        <View style={{ position: 'absolute', gap: moderateScale(1), alignItems: 'center' }}>
          {state === 'driver' ? (
            <>
              <MaterialIcons name="directions-car" size={moderateScale(26)} color={iconColor} />
              {driverLabel && (
                <S.DriverLabelText>{driverLabel}</S.DriverLabelText>
              )}
            </>
          ) : (
            <>
              <MaterialIcons 
                name="airline-seat-recline-normal" 
                size={moderateScale(22)} 
                color={iconColor} 
              />
              {price !== undefined && state !== 'occupied' && (
                <S.PriceText selected={state === 'selected'}>₹{price}</S.PriceText>
              )}
              {state === 'occupied' && (
                 <MaterialIcons 
                  name="block" 
                  size={moderateScale(10)} 
                  color={iconColor}
                  style={{ position: 'absolute', bottom: -moderateScale(2), right: -moderateScale(2) }}
                 />
              )}
            </>
          )}
        </View>
      </S.SeatTouchable>
    </View>
  );
};
