import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Backdrop = styled.Pressable`
  position: absolute;
  inset: 0;
  background-color: rgba(23, 29, 25, 0.4);
`;

export const SheetContent = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(32)}px;
  border-top-right-radius: ${moderateScale(32)}px;
  width: 100%;
  max-height: 85%;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 20;
`;

export const Handle = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant}4D;
  border-radius: ${moderateScale(3)}px;
  align-self: center;
  margin-vertical: ${verticalScale(12)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(16)}px;
`;

export const ScrollBody = styled.ScrollView`
  padding-horizontal: ${scale(24)}px;
`;

export const Section = styled.View`
  margin-bottom: ${verticalScale(32)}px;
`;

export const SectionTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${verticalScale(16)}px;
`;

export const ProximityGrid = styled.View`
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
  border-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.outline_variant + '4D'};
  background-color: ${({ theme, active }) => active ? theme.colors.primary + '0D' : theme.colors.surface_container_low};
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

export const PreferenceLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const CounterRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-radius: ${moderateScale(16)}px;
`;

export const CounterControls = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(24)}px;
`;

export const Footer = styled.View`
  padding: ${moderateScale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
  background-color: ${({ theme }) => theme.colors.surface}CC;
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

export const SliderTrack = styled.View`
  height: ${verticalScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(3)}px;
  margin-vertical: ${verticalScale(20)}px;
  position: relative;
`;

export const SliderRange = styled.View<{ start: number; end: number }>`
  position: absolute;
  left: ${({ start }) => start}%;
  right: ${({ end }) => 100 - end}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(3)}px;
`;

export const SliderThumb = styled.View`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.on_primary};
  margin-left: -${moderateScale(12)}px;
  margin-top: -${moderateScale(9)}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;
export const TimeLabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
