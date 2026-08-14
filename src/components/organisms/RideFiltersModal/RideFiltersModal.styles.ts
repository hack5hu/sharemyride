import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';
import { Box } from '@/components/atoms/Box';

export const ModalContainer = styled(Box)`
  flex: 1;
  justify-content: flex-end;
`;

export const Backdrop = styled.Pressable`
  position: absolute;
  inset: 0;
  background-color: rgba(23, 29, 25, 0.4);
`;

export const SheetContent = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(32)}px;
  border-top-right-radius: ${moderateScale(32)}px;
  width: 100%;
  max-height: 85%;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 20;
`;

export const Handle = styled(Box)`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant}4D;
  border-radius: ${moderateScale(3)}px;
  align-self: center;
  margin-vertical: ${verticalScale(12)}px;
`;

export const Header = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(16)}px;
`;

export const ScrollBody = styled.ScrollView`
  padding-horizontal: ${scale(24)}px;
`;

export const Section = styled(Box)`
  margin-bottom: ${verticalScale(32)}px;
`;

export const SectionTitle = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${verticalScale(16)}px;
`;

export const ProximityGrid = styled(Box)`
  flex-direction: row;
  gap: ${scale(12)}px;
`;

export const ProximityButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.outline_variant + '4D'};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary + '0D' : theme.colors.surface_container_low};
`;

export const PreferenceItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const PreferenceLeft = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const CounterRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-radius: ${moderateScale(16)}px;
`;

export const CounterControls = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(24)}px;
`;

export const Footer = styled(Box)<{ $paddingBottom?: number }>`
  padding: ${scale(24)}px;
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom !== undefined ? $paddingBottom : verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ApplyButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(16)}px;
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

export const TimeGrid = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(12)}px;
`;

export const TimeCell = styled.TouchableOpacity<{ active?: boolean }>`
  width: ${(scale(327) - scale(48) - scale(24)) / 3}px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary + '1A' : theme.colors.surface_container_low};
  border-width: 1px;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.outline_variant + '33'};
  border-radius: ${moderateScale(16)}px;
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(4)}px;
`;

export const ClearButton = styled.TouchableOpacity``;
