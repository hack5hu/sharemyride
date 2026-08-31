import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import { Surface } from '../../atoms/Surface';
import { Typography } from '../../atoms/Typography';

export const SectionHeader = styled.View`
  margin-bottom: ${moderateScale(12)}px;
`;

export const ToggleRow = styled.View<{ $disabledOpacity?: number }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${moderateScale(8)}px;
  opacity: ${({ $disabledOpacity }) => $disabledOpacity ?? 1};
`;

export const TagWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Container = styled.View`
  gap: ${moderateScale(12)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${moderateScale(12)}px;
`;

export const NewsletterSurface = styled(Surface)`
  flex: 1;
  justify-content: space-between;
`;

export const NewsletterLabel = styled(Typography)`
  text-transform: uppercase;
  letter-spacing: 1.2px;
  opacity: 0.8;
`;
