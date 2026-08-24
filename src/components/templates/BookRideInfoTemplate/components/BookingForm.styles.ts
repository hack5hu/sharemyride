import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const BookingCard = styled.View`
  margin-horizontal: ${scale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(16)}px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.primary};
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
  overflow: hidden;
`;

export const FormBody = styled.View`
  padding: ${moderateScale(14)}px ${moderateScale(16)}px;
`;

export const FormRow = styled.TouchableOpacity<{ $isActionable?: boolean }>`
  padding-vertical: ${verticalScale(8)}px;
`;

export const RowHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11.5)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(3)}px;
`;

export const RowMain = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: ${verticalScale(24)}px;
`;

export const RowText = styled.Text<{ $hasValue?: boolean }>`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: ${({ $hasValue }) => ($hasValue ? '700' : '500')};
  color: ${({ theme, $hasValue }) =>
    $hasValue ? theme.colors.on_surface : theme.colors.outline};
  line-height: ${verticalScale(19)}px;
`;

export const SwapButton = styled.TouchableOpacity`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  align-items: center;
  justify-content: center;
  margin-left: ${scale(8)}px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => `${theme.colors.outline_variant}50`};
  margin-vertical: ${verticalScale(4)}px;
`;

export const StepperRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const StepperBtn = styled.TouchableOpacity<{ $disabled?: boolean }>`
  width: ${moderateScale(26)}px;
  height: ${moderateScale(26)}px;
  border-radius: ${moderateScale(13)}px;
  background-color: ${({ theme, $disabled }) =>
    $disabled
      ? `${theme.colors.outline_variant}30`
      : `${theme.colors.primary}15`};
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
`;

export const SearchButton = styled.TouchableOpacity`
  width: 100%;
`;

export const SearchGradient = styled(LinearGradient)`
  width: 100%;
  height: ${verticalScale(48)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const SearchText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
