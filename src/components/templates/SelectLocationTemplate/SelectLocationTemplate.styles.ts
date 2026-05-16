import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from '@/styles';

// Full-screen container that sits behind everything
export const FullScreenContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

// Map fills the entire screen
export const MapWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

// Glassmorphic header bar — floats over the map
export const FloatingHeader = styled.View<{ topInset: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.92);
  padding-top: ${({ topInset }) => Math.max(topInset, verticalScale(20))}px;
  padding-bottom: ${verticalScale(16)}px;
  padding-horizontal: ${scale(16)}px;
`;

// Back button row inside header
export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${moderateScale(36)}px;
  height: ${moderateScale(36)}px;
  border-radius: ${moderateScale(18)}px;
  background-color: ${({ theme }) => theme.colors.surface_container}; 
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(16)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.3px;
`;


// Center pin anchored at the true visual center of the map area (below header, above sheet)
export const CenterPinWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-${moderateScale(18)}px) translateY(-${moderateScale(56)}px);
  z-index: 10;
`;

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
`;

// FAB anchored just above the bottom sheet
export const ActionFABWrapper = styled.View`
  padding-horizontal: ${scale(16)}px;
  padding-bottom: ${verticalScale(16)}px;
  align-items: center;
`;


export const ZoomControlsWrapper = styled.View`
  position: absolute;
  right: ${scale(16)}px;
  top: 50%;
  transform: translateY(${verticalScale(-60)}px);
  z-index: 60;
`;

export const LocationPreviewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${moderateScale(12)}px ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.on_surface};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const LocationPreviewTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(15)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(2)}px;
`;

export const LocationPreviewText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const SelectButtonContainer = styled.View`
  margin: ${verticalScale(24)}px;
`;

export const SelectGradient = styled.View`
  width: 100%;
  padding-vertical: ${verticalScale(18)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 12px;
  shadow-opacity: 0.25;
  shadow-radius: 24px;
  elevation: 8;
`;

export const SelectButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
`;

export const SelectButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${moderateScale(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
