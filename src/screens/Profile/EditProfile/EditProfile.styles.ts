import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(100),
  },
})`
  flex: 1;
`;

export const Content = styled.View`
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(16)}px;
  gap: ${verticalScale(24)}px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${verticalScale(64)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant}1A;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const AvatarSection = styled.View`
  align-items: center;
  margin-vertical: ${verticalScale(16)}px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const EditButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${scale(18)}px;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.surface_container_lowest};
`;

export const FormHeader = styled.View`
  gap: ${verticalScale(4)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${scale(16)}px;
`;

export const Column = styled.View`
  flex: 1;
`;

export const ActionFooter = styled.View`
  flex-direction: row;
  gap: ${scale(16)}px;
  margin-top: ${verticalScale(16)}px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  height: ${verticalScale(56)}px;
  border-radius: ${({ theme }) => theme.roundness.xl}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}4D;
  justify-content: center;
  align-items: center;
`;

export const SaveButtonGradient = styled(LinearGradient)`
  flex: 1;
  height: ${verticalScale(56)}px;
  border-radius: ${({ theme }) => theme.roundness.xl}px;
  justify-content: center;
  align-items: center;
`;

export const SaveButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ToastContainer = styled.View`
  margin-bottom: ${verticalScale(16)}px;
`;

export const BackgroundFlourishTop = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: ${scale(200)}px;
  height: ${scale(200)}px;
  background-color: ${({ theme }) => theme.colors.primary}0D;
  border-radius: ${scale(100)}px;
`;

export const BackgroundFlourishBottom = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${scale(150)}px;
  height: ${scale(150)}px;
  background-color: ${({ theme }) => theme.colors.tertiary}0D;
  border-radius: ${scale(75)}px;
`;
