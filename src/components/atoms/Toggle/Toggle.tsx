import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container, Knob } from './Toggle.styles';
import { ToggleProps } from './types';

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  style,
}) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const handlePress = () => {
    onValueChange?.(!value);
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.outline_variant, theme.colors.primary],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Container style={[style, { backgroundColor }]}>
        <Knob style={{ transform: [{ translateX }] }} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
