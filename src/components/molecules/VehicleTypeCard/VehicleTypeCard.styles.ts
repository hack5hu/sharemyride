import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity<{ selected: boolean }>`
  min-width: 47%;
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(8)}px;
  padding: ${moderateScale(6)}px;
  border-radius: ${moderateScale(16)}px;

  background-color: ${({ theme, selected }) => 
    selected ? theme.colors.secondary_fixed : theme.colors.surface_container_lowest};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${({ selected }) => (selected ? 0.1 : 0.02)};
  shadow-radius: 4px;
  elevation: ${({ selected }) => (selected ? 4 : 1)};
`;

export const IconWrapper = styled.View`
  margin-bottom: ${moderateScale(4)}px;
`;

