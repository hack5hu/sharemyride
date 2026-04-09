import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const ContentPadding = styled.View`
  padding-horizontal: ${scale(20)}px;
  padding-bottom: ${verticalScale(40)}px;
  gap: ${verticalScale(24)}px;
`;

export const NavBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface}CC;
`;

export const NavLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const MapSection = styled.View`
  width: 100%;
  height: ${verticalScale(240)}px;
  border-radius: ${moderateScale(24)}px;
  overflow: hidden;
  position: relative;
`;

export const MapImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const DistanceOverlay = styled.View`
  position: absolute;
  bottom: ${verticalScale(16)}px;
  right: ${scale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest}E6;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(999)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  elevation: 2;
`;

export const BentoRow = styled.View`
  flex-direction: row;
  gap: ${scale(16)}px;
`;

export const DriverCard = styled.View`
  flex: 2;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
`;

export const CarCard = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(4)}px;
`;

export const RoundAction = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  align-items: center;
  justify-content: center;
`;

export const SectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(32)}px;
  padding: ${moderateScale(24)}px;
  elevation: 2;
`;

export const GridRow = styled.View`
  flex-direction: row;
  gap: ${scale(16)}px;
`;

export const GridItem = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(12)}px;
`;

export const AmenityRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const FareCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(32)}px;
  padding: ${moderateScale(24)}px;
`;

export const FareRow = styled.View<{ isTotal?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ isTotal }) => (isTotal ? 0 : verticalScale(12))}px;
`;

export const Footer = styled.View`
  padding-top: ${verticalScale(16)}px;
`;

export const BookButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(16)}px;
  padding-vertical: ${verticalScale(18)}px;
  align-items: center;
  justify-content: center;
  elevation: 8;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
`;
