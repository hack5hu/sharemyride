import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '@/styles';

export const CardContainer = styled(LinearGradient)`
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  position: relative;
  overflow: hidden;
  min-height: ${moderateScale(160)}px;
  justify-content: space-between;
`;

export const BlurElement = styled.View`
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: ${moderateScale(120)}px;
  height: ${moderateScale(120)}px;
  background-color: ${({ theme }) => theme.colors.primary_fixed}33; // 20% opacity
  border-radius: 100px;
`;

export const CardHeader = styled.View`
  z-index: 10;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  z-index: 10;
`;
