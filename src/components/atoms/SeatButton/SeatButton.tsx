import React from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { SeatState, SeatTouchable, SeatGradient, DriverLabelText } from './SeatButton.styles';

export interface SeatButtonProps {
  id: string;
  state: SeatState;
  onPress?: (id: string) => void;
  driverLabel?: string;
}

export const SeatButton: React.FC<SeatButtonProps> = ({ id, state, onPress, driverLabel }) => {
  const theme = useTheme();

  const iconColor = state === 'selected'
    ? theme.colors.on_primary
    : state === 'driver'
    ? theme.colors.outline
    : theme.colors.outline;

  return (
    <View style={{ alignItems: 'center' }}>
      <SeatTouchable
        state={state}
        onPress={() => state !== 'driver' && onPress?.(id)}
        activeOpacity={0.75}
      >
        {state === 'selected' && (
          <SeatGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        <View style={{ position: 'absolute' }}>
          {state === 'driver' ? (
            <MaterialIcons name="airline-seat-recline-extra" size={moderateScale(24)} color={iconColor} />
          ) : (
            <MaterialIcons name="airline-seat-recline-normal" size={moderateScale(24)} color={iconColor} />
          )}
        </View>
      </SeatTouchable>
      {state === 'driver' && driverLabel && (
        <DriverLabelText>{driverLabel}</DriverLabelText>
      )}
    </View>
  );
};
