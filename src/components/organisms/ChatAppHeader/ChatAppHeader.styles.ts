import styled from 'styled-components/native';
import { verticalScale, moderateScale, scale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface + 'CC'};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant + '1A'};
`;

export const ProfileInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const TextContainer = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const RatingBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(2)}px;
`;

export const PulseDot = styled.View`
  width: ${moderateScale(4)}px;
  height: ${moderateScale(4)}px;
  border-radius: ${moderateScale(2)}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
