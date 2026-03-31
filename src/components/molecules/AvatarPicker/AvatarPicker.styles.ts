import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const Container = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const AvatarWrapper = styled.View`
  position: relative;
  width: ${moderateScale(80)}px;
  height: ${moderateScale(80)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

export const EditButtonContainer = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
`;

export const DOBLabel = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-vertical: ${moderateScale(2)}px;
  padding-horizontal: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
`;

