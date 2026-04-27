import styled from 'styled-components/native';
import { View } from 'react-native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const BackgroundBubble = styled(View)<{
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}>`
  position: absolute;
  width: 30%;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.primary}0D; /* 5% opacity */
  border-radius: 9999px;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  right: ${({ right }) => right || 'auto'};
`;

export const SaveButton = styled.TouchableOpacity`
  padding-right: ${moderateScale(24)}px;
`;

export const SaveText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(140),
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-top: ${verticalScale(16)}px;
`;

export const TitleSection = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const PageTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(28)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const PageSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(22)}px;
`;
