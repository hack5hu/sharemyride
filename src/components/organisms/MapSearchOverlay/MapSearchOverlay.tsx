import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import {
  OverlayContainer,
  SearchInputContainer,
  SearchInput,
  LocationButton,
  SearchResultsBox,
  ResultItem,
  ResultIconBox,
  ResultTextContainer,
  ResultTitle,
  ResultSubtitle,
} from './MapSearchOverlay.styles';
import { moderateScale } from '@/styles';
import { Location } from '@/store/useLocationStore';

export interface MapSearchOverlayProps {
  onBackPress: () => void;
  onSelectLocation: (location: Location) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  results: Location[];
  history: Location[];
  isCondensed?: boolean;
}

export const MapSearchOverlay: React.FC<MapSearchOverlayProps> = ({
  onBackPress,
  onSelectLocation,
  searchQuery,
  onSearchChange,
  results,
  history,
  isCondensed: externalCondensed = false,
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = React.useRef<any>(null);

  // The list is hidden (condensed) when the parent says so (map is showing)
  // AND the input is not focused. Focusing the input always expands the list.
  const isCondensed = externalCondensed && !isFocused;

  const displayList = searchQuery.trim().length > 0 ? results : history;
  const isHistory = searchQuery.trim().length === 0;

  const handleSelect = (loc: Location) => {
    inputRef.current?.blur();
    onSelectLocation(loc);
  };

  return (
    <OverlayContainer>
      <SearchInputContainer $isFocused={isFocused}>
        <Ionicons name="search" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
        <SearchInput
          ref={inputRef}
          autoFocus={!externalCondensed}
          placeholder={mapPicker.searchPlaceholder}
          value={searchQuery}
          onChangeText={onSearchChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        <LocationButton>
          <Ionicons
            name="locate-sharp"
            size={moderateScale(24)}
            color={theme.colors.on_surface_variant}
          />
        </LocationButton>
      </SearchInputContainer>

      {!isCondensed && displayList.length > 0 && (
        <SearchResultsBox>
          {isHistory && (
            <ResultTitle style={{
              paddingHorizontal: moderateScale(16),
              paddingVertical: moderateScale(8),
              fontSize: moderateScale(12),
              color: theme.colors.on_surface_variant
            }}>
              {mapPicker.recentSearches || 'Recent Searches'}
            </ResultTitle>
          )}
          {displayList.map((loc) => (
            <ResultItem key={loc.id} onPress={() => handleSelect(loc)}>
              <ResultIconBox>
                <Ionicons
                  name={isHistory ? "time-sharp" : "location-sharp"}
                  size={moderateScale(20)}
                  color={theme.colors.primary}
                />
              </ResultIconBox>
              <ResultTextContainer>
                <ResultTitle>{loc.name}</ResultTitle>
                <ResultSubtitle numberOfLines={1}>{loc.address}</ResultSubtitle>
              </ResultTextContainer>
            </ResultItem>
          ))}
        </SearchResultsBox>
      )}
    </OverlayContainer>
  );
};

