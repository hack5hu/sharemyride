import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export const BottomSheetContainer = styled(SafeAreaView)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  padding: ${moderateScale(24)}px;
`;

export const CardSurface = styled.View`
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}E6`}; /* 90% opacity */
  border-radius: ${moderateScale(32)}px;
  padding: ${moderateScale(24)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px -8px;
  shadow-opacity: 0.06;
  shadow-radius: 40px;
  elevation: 8;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}1A`};
  /* Note: true blur requires @react-native-community/blur, using opacity for now */
`;

export const LocationHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(16)}px;
`;

export const IconContainer = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(4)}px;
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const LabelSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const LocationTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(4)}px;
`;

export const LocationSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const SelectButtonContainer = styled.View`
  margin: ${verticalScale(32)}px;
`;

export const SelectGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.primary, theme.colors.primary_container],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  width: 100%;
  padding-vertical: ${verticalScale(20)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 12px;
  shadow-opacity: 0.25;
  shadow-radius: 24px;
  elevation: 8;
`;

export const SelectButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
`;

export const SelectButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
