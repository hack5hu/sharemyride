import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '@/styles';

export const FareCard = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${moderateScale(24)}px;
  border-radius: ${({ theme }) => theme.roundness.md}px;
  margin-top: ${verticalScale(8)}px;
`;

export const FareLabel = styled.View`
  flex: 1;
`;

export const FarePriceBig = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${moderateScale(36)}px;
  color: #ffffff;
  margin-vertical: ${verticalScale(4)}px;
`;

export const PerSeatNote = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${moderateScale(12)}px;
  color: rgba(255, 255, 255, 0.8);
`;

export const FareIconBox = styled.View`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(32)}px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
`;
