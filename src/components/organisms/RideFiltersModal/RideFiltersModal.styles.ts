import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const ModalContainer = styled(Box)`
  flex: 1;
  justify-content: flex-end;
`;

export const Backdrop = styled.Pressable`
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
`;

export const SheetContent = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(28)}px;
  border-top-right-radius: ${moderateScale(28)}px;
  width: 100%;
  max-height: 88%;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px -6px;
  shadow-opacity: 0.12;
  shadow-radius: 16px;
  elevation: 24;
`;

export const Handle = styled(Box)`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(5)}px;
  background-color: ${({ theme }) => theme.colors.surface_variant};
  border-radius: ${moderateScale(3)}px;
  align-self: center;
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const Header = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(12)}px;
`;

export const ClearButton = styled.TouchableOpacity`
  padding-vertical: ${verticalScale(4)}px;
  padding-horizontal: ${scale(8)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const ScrollBody = styled.ScrollView`
  padding-horizontal: ${scale(24)}px;
`;

export const Section = styled(Box)`
  margin-bottom: ${verticalScale(24)}px;
`;

export const SectionTitle = styled(Box)`
  margin-bottom: ${verticalScale(12)}px;
`;

export const ProximityGrid = styled(Box)`
  flex-direction: row;
  gap: ${scale(12)}px;
`;

export const ProximityButton = styled.TouchableOpacity<{ $active?: boolean }>`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${verticalScale(14)}px;
  padding-horizontal: ${scale(16)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary_container + '26' : theme.colors.surface_container_low};
`;

export const RadiusCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
`;

export const RadiusTopRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const StepperGroup = styled(Box)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(3)}px;
  gap: ${scale(4)}px;
`;

export const StepperBtn = styled.TouchableOpacity<{ $primary?: boolean }>`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme, $primary }) =>
    $primary ? theme.colors.primary : theme.colors.surface_variant};
  align-items: center;
  justify-content: center;
`;

export const PresetsScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: ${verticalScale(4)}px;
`;

export const PresetChip = styled.TouchableOpacity<{ $selected: boolean }>`
  padding-vertical: ${verticalScale(6)}px;
  padding-horizontal: ${scale(12)}px;
  border-radius: ${moderateScale(12)}px;
  margin-right: ${scale(8)}px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.surface};
`;

export const PresetText = styled(Typography)<{ $selected: boolean }>`
  font-size: ${responsiveFont(12)}px;
  font-weight: 700;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.on_primary : theme.colors.on_surface_variant};
`;

export const TimeGrid = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: ${verticalScale(10)}px;
`;

export const TimeCell = styled.TouchableOpacity<{ $active?: boolean }>`
  width: 31%;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary_container + '2E' : theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
  padding-horizontal: ${scale(8)}px;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(6)}px;
`;

export const PreferenceItem = styled.TouchableOpacity<{ $active?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${verticalScale(14)}px;
  padding-horizontal: ${scale(16)}px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary_container + '1A' : theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(10)}px;
`;

export const PreferenceLeft = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
`;

export const IconBadge = styled(Box)<{ $color?: string }>`
  width: ${moderateScale(36)}px;
  height: ${moderateScale(36)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ $color }) => ($color ? $color + '1A' : 'rgba(0,0,0,0.05)')};
  align-items: center;
  justify-content: center;
`;

export const Footer = styled(Box)<{ $paddingBottom?: number }>`
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(12)}px;
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom !== undefined ? $paddingBottom : verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
