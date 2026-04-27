import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const FloatingFooter = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
`;

export const FooterGradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -${verticalScale(48)}px;
`;

export const PublishButton = styled.TouchableOpacity`
  width: 100%;
`;

export const PublishGradient = styled(LinearGradient)`
  width: 100%;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 24px;
  elevation: 8;
`;

export const PublishText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const TermsText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
  margin-top: ${verticalScale(16)}px;
`;

export const TermsLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration-line: underline;
  text-decoration-color: ${({ theme }) => theme.colors.primary_container};
`;
