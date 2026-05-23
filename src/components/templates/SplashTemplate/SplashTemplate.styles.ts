import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${verticalScale(80)}px;
  padding-horizontal: ${scale(24)}px;
`;

export const AbstractCircleOne = styled.View`
  position: absolute;
  top: -${verticalScale(100)}px;
  left: -${scale(100)}px;
  width: ${scale(280)}px;
  height: ${scale(280)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary_container}15; /* 8% opacity */
`;

export const AbstractCircleTwo = styled.View`
  position: absolute;
  bottom: ${verticalScale(40)}px;
  right: -${scale(80)}px;
  width: ${scale(360)}px;
  height: ${scale(360)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary_container}1C; /* 11% opacity */
`;

export const CenterSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LogoContainer = styled.View`
  width: ${moderateScale(96)}px;
  height: ${moderateScale(96)}px;
  border-radius: ${moderateScale(24)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${verticalScale(32)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.15;
  shadow-radius: 16px;
  elevation: 6;
`;

export const BrandWrapper = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const LoaderSection = styled.View`
  align-items: center;
  margin-top: ${verticalScale(32)}px;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: 'small',
  color: theme.colors.primary,
}))`
  margin-bottom: ${verticalScale(12)}px;
`;

export const FooterSection = styled.View`
  width: 100%;
  align-items: center;
`;

export const NetworkBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: ${moderateScale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  padding-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const NetworkDot = styled.View`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: ${scale(8)}px;
`;
