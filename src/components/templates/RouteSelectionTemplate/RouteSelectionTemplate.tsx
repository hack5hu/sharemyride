import React from 'react';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { RouteOption, RouteCard } from '@/components/organisms/RouteCard';
import {
  Container,
  TopHeader,
  HeaderLeft,
  BackButton,
  HeaderTitle,
  StepIndicator,
  StepText,
  MapSection,
  MapImageWrapper,
  SourcePin,
  SourceInner,
  DestinationPin,
  ContentLayer,
  ContentHeader,
  ContentTitle,
  ContentSubtitle,
  RouteWrapper,
  TrustBadge,
  TrustBadgeText,
  FooterGradient,
  ContinueButton,
  ContinueGradient,
  ContinueButtonText,
} from './RouteSelectionTemplate.styles';

// Using the provided mockup image URL for the static map underlay
const MAP_MOCKUP_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq-FUor3a_dslFtcQn46NLzOc0UjPS6RlASIDd-88yB4sGd3aJHmxYB7r1XcKhB6opQfzo6c8yBHZi_eKMtyKNWHOUHUcVD1wh-22eCbgFK04RhdRIFDUxxXTjyGL3C8q9J9C5MTr4vTaNLudwDahrH6yS4FkvJzXbwL9VYeOVrwPB0yz1ciM41_gw3jkesjapKwxa1_H3pk_s3zISLDi_dNmbIO14Qfd1m2yHK0tKQW18GErBXqTJEqvgLajfwcRrbXw4-SAvSL8U';

export interface RouteSelectionTemplateProps {
  onBackPress: () => void;
  onContinuePress: () => void;
  routes: RouteOption[];
  selectedRouteId: string | null;
  onSelectRoute: (id: string) => void;
}

export const RouteSelectionTemplate: React.FC<RouteSelectionTemplateProps> = ({
  onBackPress,
  onContinuePress,
  routes,
  selectedRouteId,
  onSelectRoute,
}) => {
  const theme = useTheme();
  const { routeSelection } = useLocale();

  return (
    <Container edges={['top']}>
      {/* Fixed Top Nav */}
      <TopHeader>
        <HeaderLeft>
          <BackButton onPress={onBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
          </BackButton>
          <HeaderTitle>{routeSelection.headerTitle}</HeaderTitle>
        </HeaderLeft>
        <StepIndicator>
          <StepText>{routeSelection.stepIndicator}</StepText>
        </StepIndicator>
      </TopHeader>

      <ContentLayer showsVerticalScrollIndicator={false}>
        {/* Padded empty space at top to let map show. We put map in absolute view underneath. 
            Wait, React Native ScrollView doesn't easily show content underneath if Map is part of flow. 
            Standard practice: Map view is header of ScrollView. */}
        <MapSection>
          <MapImageWrapper>
            <Image 
              source={{ uri: MAP_MOCKUP_URL }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </MapImageWrapper>
          <SourcePin>
            <SourceInner />
          </SourcePin>
          {/* Note: SVG Paths for the visual map abstraction would require 'react-native-svg'. 
              We'll rely on the pins for now to maintain pure React Native out-of-box compatibility 
              without forcing new native dependencies. */}
          <DestinationPin>
            <MaterialIcons name="location-on" size={moderateScale(16)} color={theme.colors.on_tertiary} />
          </DestinationPin>
        </MapSection>

        <RouteWrapper>
          <ContentHeader>
            <ContentTitle>{routeSelection.title}</ContentTitle>
            <ContentSubtitle>{routeSelection.subtitle}</ContentSubtitle>
          </ContentHeader>

          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isActive={route.id === selectedRouteId}
              onPress={() => onSelectRoute(route.id)}
            />
          ))}

          <TrustBadge>
            <MaterialIcons name="verified-user" size={moderateScale(24)} color={theme.colors.primary} />
            <TrustBadgeText>{routeSelection.trustBadge}</TrustBadgeText>
          </TrustBadge>
        </RouteWrapper>
      </ContentLayer>

      {/* Floating Footer Toolbar */}
      <FooterGradient 
        colors={['transparent', `${theme.colors.surface}F2`, theme.colors.surface]}
        pointerEvents="box-none"
      >
        <ContinueButton onPress={onContinuePress} activeOpacity={0.8} disabled={!selectedRouteId}>
          <ContinueGradient 
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ opacity: selectedRouteId ? 1 : 0.6 }}
          >
            <ContinueButtonText>{routeSelection.continue}</ContinueButtonText>
            <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
          </ContinueGradient>
        </ContinueButton>
      </FooterGradient>
    </Container>
  );
};
