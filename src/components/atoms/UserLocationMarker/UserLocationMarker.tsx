import React, { useEffect } from 'react';
import { useSharedValue, withRepeat, withTiming, useAnimatedStyle, withDelay } from 'react-native-reanimated';
import { 
  Container, 
  PulseCircle, 
  OuterCircle, 
  InnerCircle, 
  HeadingIndicator 
} from './UserLocationMarker.styles';
import { UserLocationMarkerProps } from './types.d';

export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ 
  heading = 0, 
  pulsing = true 
}) => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    if (pulsing) {
      scale.value = withRepeat(
        withTiming(1, { duration: 2000 }),
        -1,
        false
      );
      opacity.value = withRepeat(
        withTiming(0, { duration: 2000 }),
        -1,
        false
      );
    } else {
      scale.value = 0.5;
      opacity.value = 0;
    }
  }, [pulsing, scale, opacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const headingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${heading}deg` }],
  }));

  return (
    <Container>
      {pulsing && <PulseCircle style={pulseStyle} />}
      <OuterCircle>
        <InnerCircle />
      </OuterCircle>
      {heading !== undefined && (
        <HeadingIndicator style={headingStyle} />
      )}
    </Container>
  );
};

export default React.memo(UserLocationMarker);
