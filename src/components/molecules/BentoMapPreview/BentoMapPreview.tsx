import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  Container,
  MapImage,
  GradientOverlay,
  BadgeContainer,
  BadgeText,
} from './BentoMapPreview.styles';

const MAP_PREVIEW_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0TJfdxrA-VckWlb_y-_RD2CabwwwiThFkLxD8EvfxSVGEajh8A1YZ5DOURPzD8xgHR8Vcf7cK062a_in4nRS8korNIegYooi574ryEW19wBlDv0o8y6YAXp9Ddi5MtRetyiCnwaolVTA2KTypfkn145avsaf18XzsomtqsjJKxJCQ23ZjGmz9EO4zbRw1typ6Iml8rjLFnmP-RI0gY00eGDNgeQvFQvNz1e4VvkDjJMe9uvJPcJGJ1Vm_dZn7nEQ0D525cIdWcHPx';

export const BentoMapPreview: React.FC = () => {
  const theme = useTheme();
  const { middleStops } = useLocale();

  return (
    <Container>
      <MapImage source={{ uri: MAP_PREVIEW_URL }} resizeMode="cover" />
      <GradientOverlay 
        colors={[theme.colors.surface_container, 'transparent', 'transparent']} 
        start={{ x: 0, y: 1 }} 
        end={{ x: 0, y: 0 }} 
      />
      <BadgeContainer>
        <MaterialIcons name="verified" size={moderateScale(16)} color={theme.colors.primary} />
        <BadgeText>{middleStops.optimizedRoute}</BadgeText>
      </BadgeContainer>
    </Container>
  );
};
