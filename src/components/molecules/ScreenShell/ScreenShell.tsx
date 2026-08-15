import React from 'react';
import { Platform } from 'react-native';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { Shell } from './ScreenShell.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ScreenShellProps {
  /** Screen title shown in the header. Pass undefined to hide the header entirely. */
  title?: string;
  /** Called when back arrow is pressed. Required when title is provided. */
  onBack?: boolean | (() => void);
  /** Optional element rendered on the right side of the header */
  rightElement?: React.ReactNode;
  /** Whether the shell should have a transparent background (e.g. for modals) */
  transparent?: boolean;
  /** Disable top safe area padding to draw content directly behind the status bar */
  noPaddingTop?: boolean;
  /** Disable bottom safe area padding (e.g. for screens with custom bottom navigation or full-screen maps) */
  noPaddingBottom?: boolean;
  children: React.ReactNode;
}

/**
 * ScreenShell
 *
 * The single source of truth for top and bottom safe-area insets across the whole app.
 * Every screen must be wrapped in this instead of using SafeAreaView directly.
 */
export const ScreenShell: React.FC<ScreenShellProps> = ({
  title,
  onBack,
  rightElement,
  transparent,
  noPaddingTop,
  noPaddingBottom,
  children,
}) => {
  const insets = useSafeAreaInsets();
  
  // Use a static bottom padding for iOS as the default inset can be too large,
  // while preserving the default behaviour on Android.
  const bottomPadding = Platform.OS === 'ios' ? 16 : insets.bottom;
  
  const paddingStyle = { 
    paddingTop: noPaddingTop ? 0 : insets.top, 
    paddingBottom: noPaddingBottom ? 0 : bottomPadding 
  };

  return (
    <Shell
      transparent={transparent}
      style={paddingStyle}
    >
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
