import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { Location } from '@/store/useLocationStore';
import { moderateScale } from '@/styles';
import { MAX_DEVIATION_KM } from '@/utils/routeSnap';
import {
  Container,
  TitleText,
  Subtext,
  SearchInputContainer,
  SearchInput,
  SectionHeader,
  GridContainer,
  GridCard,
  BadgeRow,
  CardBadge,
  CardBadgeText,
  CardTitle,
  CardSubtext,
  HistoryItem,
  HistoryLeft,
  HistoryText,
  DistanceBadge,
  DistanceBadgeText,
  SearchResultItem,
  SearchResultContent,
  SearchResultName,
  SearchResultAddress,
} from './MiddleStopSearchOverlay.styles';

export interface LocationOption {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  subtitle?: string;
  isPopular?: boolean;
  distanceFromRoute?: number;
}

export interface MiddleStopSearchOverlayProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  suggestedLocations: LocationOption[];
  recentHistory: LocationOption[] | Location[];
  onSelectLocation: (loc: LocationOption) => void;
  onSelectHistory?: (loc: Location) => void;
  isLoading?: boolean;
}

export const MiddleStopSearchOverlay: React.FC<MiddleStopSearchOverlayProps> =
  React.memo(
    ({
      searchQuery,
      onChangeSearch,
      suggestedLocations,
      recentHistory,
      onSelectLocation,
      onSelectHistory,
      isLoading,
    }) => {
      const theme = useTheme();
      const { middleStopMap: t } = useLocale();

      const renderDistanceBadge = useCallback((distance?: number) => {
        if (distance === undefined) return null;
        const isWarning = distance > MAX_DEVIATION_KM;
        return (
          <DistanceBadge isWarning={isWarning}>
            <DistanceBadgeText isWarning={isWarning}>
              {`${distance} km`}
            </DistanceBadgeText>
          </DistanceBadge>
        );
      }, []);

      const handleHistoryPress = useCallback(
        (item: LocationOption | Location) => {
          Keyboard.dismiss();
          if (onSelectHistory && 'latitude' in item && 'longitude' in item) {
            onSelectHistory(item as Location);
          } else {
            onSelectLocation(item as LocationOption);
          }
        },
        [onSelectHistory, onSelectLocation],
      );

      const handleLocationSelect = useCallback(
        (item: LocationOption) => {
          Keyboard.dismiss();
          onSelectLocation(item);
        },
        [onSelectLocation],
      );

      return (
        <Container>
          <TitleText>{t.whereWillYouStop}</TitleText>
          <Subtext>{t.addingStopsIncreasesInfo}</Subtext>

          <SearchInputContainer>
            <MaterialIcons
              name="search"
              size={moderateScale(24)}
              color={theme.colors.primary}
            />
            <SearchInput
              placeholder={t.searchPlaceholder}
              placeholderTextColor={`${theme.colors.outline_variant}99`}
              value={searchQuery}
              onChangeText={onChangeSearch}
              autoFocus
            />
            {!!searchQuery && (
              <MaterialIcons
                name="close"
                size={moderateScale(20)}
                color={theme.colors.on_surface_variant}
                onPress={() => onChangeSearch('')}
              />
            )}
          </SearchInputContainer>

          {/* Search results */}
          {!!searchQuery && suggestedLocations.length > 0 && (
            <>
              {suggestedLocations.map(item => (
                <SearchResultItem
                  key={item.id}
                  onPress={() => handleLocationSelect(item)}
                >
                  <MaterialIcons
                    name="location-on"
                    size={moderateScale(20)}
                    color={theme.colors.primary}
                  />
                  <SearchResultContent>
                    <SearchResultName numberOfLines={1}>
                      {item.name}
                    </SearchResultName>
                    {!!item.address && (
                      <SearchResultAddress numberOfLines={1}>
                        {item.address}
                      </SearchResultAddress>
                    )}
                  </SearchResultContent>
                  {renderDistanceBadge(item.distanceFromRoute)}
                </SearchResultItem>
              ))}
            </>
          )}

          {/* Default state: suggestions + history */}
          {!searchQuery && (
            <>
              {/* Recent History */}
              {recentHistory.length > 0 && (
                <>
                  <SectionHeader>{t.recentHistory}</SectionHeader>
                  {recentHistory.map(item => (
                    <HistoryItem
                      key={item.id}
                      onPress={() => handleHistoryPress(item)}
                    >
                      <HistoryLeft>
                        <MaterialIcons
                          name="history"
                          size={moderateScale(20)}
                          color={theme.colors.outline_variant}
                        />
                        <HistoryText numberOfLines={1}>
                          {'name' in item ? item.name : ''}
                        </HistoryText>
                      </HistoryLeft>
                      <MaterialIcons
                        name="chevron-right"
                        size={moderateScale(24)}
                        color={`${theme.colors.outline_variant}80`}
                      />
                    </HistoryItem>
                  ))}
                </>
              )}
            </>
          )}
        </Container>
      );
    },
  );

MiddleStopSearchOverlay.displayName = 'MiddleStopSearchOverlay';
