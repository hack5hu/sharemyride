import styled from 'styled-components/native';
import { verticalScale, moderateScale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const HeaderContainer = styled.View`
  height: ${verticalScale(64)}px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${moderateScale(16)}px;
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
`;

export const HeroSection = styled.View`
  height: ${verticalScale(200)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  overflow: hidden;
  margin: ${moderateScale(16)}px;
  border-radius: ${moderateScale(24)}px;
  position: relative;
`;

export const HeroTint = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 107, 71, 0.4);
`;

export const IconContainer = styled.View<{ color?: string }>`
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  border-radius: ${moderateScale(22)}px;
  background-color: ${({ theme, color }) => color || theme.colors.surface_container};
  align-items: center;
  justify-content: center;
  margin-right: ${moderateScale(16)}px;
`;


export const HeroImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const HeroContent = styled.View`
  position: absolute;
  bottom: ${moderateScale(24)}px;
  left: ${moderateScale(24)}px;
`;

export const HeroSubtitle = styled(Typography).attrs({
  variant: 'body',
  size: 'sm',
  color: 'on_primary',
})`
  opacity: 0.9;
  margin-top: 4px;
`;

export const Section = styled.View`
  padding: ${moderateScale(16)}px;
`;

export const SectionTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

export const MusicSectionHeader = styled(SectionTitleWrapper)`
  margin-top: 24px;
`;

export const SectionTitleText = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  weight: 'bold',
  color: 'primary',
})`
  letter-spacing: 1px;
`;

export const PreferenceItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  margin-bottom: ${moderateScale(12)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.02;
  shadow-radius: 10px;
  elevation: 2;
`;

export const TextWrapper = styled.View`
  flex: 1;
  margin-right: ${moderateScale(16)}px;
`;

export const ChipGroup = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${moderateScale(24)}px;
`;

export const BentoGrid = styled.View`
  flex-direction: row;
  gap: ${moderateScale(16)}px;
  margin-bottom: ${moderateScale(24)}px;
`;

export const BottomAction = styled.View`
  padding: ${moderateScale(24)}px;
  background-color: transparent;
`;

export const TimerItem = styled(PreferenceItem)`
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const TimerHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TimerChipGroup = styled(ChipGroup)`
  margin-bottom: 0;
  margin-top: 4px;
`;
