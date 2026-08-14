import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import { Surface } from '../../atoms/Surface';
import { Typography } from '../../atoms/Typography';

export const SectionHeader = styled.View`
  margin-bottom: ${moderateScale(16)}px;
`;

export const ToggleRow = styled.View<{ $disabledOpacity?: number }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${moderateScale(12)}px;
  opacity: ${({ $disabledOpacity }) => $disabledOpacity ?? 1};
`;

export const TagWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Container = styled.View`
  gap: ${moderateScale(16)}px;
  margin-top: ${moderateScale(16)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${moderateScale(16)}px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: add proper type
export const NewsletterSurface = styled(Surface as any)`
  flex: 1;
  justify-content: space-between;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: add proper type
export const NewsletterLabel = styled(Typography as any)`
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;
