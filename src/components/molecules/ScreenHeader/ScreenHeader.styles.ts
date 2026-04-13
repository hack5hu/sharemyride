import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index:100;
`;

export const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  flex: 1;
`;

export const RightSection = styled.View`
  min-width: ${moderateScale(44)}px;
  align-items: flex-end;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container}80;
  align-items: center;
  justify-content: center;
`;
