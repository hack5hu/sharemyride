import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { moderateScale } from '@/styles';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
`;

export const PulseCircle = styled(Animated.View)`
  position: absolute;
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const OuterCircle = styled.View`
  width: ${moderateScale(18)}px;
  height: ${moderateScale(18)}px;
  border-radius: ${moderateScale(9)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  justify-content: center;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const InnerCircle = styled.View`
  width: ${moderateScale(14)}px;
  height: ${moderateScale(14)}px;
  border-radius: ${moderateScale(7)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeadingIndicator = styled(Animated.View)`
  position: absolute;
  top: -${moderateScale(4)}px;
  width: 0;
  height: 0;
  border-left-width: ${moderateScale(6)}px;
  border-right-width: ${moderateScale(6)}px;
  border-bottom-width: ${moderateScale(10)}px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
`;
