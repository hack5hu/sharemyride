import React from 'react';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { RouteOption, RouteCard } from '@/components/organisms/RouteCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './RouteSelectionTemplate.styles';

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
    <ScreenShell
      title={routeSelection.headerTitle}
      onBack={onBackPress}
      rightElement={
        <S.StepIndicator>
          <S.StepText>{routeSelection.stepIndicator}</S.StepText>
        </S.StepIndicator>
      }
    >
      <S.ContentLayer showsVerticalScrollIndicator={false}>
        <S.MapSection>
          <S.MapImageWrapper>
            <Image 
              source={{ uri: MAP_MOCKUP_URL }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </S.MapImageWrapper>
          <S.SourcePin>
            <S.SourceInner />
          </S.SourcePin>
          <S.DestinationPin>
            <MaterialIcons name="location-on" size={moderateScale(16)} color={theme.colors.on_tertiary} />
          </S.DestinationPin>
        </S.MapSection>

        <S.RouteWrapper>
          <S.ContentHeader>
            <S.ContentTitle>{routeSelection.title}</S.ContentTitle>
            <S.ContentSubtitle>{routeSelection.subtitle}</S.ContentSubtitle>
          </S.ContentHeader>

          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isActive={route.id === selectedRouteId}
              onPress={() => onSelectRoute(route.id)}
            />
          ))}

          <S.TrustBadge>
            <MaterialIcons name="verified-user" size={moderateScale(24)} color={theme.colors.primary} />
            <S.TrustBadgeText>{routeSelection.trustBadge}</S.TrustBadgeText>
          </S.TrustBadge>
        </S.RouteWrapper>
      </S.ContentLayer>

      <S.FooterGradient 
        colors={['transparent', `${theme.colors.surface}F2`, theme.colors.surface]}
        pointerEvents="box-none"
      >
        <S.ContinueButton onPress={onContinuePress} activeOpacity={0.8} disabled={!selectedRouteId}>
          <S.ContinueGradient 
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ opacity: selectedRouteId ? 1 : 0.6 }}
          >
            <S.ContinueButtonText>{routeSelection.continue}</S.ContinueButtonText>
            <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
          </S.ContinueGradient>
        </S.ContinueButton>
      </S.FooterGradient>
    </ScreenShell>
  );
};
