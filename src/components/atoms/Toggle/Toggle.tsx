import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container, Knob } from './Toggle.styles';
import { ToggleProps } from './types';

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  style,
  disabled,
}) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const handlePress = () => {
    if (disabled) return;
    onValueChange?.(!value);
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      disabled ? theme.colors.surface_container_highest : theme.colors.outline_variant, 
      disabled ? theme.colors.outline : theme.colors.primary
    ],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <Container style={[style, { backgroundColor, opacity: disabled ? 0.6 : 1 }]}>
        <Knob style={{ transform: [{ translateX }] }} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
