import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const ListContainer = styled.View`
  position: relative;
`;

export const PathLine = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [`${theme.colors.primary}66`, `${theme.colors.primary}33`, `${theme.colors.primary}66`],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))`
  position: absolute;
  left: ${scale(23)}px; /* roughly lines up with the center of the 48px circle icon (12px + 24/2 roughly, but HTML says 23px so we'll stick to 23px for consistency) */
  top: ${verticalScale(24)}px;
  bottom: ${verticalScale(24)}px;
  width: ${moderateScale(2)}px;
  z-index: 0;
`;

export const LocationItemArea = styled.View`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(6)}px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  elevation: 1;
`;

export const MiddleStopArea = styled.View`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(6)}px;
  margin-bottom: ${verticalScale(12)}px;
  shadow-color: rgb(23,29,25);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 12px;
  elevation: 2;
`;

export const AddStopButtonContainer = styled.TouchableOpacity`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => `${theme.colors.primary_fixed_dim}33`}; /* 20% opacity */
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => `${theme.colors.primary}33`};
  border-radius: ${moderateScale(6)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const IconCircle = styled.View<{ variant: 'start' | 'stop' | 'add' | 'end' }>`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'start': return theme.colors.primary_fixed;
      case 'stop': return theme.colors.secondary_container;
      case 'add': return theme.colors.surface_container_lowest;
      case 'end': return theme.colors.primary;
      default: return 'transparent';
    }
  }};
  ${({ variant, theme }) => variant === 'add' && `
    shadow-color: ${theme.colors.on_surface};
    shadow-offset: 0px 1px;
    shadow-opacity: 0.05;
    shadow-radius: 2px;
    elevation: 1;
  `}
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const LabelText = styled.Text<{ variant: 'start' | 'stop' | 'end' }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme, variant }) => variant === 'stop' ? theme.colors.on_surface_variant : theme.colors.primary};
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const AddTitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const AddSubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  border-radius: 9999px;
`;
