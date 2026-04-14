import React from 'react';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { Shell } from './ScreenShell.styles';
import { useNavigation } from '@react-navigation/native';

export interface ScreenShellProps {
  /** Screen title shown in the header. Pass undefined to hide the header entirely. */
  title?: string;
  /** Called when back arrow is pressed. Required when title is provided. */
  onBack?: boolean | (() => void);
  /** Optional element rendered on the right side of the header */
  rightElement?: React.ReactNode;
  /** Whether the shell should have a transparent background (e.g. for modals) */
  transparent?: boolean;
  children: React.ReactNode;
}

/**
 * ScreenShell
 *
 * The single source of truth for top safe-area inset.
 * Every screen must be wrapped in this instead of using SafeAreaView directly.
 */
export const ScreenShell: React.FC<ScreenShellProps> = ({
  title,
  onBack,
  rightElement,
  transparent,
  children,
}) => {
 
  return (
    <Shell transparent={transparent}>
      {title != null && (
        <ScreenHeader
          title={title}
          onBack={onBack}
          rightElement={rightElement}
        />
      )}
      {children}
    </Shell>
  );
};
