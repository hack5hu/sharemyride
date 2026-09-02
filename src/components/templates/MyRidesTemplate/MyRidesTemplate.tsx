import React, { memo } from 'react';
import { Box } from '@/components/atoms/Box';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { type MyRidesTemplateProps } from './types.d';

export const MyRidesTemplate: React.FC<
  MyRidesTemplateProps & {
    children?: React.ReactNode;
  }
> = memo(({ header, bottomNav, children }) => {
  return (
    <ScreenShell noPaddingBottom={Boolean(bottomNav)}>
      {header}

      <Box flex={1}>{children}</Box>
      {bottomNav}
    </ScreenShell>
  );
});
