import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const StyledTag = styled.TouchableOpacity<{ active: boolean }>`
  padding-horizontal: ${moderateScale(16)}px;
  padding-vertical: ${moderateScale(8)}px;
  border-radius: ${moderateScale(20)}px;
  margin-right: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.outline_variant};
`;
