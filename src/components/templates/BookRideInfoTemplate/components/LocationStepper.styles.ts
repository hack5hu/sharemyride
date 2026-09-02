import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const StepperContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(14)}px;
  padding: ${moderateScale(10)}px ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(10)}px;
`;

export const StepperLabelGroup = styled.View`
  flex: 1;
  margin-right: ${scale(8)}px;
`;

export const StepperLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9.5)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

export const StepperSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => `${theme.colors.on_surface_variant}B3`};
  margin-top: ${verticalScale(2)}px;
`;

export const StepperControls = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(3)}px;
  border-radius: ${moderateScale(16)}px;
  gap: ${scale(6)}px;
`;

export const StepperButton = styled.TouchableOpacity<{
  primary?: boolean;
  disabled?: boolean;
}>`
  width: ${moderateScale(28)}px;
  height: ${moderateScale(28)}px;
  border-radius: ${moderateScale(14)}px;
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
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  min-width: ${scale(20)}px;
  text-align: center;
`;

