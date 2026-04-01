import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const HeaderCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  flex-direction: column;
  align-items: center;
  gap: ${moderateScale(24)}px;
`;

export const IdentitySection = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${moderateScale(12)}px;
`;

export const InfoSection = styled.View`
  align-items: center;
  gap: ${moderateScale(4)}px;
`;

export const StatsSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${moderateScale(24)}px;
`;

export const StatDivider = styled.View`
  width: 1px;
  height: ${moderateScale(32)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant}4D; // 30% opacity
`;

export const VerifiedRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(6)}px;
`;
