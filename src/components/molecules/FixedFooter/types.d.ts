import React from 'react';
import { ViewStyle } from 'react-native';

export interface FixedFooterProps {
  /** Optional extra bottom padding beyond safe-area inset (defaults to verticalScale(16)) */
  extraBottomOffset?: number;
  /** Optional custom container style */
  style?: ViewStyle;
  /** Children rendered inside the fixed footer */
  children: React.ReactNode;
}
