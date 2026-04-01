import React from 'react';
import { TouchableOpacityProps } from 'react-native';

export interface ChipProps extends TouchableOpacityProps {
  label: string;
  selected?: boolean;
}
