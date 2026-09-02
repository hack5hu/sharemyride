import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale } from '@/styles';

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
  padding: ${scale(16)}px;
  gap: ${verticalScale(20)}px;
  padding-bottom: ${verticalScale(120)}px;
`;

export const Section = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const SectionTitle = styled.View`
  padding-horizontal: ${scale(6)}px;
`;

export const SectionTitleText = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  weight: 'bold',
  color: 'on_surface_variant',
})`
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

export const BentoGrid = styled.View`
  flex-direction: column;
  gap: ${verticalScale(14)}px;
`;

export const ActionGrid = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(22)}px;
  padding: ${moderateScale(6)}px;
  elevation: 1;
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
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary_container + '33' : 'transparent'};
`;
