import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const ListContainer = styled.View`
  position: relative;
`;

export const PathLine = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    `${theme.colors.primary}80`, 
    `${theme.colors.primary}33`, 
    theme.colors.secondary_container,
    `${theme.colors.primary}80`
  ],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))`
  position: absolute;
  left: ${scale(24 + 16)}px; /* Align with center of IconCircle */
  top: ${verticalScale(40)}px;
  bottom: ${verticalScale(40)}px;
  width: ${moderateScale(2)}px;
  z-index: 0;
`;
/* Note: Adjusting left calculation to precisely hit the icon center. 
   Icons are scale(48) center is scale(24). Padding of list usually scale(24). 
   Actually icons are horizontal positioned at padding + half-width. 
*/

export const LocationItemArea = styled.View`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(12)}px;
  /* Premium Shadow */
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 2;
`;

export const MiddleStopArea = styled.View`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}40;
  /* Tinted ambient shadow */
  shadow-color: ${({ theme }) => theme.colors.secondary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
`;

export const AddStopButtonContainer = styled.TouchableOpacity`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => `${theme.colors.primary_fixed_dim}1A`}; /* 10% opacity */
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.primary}66;
  border-radius: ${moderateScale(12)}px;
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
