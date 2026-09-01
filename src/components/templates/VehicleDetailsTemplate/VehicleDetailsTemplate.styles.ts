import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { verticalScale, moderateScale, scale, responsiveFont } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const ScrollContainer = styled(KeyboardAwareScrollView).attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: verticalScale(36) },
}))`
  flex: 1;
`;

export const HeroSection = styled.View`
  margin: ${moderateScale(16)}px;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  overflow: hidden;
  padding: ${moderateScale(20)}px;
  min-height: ${verticalScale(140)}px;
  justify-content: space-between;
`;

export const HeroDecorCircle = styled.View`
  position: absolute;
  right: -${scale(30)}px;
  top: -${scale(30)}px;
  width: ${scale(140)}px;
  height: ${scale(140)}px;
  border-radius: ${scale(70)}px;
  background-color: rgba(255, 255, 255, 0.08);
`;

export const HeroBadge = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  gap: ${scale(6)}px;
  padding: ${verticalScale(4)}px ${scale(10)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: rgba(255, 255, 255, 0.18);
  margin-bottom: ${verticalScale(12)}px;
`;

export const HeroContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const HeroTextWrapper = styled.View`
  flex: 1;
  padding-right: ${scale(12)}px;
`;

export const HeroSubtitle = styled(Typography).attrs({
  variant: 'body',
  size: 'sm',
  color: 'on_primary',
})`
  opacity: 0.9;
  margin-top: ${verticalScale(4)}px;
`;

export const HeroIconBox = styled.View`
  width: ${scale(52)}px;
  height: ${scale(52)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled.View`
  padding-horizontal: ${moderateScale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const CardSection = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(18)}px;
  border-radius: ${moderateScale(22)}px;
  elevation: 2;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(14)}px;
`;

export const SectionTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const SectionTitleText = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  weight: 'bold',
  color: 'primary',
})`
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const ActiveValuePill = styled.View`
  padding: ${verticalScale(3)}px ${scale(10)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
`;

export const InputGroup = styled.View`
  gap: ${verticalScale(14)}px;
`;

export const TypeSelectorRow = styled.View`
  flex-direction: row;
  gap: ${scale(10)}px;
  margin-top: ${verticalScale(4)}px;
`;

export const TypeCard = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${verticalScale(12)}px ${scale(8)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.primary_container : theme.colors.surface_container_lowest)};
  elevation: ${({ selected }) => (selected ? 3 : 1)};
  gap: ${verticalScale(6)}px;
`;

export const ColorScroll = styled.ScrollView`
  margin-top: ${verticalScale(4)}px;
  padding-vertical: ${verticalScale(4)}px;
`;

export const ColorRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const CapacityRow = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  margin-top: ${verticalScale(6)}px;
`;

export const CapacityCard = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding: ${moderateScale(14)}px;
  border-radius: ${moderateScale(18)}px;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.primary_container : theme.colors.surface_container_lowest)};
  elevation: ${({ selected }) => (selected ? 3 : 1)};
  justify-content: space-between;
  min-height: ${verticalScale(100)}px;
`;

export const CapacityCardTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CapacityIconCircle = styled.View<{ selected: boolean }>`
  width: ${scale(38)}px;
  height: ${scale(38)}px;
  border-radius: ${scale(19)}px;
  background-color: ${({ theme, selected }) => (selected ? 'rgba(255, 255, 255, 0.25)' : theme.colors.surface_container_high)};
  align-items: center;
  justify-content: center;
`;

export const CapacityCheckmark = styled.View`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  border-radius: ${scale(10)}px;
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;
`;

export const CapacityCardBottom = styled.View`
  margin-top: ${verticalScale(8)}px;
  gap: ${verticalScale(2)}px;
`;

export const CapacitySubtitle = styled(Typography).attrs<{ selected: boolean }>(({ selected }) => ({
  variant: 'label',
  size: 'xs',
  color: selected ? 'on_primary' : 'on_surface_variant',
}))<{ selected: boolean }>`
  opacity: 0.85;
  font-size: ${responsiveFont(11)}px;
`;

export const SectionError = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  color: 'error',
})`
  margin-top: ${verticalScale(6)}px;
  margin-left: ${scale(4)}px;
`;

export const BottomAction = styled.View`
  padding: ${verticalScale(12)}px ${moderateScale(16)}px ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
