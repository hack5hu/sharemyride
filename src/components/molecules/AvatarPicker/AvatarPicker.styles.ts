import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';

export const Container = styled(Box)`
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const TouchableAvatar = styled.TouchableOpacity`
  align-items: center;
`;

export const AvatarWrapper = styled(Box)<{ disabled?: boolean }>`
  position: relative;
  width: ${moderateScale(80)}px;
  height: ${moderateScale(80)}px;
  margin-bottom: ${moderateScale(8)}px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const EditButtonContainer = styled(Box)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
`;

export const DOBLabel = styled(Box)`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-vertical: ${moderateScale(2)}px;
  padding-horizontal: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const AddPhotoText = styled(Typography)`
  margin-top: ${moderateScale(8)}px;
`;
