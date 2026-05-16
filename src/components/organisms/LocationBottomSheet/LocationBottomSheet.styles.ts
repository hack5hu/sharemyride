import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(40)}px;
  border-top-right-radius: ${moderateScale(40)}px;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 20;
  max-height: ${verticalScale(550)}px;
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(24),
  },
})`
  flex-grow: 0;
`;


export const Section = styled.View`
  padding-vertical: ${verticalScale(16)}px;
`;

export const DurationChipsList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: scale(8),
    paddingTop: verticalScale(8),
  },
})`
  flex-grow: 0;
`;

export const SectionHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(12)}px;
`;

export const SuggestionsList = styled.View`
  gap: ${verticalScale(4)}px;
`;
