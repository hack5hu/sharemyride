import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const CardContainer = styled.TouchableOpacity<{ isSelected?: boolean; fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100% ' : `${scale(150)}px`)};
  padding: ${({ fullWidth }) => (fullWidth ? moderateScale(16) : moderateScale(12))}px;
  border-radius: ${moderateScale(20)}px;
  border-width: ${({ fullWidth }) => (fullWidth ? 2.5 : 2)}px;
  border-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.outline_variant)};
  background-color: ${({ isSelected, theme }) => (isSelected ? `${theme.colors.primary}0D` : theme.colors.surface)};
  position: relative;
  justify-content: space-between;
  ${({ fullWidth, theme }) => fullWidth && `
    shadow-color: ${theme.colors.shadow};
    shadow-offset: 0px 4px;
    shadow-opacity: 0.05;
    shadow-radius: 8px;
    elevation: 2;
  `}
`;

export const SelectionIndicator = styled.View`
  position: absolute;
  top: ${moderateScale(6)}px;
  right: ${moderateScale(6)}px;
  z-index: 10;
`;

export const IconBox = styled.View`
  margin-bottom: ${verticalScale(12)}px;
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
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ color }) => color};
  border-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const AddActionCard = styled.TouchableOpacity<{ fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : `${scale(140)}px`)};
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(20)}px;
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(8)}px;
`;

export const AddIconCircle = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => `${theme.colors.outline_variant}30`};
  align-items: center;
  justify-content: center;
`;

export const ActionRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(12)}px;
  padding-top: ${verticalScale(8)}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}33;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(8)}px;
`;
