import styled from 'styled-components/native';
import { moderateScale, verticalScale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const ContentScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const MainContainer = styled.View`
  padding: ${moderateScale(24)}px;
`;

export const Card = styled.View`
  margin-bottom: ${verticalScale(32)}px;
  padding: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
`;

export const CardTitle = styled(Typography).attrs({
  variant: 'display',
  size: 'sm',
  weight: 'bold',
  color: 'primary',
})`
  margin-bottom: ${verticalScale(12)}px;
`;

export const CardBody = styled(Typography).attrs({
  variant: 'body',
  size: 'md',
  color: 'on_surface_variant',
})`
  line-height: ${verticalScale(24)}px;
`;

export const SectionTitle = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  weight: 'bold',
  color: 'primary',
})`
  letter-spacing: 1px;
  margin-bottom: ${verticalScale(16)}px;
  text-transform: uppercase;
`;

export const UpdateBox = styled.View`
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${verticalScale(100)}px;
`;

export const EmptySubtitle = styled(Typography).attrs({
  variant: 'body',
  align: 'center',
  color: 'on_surface_variant',
})`
  margin-top: ${verticalScale(16)}px;
`;
