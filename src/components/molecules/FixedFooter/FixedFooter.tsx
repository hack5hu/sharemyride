import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from '@/styles';
import { Container } from './FixedFooter.styles';
import { FixedFooterProps } from './types';

/**
 * FixedFooter Molecule
 *
 * Single source of truth for fixed bottom action footers across the app.
 * Automatically handles `insets.bottom` to ensure full edge-to-edge support on Android & iOS.
 */
export const FixedFooter: React.FC<FixedFooterProps> = ({
  extraBottomOffset = verticalScale(16),
  style,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Container
      style={[
        { paddingBottom: insets.bottom + extraBottomOffset },
        style,
      ]}
    >
      {children}
    </Container>
  );
};
