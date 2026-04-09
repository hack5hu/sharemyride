import styled from 'styled-components/native';
import { View } from 'react-native';
import { moderateScale, verticalScale } from '@/styles';

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;


export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: ${moderateScale(12)}px;
`;

export const Content = styled.View`
  padding: ${moderateScale(24)}px;
  gap: ${moderateScale(24)}px;
  padding-bottom: ${verticalScale(120)}px;
`;


export const Section = styled.View`
  gap: ${moderateScale(16)}px;
`;

export const SectionTitle = styled.View`
  padding-horizontal: ${moderateScale(8)}px;
`;

export const BentoGrid = styled.View`
  flex-direction: column;
  gap: ${moderateScale(16)}px;
`;

export const ActionGrid = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(8)}px;
`;

export const DangerSection = styled.View`
  flex-direction: row;
  gap: ${moderateScale(12)}px;
  margin-top: ${moderateScale(8)}px;
`;

export const DangerButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-vertical: ${moderateScale(20)}px;
  border-radius: ${moderateScale(16)}px;
`;

export const NavItem = styled.TouchableOpacity<{ active?: boolean }>`
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(4)}px;
  padding-horizontal: ${moderateScale(16)}px;
  padding-vertical: ${moderateScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ active, theme }) => active ? theme.colors.primary_container + '33' : 'transparent'};
`;

