import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const CardContainer = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  padding: ${moderateScale(20)}px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary_container : theme.colors.surface_container_low};
  border-radius: ${moderateScale(24)}px;
  justify-content: space-between;
  border-width: 2px;
  border-color: ${({ theme, active }) => 
    active ? theme.colors.primary + '33' : 'transparent'};
`;

export const IconWrapper = styled.View<{ active?: boolean }>`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary_fixed : theme.colors.surface_container_lowest};
  align-items: center;
  justify-content: center;
`;

export const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(8)}px;
  margin-top: ${moderateScale(8)}px;
`;

export const Indicator = styled.View<{ active?: boolean }>`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.outline_variant};
`;
