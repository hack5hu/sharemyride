import styled from 'styled-components/native';
import { verticalScale, moderateScale } from '@/styles';
import { Input } from '@/components/atoms/Input';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

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
  contentContainerStyle: { paddingBottom: verticalScale(40) }
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

export const HeroImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const HeroOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const HeroTint = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.primary + '33'};
`;


export const HeroContent = styled.View`
  position: absolute;
  bottom: ${moderateScale(24)}px;
  left: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(12)}px;
`;

export const HeroTextWrapper = styled.View`
  flex: 1;
  padding: 0;
`;

export const HeroSubtitle = styled(Typography).attrs({
  variant: 'body',
  size: 'sm',
  color: 'on_primary',
})`
  opacity: 0.9;
  margin-top: 4px;
`;

export const IconBox = styled.View`
  padding: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  border-radius: ${moderateScale(12)}px;
`;

export const FormWrapper = styled.View`
  padding: ${moderateScale(20)}px;
  gap: ${moderateScale(24)}px;
`;

export const InputGroup = styled(FormWrapper)`
  padding: 0;
  gap: 16px;
`;

export const CardSection = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(24)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.03;
  shadow-radius: 12px;
  elevation: 2;
`;


export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

export const SectionTitleText = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  weight: 'bold',
  color: 'primary',
})`
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const InputGrid = styled.View`
  flex-direction: row;
  gap: ${moderateScale(12)}px;
`;

export const GridItem = styled.View`
  flex: 1;
`;

export const ColorScroll = styled.ScrollView`
  margin-top: ${moderateScale(8)}px;
  padding-bottom: ${moderateScale(4)}px;
`;

export const ColorRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ColorGroup = styled.View`
  gap: ${moderateScale(8)}px;
  margin-top: ${verticalScale(16)}px;
`;

export const PlateInput = styled(Input).attrs({
  autoCapitalize: 'characters',
})`
  font-family: 'monospace';
  letter-spacing: 4px;
  font-weight: bold;
`;

export const CapacityRow = styled(ColorRow)`
  gap: 12px;
  padding-top: 10px;
`;

export const CapacityError = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  color: 'error',
})`
  margin-left: 4px;
`;

export const BottomAction = styled.View`
  padding: ${moderateScale(24)}px;
`;

