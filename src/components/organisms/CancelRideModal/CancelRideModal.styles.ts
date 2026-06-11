import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';
import { LinearGradient } from 'react-native-linear-gradient';

export const ModalContainer = styled.View`
  width: 90%;
  max-width: ${scale(400)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 12px;
  shadow-opacity: 0.15;
  shadow-radius: 24px;
  elevation: 10;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.error_container + '33'};
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const BookingBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.error_container + '80'};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: moderateScale(24),
    gap: verticalScale(24),
  },
})`
  max-height: ${verticalScale(500)}px;
`;

export const Section = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const CategoryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
`;

export const DescriptionInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.on_surface_variant + '80',
}))`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(16)}px;
  height: ${verticalScale(100)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Footer = styled.View`
  flex-direction: column;
  padding: ${moderateScale(24)}px;
  padding-top: ${verticalScale(8)}px;
  gap: ${verticalScale(12)}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
`;

export const GradientBtn = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.error, theme.colors.error_container],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  padding: ${verticalScale(16)}px 0;
  min-height: ${verticalScale(56)}px;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  padding: ${verticalScale(14)}px 0;
  min-height: ${verticalScale(52)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant + '4D'};
`;

export const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
