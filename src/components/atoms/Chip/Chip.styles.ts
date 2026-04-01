import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity<{ selected?: boolean }>`
  padding-horizontal: ${moderateScale(20)}px;
  padding-vertical: ${moderateScale(10)}px;
  border-radius: ${moderateScale(99)}px;
  background-color: ${({ theme, selected }) => 
    selected ? theme.colors.primary_container : theme.colors.surface_container};
  margin-right: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
  border-width: 1px;
  border-color: ${({ theme, selected }) => 
    selected ? theme.colors.primary : 'transparent'};
`;
