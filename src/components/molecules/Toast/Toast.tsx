import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { ToastContainer, ToastText } from './Toast.styles';
import { ToastProps } from './types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';

export const Toast: React.FC<ToastProps> = ({ type, message, isVisible, onHide }) => {
  const theme = useTheme();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });

      if (onHide) {
        translateY.value = withSequence(
          withDelay(3000, withTiming(-100, { duration: 300 })),
          withTiming(-100, {}, () => runOnJS(onHide)())
        );
        opacity.value = withSequence(
          withDelay(3000, withTiming(0, { duration: 300 }))
        );
      }
    } else {
      translateY.value = withTiming(-100);
      opacity.value = withTiming(0);
    }
  }, [isVisible, onHide, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    position: 'absolute',
    top: 32,
    left: 24,
    right: 24,
    zIndex: 50,
  }));

  const iconName = type === 'error' ? 'error' : 'check-circle';
  const iconColor = type === 'error' ? theme.colors.error : theme.colors.primary;

  return (
    <Animated.View style={animatedStyle} pointerEvents="none">
      <ToastContainer type={type}>
        <Icon name={iconName} size={24} color={iconColor} />
        <ToastText type={type}>{message}</ToastText>
      </ToastContainer>
    </Animated.View>
  );
};
