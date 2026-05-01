import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from '@/styles';

export const ModalContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8;
`;

export const IconContainer = styled.View<{ color: string }>`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(32)}px;
  background-color: ${({ color }) => color}15;
  justify-content: center;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const TextContainer = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  gap: ${moderateScale(12)}px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  flex: 1;
  height: ${verticalScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
`;

export const GradientBtn = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SecondaryButton = styled.TouchableOpacity`
  flex: 1;
  height: ${verticalScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_variant}50;
`;
