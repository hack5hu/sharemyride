import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { moderateScale } from '@/styles';

export const Container = styled(Animated.View)`
  width: ${moderateScale(44)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(12)}px;
  justify-content: center;
  padding: 0 2px;
`;

export const Knob = styled(Animated.View)`
  width: ${moderateScale(20)}px;
  height: ${moderateScale(20)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1px;
  elevation: 2;
`;
