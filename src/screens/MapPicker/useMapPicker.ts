import { useState, useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';

export interface MockLocation {
  id: string;
  name: string;
  address: string;
}

const MOCK_MAP_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRVnPqZxn4Q3q5Qctec-fxQEuS7BVsO9PF15Gl0dbGVoHKyOeFgmfFWZBd3yHFunMSlScEk2J-oSXFzLKVcp6BOqQ0kCbZQn_X8_i8AwxCxLt6ns0Jx8JoMrOsBqYtzLQ4TnoChyG7mRmtdUKTD3UR0rQ_qV0sLEXMRDJyYvH6nUNRCEL5cNFqV8__qsT3YpXbUZHS5CVTrl00pDWpU5Mgv27dAXi-5zefyrVCRfaC9vil60rcDaOcfjlJ2HIuO21v7qMUPulKqsby';

const MOCK_RESULTS: MockLocation[] = [
  { id: '1', name: 'Eiffel Tower', address: 'Champ de Mars, 5 Av. Anatole, 75007 Paris' },
  { id: '2', name: 'Louvre Museum', address: 'Rue de Rivoli, 75001 Paris, France' },
  { id: '3', name: 'Arc de Triomphe', address: 'Pl. Charles de Gaulle, 75008 Paris' },
];

type MapPickerRouteProp = RouteProp<RootStackParamList, 'MapPicker'>;

export const useMapPicker = () => {
  const navigation = useNavigation();
  const route = useRoute<MapPickerRouteProp>();
  
  const pickerType = route.params?.type || 'start';
  const returnTo = route.params?.returnTo || 'LocationSelection';


  const [selectedLocation, setSelectedLocation] = useState<MockLocation | null>(null);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearchSelect = useCallback((location: MockLocation) => {
    setSelectedLocation(location);
  }, []);

  const handleConfirmLocation = useCallback(() => {
    if (selectedLocation) {
      (navigation.navigate as any)({
        name: returnTo,
        params: {
          updatedLocation: selectedLocation,
          type: pickerType,
        },
        merge: true,
      });
    } else {
      navigation.goBack();
    }
  }, [navigation, selectedLocation, pickerType]);

  return {
    pickerType,
    mapImageSource: MOCK_MAP_IMAGE_URL,
    mockLocations: MOCK_RESULTS,
    selectedLocation,
    handleBackPress,
    handleSearchSelect,
    handleConfirmLocation,
  };
};
