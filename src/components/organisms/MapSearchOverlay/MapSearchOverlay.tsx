import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import {
  OverlayContainer,
  TopBarMockup,
  BackButton,
  Title,
  Spacer,
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

interface MockLocation {
  id: string;
  name: string;
  address: string;
}

export interface MapSearchOverlayProps {
  onBackPress: () => void;
  onSelectLocation: (location: MockLocation) => void;
  mockLocations: MockLocation[];
}

export const MapSearchOverlay: React.FC<MapSearchOverlayProps> = ({
  onBackPress,
  onSelectLocation,
  mockLocations,
}) => {
  const theme = useTheme();
  const { mapPicker } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredLocations = searchQuery.trim().length > 0
    ? mockLocations.filter(loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <OverlayContainer edges={['top']}>
      <TopBarMockup>
        <BackButton onPress={onBackPress}>
          <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
        </BackButton>
        <Title>{mapPicker.title}</Title>
        <Spacer />
      </TopBarMockup>

      <SearchInputContainer $isFocused={isFocused}>
        <MaterialIcons name="search" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
        <SearchInput
          placeholder={mapPicker.searchPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <LocationButton>
          <MaterialIcons name="my-location" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
        </LocationButton>
      </SearchInputContainer>

      {searchQuery.trim().length > 0 && filteredLocations.length > 0 && (
        <SearchResultsBox>
          {filteredLocations.map((loc, idx) => (
            <ResultItem key={loc.id} onPress={() => {
              setSearchQuery(''); 
              onSelectLocation(loc);
            }}>
              <ResultIconBox>
                <MaterialIcons name="place" size={moderateScale(20)} color={theme.colors.primary} />
              </ResultIconBox>
              <ResultTextContainer>
                <ResultTitle>{loc.name}</ResultTitle>
                <ResultSubtitle>{loc.address}</ResultSubtitle>
              </ResultTextContainer>
            </ResultItem>
          ))}
        </SearchResultsBox>
      )}
    </OverlayContainer>
  );
};
