import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ActionModalContainer = styled.View`
  width: 92%;
  max-width: ${scale(400)}px;
  max-height: 82%;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 12px;
  shadow-opacity: 0.2;
  shadow-radius: 28px;
  elevation: 12;
`;

export const ActionModalHeader = styled.View<{ bgColorTint?: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(18)}px;
  padding-top: ${verticalScale(14)}px;
  padding-bottom: ${verticalScale(8)}px;
`;

export const ActionModalHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const ActionModalBadge = styled.View<{ bgColorTint?: string }>`
  background-color: ${({ theme, bgColorTint }) =>
    bgColorTint && (theme.colors as any)[bgColorTint]
      ? `${(theme.colors as any)[bgColorTint]}20`
      : `${theme.colors.primary}15`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(10)}px;
`;

export const ActionModalContent = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: moderateScale(18),
    paddingTop: verticalScale(4),
    paddingBottom: verticalScale(20),
    gap: verticalScale(14),
  },
})`
  flex-shrink: 1;
`;

export const ActionModalSection = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const ActionModalCategoryGrid = styled.View`
  flex-direction: column;
  gap: ${moderateScale(7)}px;
`;

export const ActionModalDescriptionInput = styled.TextInput.attrs(
  ({ theme }) => ({
    placeholderTextColor: theme.colors.on_surface_variant + '80',
  }),
)`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(12)}px;
  min-height: ${verticalScale(80)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13.5)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}30;
`;

export const ActionModalFooter = styled.View`
  flex-direction: column;
  padding-horizontal: ${moderateScale(18)}px;
  padding-bottom: ${verticalScale(16)}px;
  padding-top: ${verticalScale(4)}px;
  gap: ${verticalScale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
`;

export const ActionModalSubmitButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 100%;
  height: ${verticalScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.surface_container_high : theme.colors.primary};
`;

export const ActionModalGradientBtn = styled(LinearGradient)<{
  disabledOpacity?: number;
}>`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabledOpacity ?? 1};
`;

export const ActionModalCancelButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  min-height: ${verticalScale(42)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
`;

export const ActionModalLoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
