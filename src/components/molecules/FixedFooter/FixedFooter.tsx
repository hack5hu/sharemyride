import React from 'react';
import { verticalScale } from '@/styles';
import { useBottomSafeArea } from '@/hooks/useBottomSafeArea';
import { Container } from './FixedFooter.styles';
import { FixedFooterProps } from './types';

/**
 * FixedFooter Molecule
 *
 * Single source of truth for fixed bottom action footers across the app.
 * Automatically handles bottom padding to ensure full edge-to-edge support on Android & iOS.
 */
export const FixedFooter: React.FC<FixedFooterProps> = ({
  extraBottomOffset = verticalScale(16),
  style,
  children,
}) => {
  const bottomPadding = useBottomSafeArea(extraBottomOffset, extraBottomOffset);

  return (
    <Container
      style={[
        { paddingBottom: bottomPadding },
        style,
      ]}
    >
      {children}
    </Container>
  );
};
