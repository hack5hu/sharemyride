import React, { memo } from 'react';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Box } from '@/components/atoms/Box';
import { MyRidesTemplateProps } from './types.d';

export const MyRidesTemplate: React.FC<
  MyRidesTemplateProps & {
    children?: React.ReactNode;
  }
> = memo(({ header, bottomNav, children }) => {
  return (
    <ScreenShell>
      {header}

      <Box flex={1}>{children}</Box>
      {bottomNav}
    </ScreenShell>
  );
});
