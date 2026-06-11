import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const ContentPadding = styled.View`
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(40)}px;
  gap: ${verticalScale(20)}px;
`;

export const UserCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  align-items: center;
  gap: ${verticalScale(8)}px;
`;

export const CategoryCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(12)}px;
`;

export const StarRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${scale(12)}px;
  margin-vertical: ${verticalScale(4)}px;
`;

export const StarButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

export const FooterContainer = styled.View`
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;
