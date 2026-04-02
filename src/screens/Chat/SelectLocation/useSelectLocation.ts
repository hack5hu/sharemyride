import { useState, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const useSelectLocation = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [isSharingLive, setIsSharingLive] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState('30 min');

  const handleLocationSelect = useCallback((location: any) => {
    console.log('Selected location:', location);
  }, []);

  const handleSetLocation = useCallback(() => {
    console.log('Setting final location...', {
      searchText,
      isSharingLive,
      selectedDuration
    });
  }, [searchText, isSharingLive, selectedDuration]);

  return {
    t,
    searchText,
    setSearchText,
    isSharingLive,
    setIsSharingLive,
    selectedDuration,
    setSelectedDuration,
    handleLocationSelect,
    handleSetLocation,
  };
};
