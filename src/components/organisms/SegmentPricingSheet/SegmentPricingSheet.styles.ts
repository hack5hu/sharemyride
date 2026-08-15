import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';

export const Wrapper = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  elevation: 999;
`;

export const Overlay = styled(Box)`
  flex: 1;
  background-color: rgba(23, 29, 25, 0.4);
  justify-content: flex-end;
`;

export const BackdropTouchable = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Sheet = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(40)}px;
  border-top-right-radius: ${moderateScale(40)}px;
  max-height: 88%;
  padding-bottom: ${verticalScale(8)}px;
`;

export const DragHandle = styled(Box)`
  width: ${scale(48)}px;
  height: ${moderateScale(5)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-radius: 9999px;
  align-self: center;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const SheetHeader = styled(Box)`
  padding-horizontal: ${scale(28)}px;
  padding-top: ${verticalScale(12)}px;
  padding-bottom: ${verticalScale(16)}px;
`;

export const SheetTitle = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

export const SheetSubtitle = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.outline};
  margin-top: ${verticalScale(2)}px;
`;

export const ListWrapper = styled(Box)`
  max-height: ${verticalScale(500)}px;
`;

export const CardList = styled.ScrollView`
  flex-grow: 1;
`;

export const ButtonRow = styled(Box)`
  flex-direction: row;
  gap: ${scale(10)}px;
  padding-horizontal: ${scale(28)}px;
  padding-vertical: ${verticalScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const CancelWrapper = styled(Box)`
  flex: 1;
`;

export const SaveWrapper = styled(Box)`
  flex: 2;
`;
