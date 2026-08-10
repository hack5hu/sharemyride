import styled from 'styled-components/native';
import { verticalScale, moderateScale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled.View`
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
} from '@/styles/NetworkLogStyles';

// Detail Modal Styles
export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  margin-top: ${verticalScale(40)}px;
  border-top-left-radius: ${moderateScale(24)}px;
  border-top-right-radius: ${moderateScale(24)}px;
  overflow: hidden;
`;

export const ModalHeader = styled.View`
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

export const SectionTitle = styled(Typography as any)`
  margin-top: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(8)}px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export {
  LogCodeBlockStyle as CodeBlock,
  LogCodeTextStyle as CodeText,
} from '@/styles/NetworkLogStyles';

export const ClearButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
`;

export const EmptyDescText = styled(Typography)`
  text-align: center;
  margin-top: ${verticalScale(8)}px;
`;
