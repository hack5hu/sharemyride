import styled from 'styled-components/native';
import { verticalScale, moderateScale, scale } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.tertiary_container};
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(10)}px ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(8)}px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const Message = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(11)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_tertiary_container};
  letter-spacing: 0.5px;
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;
