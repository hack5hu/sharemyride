import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { FABsContainer, FABControl, Separator } from './MapControlsFABs.styles';
import { moderateScale } from '@/styles';

export const MapControlsFABs: React.FC = () => {
  const theme = useTheme();
  
  return (
    <FABsContainer>
      <FABControl>
        <MaterialIcons name="add" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
      <FABControl>
        <MaterialIcons name="remove" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
      <Separator />
      <FABControl>
        <MaterialIcons name="layers" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
    </FABsContainer>
  );
};
