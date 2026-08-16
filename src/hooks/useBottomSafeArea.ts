import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from '@/styles';

/**
 * A custom hook to calculate the bottom safe area padding across platforms.
 *
 * iOS has a large default bottom inset (e.g., 34px) for the home indicator, which often
 * pushes floating components too high up. This hook allows overriding the iOS inset
 * with a smaller static padding while keeping Android's dynamic inset behavior.
 *
 * @param iosStaticPadding The static padding to use on iOS (default: verticalScale(16))
 * @param androidMinPadding The minimum padding to use on Android alongside insets.bottom (default: verticalScale(12))
 */
export const useBottomSafeArea = (
  iosStaticPadding?: number,
  androidMinPadding?: number,
) => {
  const insets = useSafeAreaInsets();

  const iosPadding = iosStaticPadding ?? verticalScale(24);
  
  // For Android, if edge-to-edge gesture navigation is active, insets.bottom is > 0.
  // We don't need excessive extra padding, just the inset itself so it clears the gesture bar.
  // If insets.bottom is 0 (classic 3-button nav outside the window), we add a small default padding.
  const androidPadding = insets.bottom > 0 
    ? insets.bottom 
    : (androidMinPadding ?? verticalScale(8));

  return Platform.OS === 'ios'
    ? iosPadding + verticalScale(8)
    : androidPadding;
};
