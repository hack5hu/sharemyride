import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const FABsContainer = styled.View`
  position: absolute;
  right: ${scale(24)}px;
  top: 50%;
  transform: translateY(-${verticalScale(100)}px); 
  /* manually center vertically around midpoint relative to parent */
  z-index: 20;
  gap: ${verticalScale(12)}px;
`;

export const FABControl = styled.TouchableOpacity`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 5;
`;

export const Separator = styled.View`
  height: ${verticalScale(4)}px;
`;
