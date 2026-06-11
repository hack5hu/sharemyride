import styled from 'styled-components/native';
import { scale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${scale(8)}px;
  align-self: center;
`;
