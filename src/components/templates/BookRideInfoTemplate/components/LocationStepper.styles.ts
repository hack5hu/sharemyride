import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const StepperContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(24)}px;
`;

export const StepperLabelGroup = styled.View`
  flex: 1;
  margin-right: ${scale(12)}px;
`;

export const StepperLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const StepperSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => `${theme.colors.on_surface_variant}B3`};
  margin-top: ${verticalScale(2)}px;
`;

export const StepperControls = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(6)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(12)}px;
`;

export const StepperButton = styled.TouchableOpacity<{
  primary?: boolean;
  disabled?: boolean;
}>`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme, primary, disabled }) => {
    if (disabled) return `${theme.colors.surface_container_highest}80`;
    return primary ? theme.colors.primary : theme.colors.surface_container_high;
  }};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const StepperValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  min-width: ${scale(24)}px;
  text-align: center;
`;
