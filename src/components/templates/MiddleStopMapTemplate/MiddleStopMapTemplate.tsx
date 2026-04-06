import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { LocationOption, MiddleStopSearchOverlay } from '@/components/organisms/MiddleStopSearchOverlay';
import { MapContextOverlay } from '@/components/organisms/MapContextOverlay';

import {
  Container,
  TopHeader,
  HeaderLeft,
  BackButton,
  HeaderTitle,
  HeaderStepText,
  ContentArea,
  SearchFloatingFooter,
  FooterLeftText,
  FooterLabel,
  FooterValue,
  SearchContinueButton,
  SearchContinueText,
} from './MiddleStopMapTemplate.styles';

export interface MiddleStopMapTemplateProps {
  isSearching: boolean;
  onBackPress: () => void;
  onSearchPress: () => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  suggestedLocations: LocationOption[];
  recentHistory: LocationOption[];
  onSelectLocation: (loc: LocationOption) => void;
  selectedLocation?: LocationOption;
  onContinue: () => void;
  routeTitle: string;
}

export const MiddleStopMapTemplate: React.FC<MiddleStopMapTemplateProps> = ({
  isSearching,
  onBackPress,
  onSearchPress,
  searchQuery,
  onChangeSearch,
  suggestedLocations,
  recentHistory,
  onSelectLocation,
  selectedLocation,
  onContinue,
  routeTitle,
}) => {
  const theme = useTheme();
  const { middleStopMap: t } = useLocale();

  return (
    <Container edges={['top', 'bottom']}>
      {/* Content Layer */}
      <ContentArea>
        {isSearching ? (
          <MiddleStopSearchOverlay
            searchQuery={searchQuery}
            onChangeSearch={onChangeSearch}
            suggestedLocations={suggestedLocations}
            recentHistory={recentHistory}
            onSelectLocation={onSelectLocation}
          />
        ) : (
          <MapContextOverlay
            onSearchPress={onSearchPress}
            onContinue={onContinue}
            selectedLocationName={selectedLocation?.name}
            routeTitle={routeTitle}
          />
        )}
      </ContentArea>

      {/* Glass Header (Above everything) */}
      <TopHeader>
        <HeaderLeft>
          <BackButton onPress={onBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
          </BackButton>
          <HeaderTitle>{t.headerTitle}</HeaderTitle>
        </HeaderLeft>
        <HeaderStepText>{t.stepIndicator}</HeaderStepText>
      </TopHeader>

      {/* Floating Footer specifically for Search State (when active or empty selection but staying in search) */}
      {isSearching && (
        <SearchFloatingFooter>
          <FooterLeftText>
            <FooterLabel>{t.addedStops}</FooterLabel>
            <FooterValue>02 Stops</FooterValue>
          </FooterLeftText>
          <SearchContinueButton onPress={onBackPress} activeOpacity={0.9}>
            <SearchContinueText>{t.continue}</SearchContinueText>
          </SearchContinueButton>
        </SearchFloatingFooter>
      )}

    </Container>
  );
};
