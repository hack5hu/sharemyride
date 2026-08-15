import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export const ActionModalContainer = styled.View`
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

export const ActionModalHeader = styled.View<{ bgColorTint: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(16)}px;
  background-color: ${({ theme, bgColorTint }) =>
    (theme.colors as any)[bgColorTint] + '33'};
`;

export const ActionModalHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const ActionModalBadge = styled.View<{ bgColorTint: string }>`
  background-color: ${({ theme, bgColorTint }) =>
    (theme.colors as any)[bgColorTint] + '80'};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const ActionModalContent = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    padding: moderateScale(24),
    gap: verticalScale(24),
  },
})`
  max-height: ${verticalScale(500)}px;
  flex-shrink: 1;
`;

export const ActionModalSection = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const ActionModalCategoryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
`;

export const ActionModalDescriptionInput = styled.TextInput.attrs(
  ({ theme }) => ({
    placeholderTextColor: theme.colors.on_surface_variant + '80',
  }),
)`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(16)}px;
  min-height: ${verticalScale(100)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const ActionModalFooter = styled.View`
  flex-direction: column;
  padding: ${moderateScale(24)}px;
  padding-top: ${verticalScale(8)}px;
  gap: ${verticalScale(12)}px;
`;

export const ActionModalSubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: ${verticalScale(56)}px;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
`;

export const ActionModalGradientBtn = styled(LinearGradient)<{ disabledOpacity?: number }>`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabledOpacity ?? 1};
`;

export const ActionModalCancelButton = styled.TouchableOpacity`
  padding-vertical: ${verticalScale(14)}px;
  align-items: center;
  justify-content: center;
  min-height: ${verticalScale(52)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_variant};
`;

export const ActionModalLoadingOverlay = styled.View`
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
