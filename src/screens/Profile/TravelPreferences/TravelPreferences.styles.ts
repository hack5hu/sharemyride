import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollLayout = styled.ScrollView`
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

export const HeroContent = styled.View`
  position: absolute;
  bottom: ${moderateScale(24)}px;
  left: ${moderateScale(24)}px;
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
