import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  CardContainer,
  IconContainer,
  ContentContainer,
  HeaderRow,
  RouteTitle,
  BadgeContainer,
  BadgeText,
  MetricsRow,
  MetricItem,
  MetricText,
  DescriptionText,
} from './RouteCard.styles';

export interface RouteOption {
  id: string;
  title: string;
  duration: string;
  distance: string;
  description: string;
  iconName: string;
  isRecommended?: boolean;
}

export interface RouteCardProps {
  route: RouteOption;
  isActive: boolean;
  onPress: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, isActive, onPress }) => {
  const theme = useTheme();
  const { routeSelection } = useLocale();

  return (
    <CardContainer $isActive={isActive} onPress={onPress} activeOpacity={0.8}>
      <IconContainer $isActive={isActive}>
        <MaterialIcons 
          name={route.iconName} 
          size={moderateScale(24)} 
          color={isActive ? theme.colors.on_primary_fixed_variant : theme.colors.on_surface_variant} 
        />
      </IconContainer>
      <ContentContainer>
        <HeaderRow>
          <RouteTitle>{route.title}</RouteTitle>
          {route.isRecommended && (
            <BadgeContainer>
              <BadgeText>{routeSelection.recommended}</BadgeText>
            </BadgeContainer>
          )}
        </HeaderRow>
        <MetricsRow>
          <MetricItem>
            <MaterialIcons name="schedule" size={moderateScale(16)} color={theme.colors.on_surface_variant} />
            <MetricText>{route.duration}</MetricText>
          </MetricItem>
          <MetricItem>
            <MaterialIcons name="straighten" size={moderateScale(16)} color={theme.colors.on_surface_variant} />
            <MetricText>{route.distance}</MetricText>
          </MetricItem>
        </MetricsRow>
        <DescriptionText>{route.description}</DescriptionText>
      </ContentContainer>
    </CardContainer>
  );
};
