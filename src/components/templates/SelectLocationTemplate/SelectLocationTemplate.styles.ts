import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const MapWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

export const HeaderWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; // Above everything
`;

export const SearchWrapper = styled.View`
  position: absolute;
  top: ${verticalScale(130)}px; // Below the safe-area header
  left: ${scale(16)}px;
  right: ${scale(16)}px;
  z-index: 40;
`;

export const CenterPinWrapper = styled.View`
  position: absolute;
  top: 40%; // Center in the visible map area
  left: 50%;
  transform: translate(-24px, -24px); 
  z-index: 10;
  pointer-events: none;
`;

export const ActionFABWrapper = styled.View`
  position: absolute;
  bottom: ${verticalScale(410)}px; // Anchored above the average bottom-sheet position
  left: 0;
  right: 0;
  align-items: center;
  z-index: 50; // Above sheet, though higher is lighter
`;

export const SheetWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30; // Sheet sits below the FAB but above the map
`;
