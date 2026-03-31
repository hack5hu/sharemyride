import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const SectionHeader = styled.View`
  margin-bottom: ${moderateScale(16)}px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${moderateScale(12)}px;
`;

export const TagWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
