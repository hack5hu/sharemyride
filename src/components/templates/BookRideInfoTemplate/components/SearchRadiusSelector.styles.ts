import styled from 'styled-components/native';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveFont,
} from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(14)}px;
  padding: ${moderateScale(10)}px ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(10)}px;
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LabelGroup = styled.View`
  flex: 1;
  margin-right: ${scale(8)}px;
`;

export const Label = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(9.5)}px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(2)}px;
`;

export const Subtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => `${theme.colors.on_surface_variant}B3`};
`;

export const StepperControls = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(3)}px;
  gap: ${scale(4)}px;
`;

export const StepperButton = styled.TouchableOpacity<{
  $primary?: boolean;
}>`
  width: ${moderateScale(28)}px;
  height: ${moderateScale(28)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme, $primary }) =>
    $primary ? theme.colors.primary : theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const ValueContainer = styled.View`
  min-width: ${scale(48)}px;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(4)}px;
`;

export const ValueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const PresetsScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: ${verticalScale(8)}px;
`;

export const PresetsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const PresetChip = styled.TouchableOpacity<{
  $selected: boolean;
}>`
  padding-vertical: ${verticalScale(4)}px;
  padding-horizontal: ${scale(10)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.surface_variant};
`;

export const PresetText = styled.Text<{
  $selected: boolean;
}>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 600;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.on_primary : theme.colors.on_surface_variant};
`;

