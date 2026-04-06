import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LocationOption } from '@/components/organisms/MiddleStopSearchOverlay';

const MOCK_SUGGESTIONS: LocationOption[] = [
  { id: '1', name: 'Blue Springs Junction', subtitle: 'Used in 12 of your rides', isPopular: true },
  { id: '2', name: 'Riverstone Plaza', subtitle: 'Near the Main Highway', isPopular: false },
];

const MOCK_HISTORY: LocationOption[] = [
  { id: '3', name: 'North Ridge Transit Hub' },
  { id: '4', name: 'Oakwood Station' },
];

export const useMiddleStopMap = () => {
  const navigation = useNavigation();

  const routeTitle = "Electronic City → Manyata Tech Park";
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | undefined>();

  const handleBackPress = useCallback(() => {
    if (isSearching) {
      setIsSearching(false);
      setSearchQuery('');
    } else {
      // Go back to previous screen
      navigation.goBack();
    }
  }, [isSearching, navigation]);

  const handleSearchPress = useCallback(() => {
    setIsSearching(true);
  }, []);

  const handleChangeSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSelectLocation = useCallback((loc: LocationOption) => {
    setSelectedLocation(loc);
    setIsSearching(false);
    setSearchQuery('');
  }, []);

  const handleContinue = useCallback(() => {
    if (selectedLocation) {
      // Navigate back to MiddleStops, passing the selected stop
      (navigation.navigate as any)('MiddleStops', {
        newStop: { id: selectedLocation.id, name: selectedLocation.name }
      });
    }
  }, [selectedLocation, navigation]);

  return {
    isSearching,
    searchQuery,
    selectedLocation,
    routeTitle,
    suggestedLocations: MOCK_SUGGESTIONS,
    recentHistory: MOCK_HISTORY,
    handleBackPress,
    handleSearchPress,
    handleChangeSearch,
    handleSelectLocation,
    handleContinue,
  };
};
