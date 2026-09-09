import { useState, useEffect, useCallback, useMemo } from 'react';
import { useBookRideStore } from '@/store/useBookRideStore';
import { type FilterPreferenceState, type RideFiltersModalProps } from './types.d';

export const useRideFilters = ({
  isOpen,
  selectedFilters,
  onClose,
  onClear,
  onApply,
  t,
}: RideFiltersModalProps) => {
  const currentStoreRadius = useBookRideStore(s => s.searchRadiusKm || 25);
  const [proximity, setProximity] = useState<'pickup' | 'dropoff'>(
    selectedFilters.includes('nearDropoff') ? 'dropoff' : 'pickup',
  );

  const [preferences, setPreferences] = useState<FilterPreferenceState>({
    noSmoking: selectedFilters.includes('noSmoking'),
    ladiesOnly: selectedFilters.includes('ladiesOnly'),
    verifiedOnly: selectedFilters.includes('verifiedOnly'),
    petFriendly: selectedFilters.includes('petFriendly'),
    luggageAllowed: selectedFilters.includes('luggageAllowed'),
    manualApproval: selectedFilters.includes('manualApproval'),
  });

  const [radiusKm, setRadiusKm] = useState<number>(currentStoreRadius);

  useEffect(() => {
    if (isOpen) {
      setRadiusKm(useBookRideStore.getState().searchRadiusKm || 25);
      setProximity(selectedFilters.includes('nearDropoff') ? 'dropoff' : 'pickup');
      setPreferences({
        noSmoking: selectedFilters.includes('noSmoking'),
        ladiesOnly: selectedFilters.includes('ladiesOnly'),
        verifiedOnly: selectedFilters.includes('verifiedOnly'),
        petFriendly: selectedFilters.includes('petFriendly'),
        luggageAllowed: selectedFilters.includes('luggageAllowed'),
        manualApproval: selectedFilters.includes('manualApproval'),
      });
      setSelectedTimeSlots(selectedFilters.filter(f => f.startsWith('time_')));
    }
  }, [isOpen, selectedFilters]);

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>(
    selectedFilters.filter(f => f.startsWith('time_')),
  );

  const timeSlots = useMemo(
    () => [
      { id: 'time_0_4', label: t.timeSlot04 || '12-4 AM', icon: 'nights-stay' },
      { id: 'time_4_8', label: t.timeSlot48 || '4-8 AM', icon: 'wb-twilight' },
      { id: 'time_8_12', label: t.timeSlot812 || '8-12 AM', icon: 'wb-sunny' },
      { id: 'time_12_16', label: t.timeSlot1216 || '12-4 PM', icon: 'light-mode' },
      { id: 'time_16_20', label: t.timeSlot1620 || '4-8 PM', icon: 'wb-cloudy' },
      { id: 'time_20_24', label: t.timeSlot2024 || '8-12 PM', icon: 'bedtime' },
    ],
    [t],
  );

  const toggleTimeSlot = useCallback((id: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id],
    );
  }, []);

  const togglePreference = useCallback((key: keyof FilterPreferenceState) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleStepRadius = useCallback((delta: number) => {
    setRadiusKm(prev => {
      const next = prev + delta;
      return Math.min(50, Math.max(1, next));
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setRadiusKm(25);
    setProximity('pickup');
    setSelectedTimeSlots([]);
    setPreferences({
      noSmoking: false,
      ladiesOnly: false,
      verifiedOnly: false,
      petFriendly: false,
      luggageAllowed: false,
      manualApproval: false,
    });
    useBookRideStore.getState().setSearchRadiusKm(25);
    onClear();
  }, [onClear]);

  const handleApply = useCallback(() => {
    const activeFilters: string[] = [];
    if (preferences.noSmoking) activeFilters.push('noSmoking');
    if (preferences.ladiesOnly) activeFilters.push('ladiesOnly');
    if (preferences.verifiedOnly) activeFilters.push('verifiedOnly');
    if (preferences.petFriendly) activeFilters.push('petFriendly');
    if (preferences.luggageAllowed) activeFilters.push('luggageAllowed');
    if (preferences.manualApproval) activeFilters.push('manualApproval');

    selectedTimeSlots.forEach(slot => activeFilters.push(slot));

    if (proximity === 'pickup') activeFilters.push('nearPickup');
    else if (proximity === 'dropoff') activeFilters.push('nearDropoff');

    useBookRideStore.getState().setSearchRadiusKm(radiusKm);
    onApply(activeFilters);
    onClose();
  }, [preferences, selectedTimeSlots, proximity, radiusKm, onApply, onClose]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (preferences.noSmoking) count++;
    if (preferences.ladiesOnly) count++;
    if (preferences.verifiedOnly) count++;
    if (preferences.petFriendly) count++;
    if (preferences.luggageAllowed) count++;
    count += selectedTimeSlots.length;
    if (proximity === 'dropoff') count++;
    return count;
  }, [preferences, selectedTimeSlots, proximity]);

  return {
    proximity,
    setProximity,
    preferences,
    togglePreference,
    radiusKm,
    setRadiusKm,
    handleStepRadius,
    selectedTimeSlots,
    toggleTimeSlot,
    timeSlots,
    handleClearAll,
    handleApply,
    activeCount,
  };
};
