import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const FloatingActionButton = styled.TouchableOpacity`
  width: ${moderateScale(56)}px;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 8;
`;
