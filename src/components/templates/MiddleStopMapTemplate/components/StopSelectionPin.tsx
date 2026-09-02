import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale, verticalScale } from '@/styles';
import * as S from './StopSelectionPin.styles';

export interface StopSelectionPinProps {
  isMoving: boolean;
  tooltipText: string;
}

export const StopSelectionPin: React.FC<StopSelectionPinProps> = ({
  isMoving,
  tooltipText,
}) => {
  const theme = useTheme();
  const pinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(pinAnim, {
      toValue: isMoving ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isMoving, pinAnim]);

  const pinTranslateY = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -verticalScale(20)],
  });

  const pinScale = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const shadowOpacity = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  const shadowScale = pinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });

  const animatedPinStyle = {
    transform: [{ translateY: pinTranslateY }, { scale: pinScale }],
  };

  const animatedTooltipStyle = {
    opacity: pinAnim.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [1, 0, 0],
    }),
  };

  const animatedShadowStyle = {
    opacity: shadowOpacity,
    transform: [{ scale: shadowScale }],
  };

  return (
    <S.PinContainer pointerEvents="none">
      <S.PinWrapper as={Animated.View} style={animatedPinStyle}>
        <S.TooltipBubble as={Animated.View} style={animatedTooltipStyle}>
          <S.TooltipText>{tooltipText}</S.TooltipText>
        </S.TooltipBubble>

        <MaterialIcons
          name="place"
          size={moderateScale(32)}
          color={theme.colors.primary}
        />
        <S.PinShadow as={Animated.View} style={animatedShadowStyle} />
      </S.PinWrapper>
    </S.PinContainer>
  );
};
