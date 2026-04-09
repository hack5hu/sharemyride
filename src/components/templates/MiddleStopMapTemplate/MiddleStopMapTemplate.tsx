import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { LocationOption, MiddleStopSearchOverlay } from '@/components/organisms/MiddleStopSearchOverlay';
import { MapContextOverlay } from '@/components/organisms/MapContextOverlay';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './MiddleStopMapTemplate.styles';

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
    <ScreenShell
      title={t.headerTitle}
      onBack={onBackPress}
      rightElement={<S.HeaderStepText>{t.stepIndicator}</S.HeaderStepText>}
    >
      <S.ContentArea>
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
      </S.ContentArea>

      {/* Floating Footer specifically for Search State */}
      {isSearching && (
        <S.SearchFloatingFooter>
          <S.FooterLeftText>
            <S.FooterLabel>{t.addedStops}</S.FooterLabel>
            <S.FooterValue>02 Stops</S.FooterValue>
          </S.FooterLeftText>
          <S.SearchContinueButton onPress={onBackPress} activeOpacity={0.9}>
            <S.SearchContinueText>{t.continue}</S.SearchContinueText>
          </S.SearchContinueButton>
        </S.SearchFloatingFooter>
      )}
    </ScreenShell>
  );
};
