import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Overlay = styled.View`
  ${StyleSheet.absoluteFillObject}
  z-index: 9999;
  elevation: 9999;
  background-color: rgba(0, 0, 0, 0.4);
`;
