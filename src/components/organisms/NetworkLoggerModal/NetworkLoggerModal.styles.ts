import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${verticalScale(160)}px;
  right: ${scale(24)}px;
  width: ${moderateScale(56)}px;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(28)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 6;
  z-index: 9999;
`;

export const ModalWrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  margin-top: ${verticalScale(40)}px;
  border-top-left-radius: ${moderateScale(24)}px;
  border-top-right-radius: ${moderateScale(24)}px;
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 10;
`;

export const ModalHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_variant};
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
`;

export const CloseButton = styled.TouchableOpacity`
  margin-left: ${scale(16)}px;
  padding: ${moderateScale(4)}px;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

export const Container = styled(Box)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export {
  LogItemStyle as LogItem,
  LogHeaderStyle as LogHeader,
  MethodBadgeStyle as MethodBadge,
  MethodTextStyle as MethodText,
  StatusBadgeStyle as StatusBadge,
  StatusTextStyle as StatusText,
  UrlTextStyle as UrlText,
  MetaRowStyle as MetaRow,
  EmptyStateStyle as EmptyState,
  LogCodeBlockStyle as CodeBlock,
  LogCodeTextStyle as CodeText,
} from '@/styles/NetworkLogStyles';
import { UrlTextStyle } from '@/styles/NetworkLogStyles';

export const StyledUrlText = styled(UrlTextStyle)`
  flex: 1;
  margin-bottom: 0px;
`;

export const EmptyDescText = styled(Typography)`
  text-align: center;
  margin-top: 8px;
`;

export const CopyIcon = styled(Icon)`
  margin-right: 4px;
`;

export const DetailModalContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const DetailModalHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_variant};
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
  padding: ${moderateScale(16)}px;
`;

export const SectionTitle = styled(Typography)<{ $noMargin?: boolean }>`
  margin-top: ${({ $noMargin }) => ($noMargin ? 0 : verticalScale(16))}px;
  margin-bottom: ${({ $noMargin }) => ($noMargin ? 0 : verticalScale(8))}px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;


export const CopyButton = styled.TouchableOpacity<{ $hasMarginLeft?: boolean }>`
  padding: ${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(4)}px;
  margin-left: ${({ $hasMarginLeft }) => ($hasMarginLeft ? 8 : 0)}px;
`;

export const HeaderRow = styled(Box)`
  flex-direction: row;
  align-items: center;
`;

export const CopyRow = styled(Box)<{ $noMarginTop?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ $noMarginTop }) => ($noMarginTop ? 0 : 16)}px;
  margin-bottom: 8px;
`;

export const CopyInnerRow = styled(Box)`
  flex-direction: row;
  align-items: center;
`;

export const TabRow = styled(Box)`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding-vertical: 12px;
  border-bottom-width: 2px;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.primary : 'transparent'};
  align-items: center;
`;

export const UrlRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CloseDetailButton = styled.TouchableOpacity`
  padding: 8px;
`;
