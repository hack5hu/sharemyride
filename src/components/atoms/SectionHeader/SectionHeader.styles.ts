import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(16)}px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const Title = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(18)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const ActionButton = styled.TouchableOpacity`
  padding-vertical: ${verticalScale(4)}px;
`;

export const ActionText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.primary};
`;
