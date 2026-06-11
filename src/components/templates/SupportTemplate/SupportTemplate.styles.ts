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

export const CardBody = styled(Typography).attrs({
  variant: 'body',
  size: 'md',
  color: 'on_surface_variant',
})`
  line-height: ${verticalScale(24)}px;
`;

export const ActionContainer = styled.View`
  margin-top: ${verticalScale(24)}px;
  align-items: center;
`;
