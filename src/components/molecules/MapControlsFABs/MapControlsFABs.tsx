import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { FABsContainer, FABControl, Separator } from './MapControlsFABs.styles';
import { moderateScale } from '@/styles';

export interface MapControlsFABsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export const MapControlsFABs: React.FC<MapControlsFABsProps> = ({ onZoomIn, onZoomOut }) => {
  const theme = useTheme();
  
  return (
    <FABsContainer>
      <FABControl onPress={onZoomIn} activeOpacity={0.7}>
        <Ionicons name="add-sharp" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
      <FABControl onPress={onZoomOut} activeOpacity={0.7}>
        <Ionicons name="remove-sharp" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
      <Separator />
      <FABControl activeOpacity={0.7}>
        <Ionicons name="layers-sharp" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
      </FABControl>
    </FABsContainer>
  );
};
