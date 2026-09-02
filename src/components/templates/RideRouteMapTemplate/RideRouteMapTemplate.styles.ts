import styled from 'styled-components/native';
import { OlaMap } from '@/components/organisms/OlaMap';
import { moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
`;

export const MapWrapper = styled.View`
  flex: 1;
`;

export const StyledOlaMap = styled(OlaMap)`
  flex: 1;
`;

export const ControlsWrapper = styled.View`
  position: absolute;
  right: ${moderateScale(16)}px;
  top: 40%;
`;

export const Footer = styled.View<{ $paddingBottom?: number }>`
  position: absolute;
  bottom: ${moderateScale(56)}px;
  left: ${moderateScale(16)}px;
  right: ${moderateScale(16)}px;
  ${({ $paddingBottom }) =>
    $paddingBottom !== undefined && `padding-bottom: ${$paddingBottom}px;`}
`;
