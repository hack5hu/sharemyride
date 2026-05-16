import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { FABsContainer, FABControl, Separator } from './MapControlsFABs.styles';
import { moderateScale } from '@/styles';

export interface MapControlsFABsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocateMe?: () => void;
}

export const MapControlsFABs: React.FC<MapControlsFABsProps> = ({ 
  onZoomIn, 
  onZoomOut,
  onLocateMe 
}) => {
  const theme = useTheme();
  
  return (
    <FABsContainer>
      <FABControl onPress={onLocateMe} activeOpacity={0.7}>
        <Ionicons name="locate-sharp" size={moderateScale(24)} color={theme.colors.primary} />
      </FABControl>
      <Separator />
      <FABControl onPress={onZoomIn} activeOpacity={0.7}>
        <Ionicons name="add-sharp" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
      <FABControl onPress={onZoomOut} activeOpacity={0.7}>
        <Ionicons name="remove-sharp" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
    </FABsContainer>
  );
};
