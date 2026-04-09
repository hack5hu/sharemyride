import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ContentScroll = styled.ScrollView`
  flex: 1;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const DriverMeta = styled.View`
  align-items: flex-end;
`;

export const BriefingCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(20)}px;
  margin-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(12)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 20px;
`;

export const IconCircle = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  background-color: ${({ theme }) => theme.colors.primary_container}1A;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
`;
