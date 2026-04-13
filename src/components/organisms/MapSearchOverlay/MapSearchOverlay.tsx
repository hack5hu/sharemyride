import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
}

export const MapSearchOverlay: React.FC<MapSearchOverlayProps> = ({
  onBackPress,
  onSelectLocation,
  searchQuery,
  onSearchChange,
  results,
  history,
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();
  const [isFocused, setIsFocused] = useState(false);

  const displayList = searchQuery.trim().length > 0 ? results : history;
  const isHistory = searchQuery.trim().length === 0;

  return (
    <OverlayContainer>
      <SearchInputContainer $isFocused={isFocused}>
        <MaterialIcons name="search" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
        <SearchInput
          placeholder={mapPicker.searchPlaceholder}
          value={searchQuery}
          onChangeText={onSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <LocationButton>
          <MaterialIcons name="my-location" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
        </LocationButton>
      </SearchInputContainer>

      {displayList.length > 0 && (
        <SearchResultsBox>
          {isHistory && (
             <ResultTitle style={{ paddingHorizontal: moderateScale(16), paddingVertical: moderateScale(8), fontSize: moderateScale(12), color: theme.colors.on_surface_variant }}>
               {mapPicker.recentSearches || 'Recent Searches'}
             </ResultTitle>
          )}
          {displayList.map((loc) => (
            <ResultItem key={loc.id} onPress={() => onSelectLocation(loc)}>
              <ResultIconBox>
                <MaterialIcons 
                  name={isHistory ? "history" : "place"} 
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

