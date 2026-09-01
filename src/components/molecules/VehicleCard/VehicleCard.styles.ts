import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const CardContainer = styled.TouchableOpacity<{
  isSelected?: boolean;
  fullWidth?: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : `${scale(160)}px`)};
  padding: ${({ fullWidth }) =>
    fullWidth ? moderateScale(16) : moderateScale(14)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? theme.colors.primary_container
      : theme.colors.surface_container_low};
  elevation: 2;
  gap: ${verticalScale(10)}px;
`;

export const SelectionIndicator = styled.View`
  position: absolute;
  top: ${moderateScale(12)}px;
  right: ${moderateScale(12)}px;
  z-index: 10;
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BrandInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
  flex: 1;
`;

export const IconBox = styled.View<{ isSelected?: boolean }>`
  width: ${scale(42)}px;
  height: ${scale(42)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? 'rgba(255, 255, 255, 0.25)' : theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const InfoBox = styled.View`
  gap: ${verticalScale(4)}px;
`;

export const CompanyRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const ColorDot = styled.View<{ color: string }>`
  width: ${moderateScale(10)}px;
  height: ${moderateScale(10)}px;
  border-radius: ${moderateScale(5)}px;
  background-color: ${({ color }) => color};
`;

export const CompanyText = styled(Typography).attrs<{ isSelected?: boolean }>(
  ({ isSelected }) => ({
    variant: 'label',
    size: 'xs',
    weight: 'bold',
    color: isSelected ? 'on_primary' : 'primary',
  }),
)<{ isSelected?: boolean }>`
  text-transform: uppercase;
`;

export const BadgesRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(2)}px;
`;

export const SpecPill = styled.View<{ isSelected?: boolean }>`
  padding: ${verticalScale(3)}px ${scale(10)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? 'rgba(255, 255, 255, 0.2)' : theme.colors.surface_container_high};
`;

export const SpecTypeText = styled(Typography).attrs<{ isSelected?: boolean }>(
  ({ isSelected }) => ({
    variant: 'label',
    size: 'xs',
    weight: 'medium',
    color: isSelected ? 'on_primary' : 'on_surface_variant',
  }),
)<{ isSelected?: boolean }>`
  text-transform: capitalize;
`;

export const AddActionCard = styled.TouchableOpacity<{ fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : `${scale(140)}px`)};
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(8)}px;
`;

export const AddIconCircle = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const ActionRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const ActionButton = styled.TouchableOpacity`
  width: ${scale(34)}px;
  height: ${scale(34)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

