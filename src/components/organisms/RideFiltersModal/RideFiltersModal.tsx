import React, { useState } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, verticalScale } from '@/styles';
import { Checkbox } from '@/components/atoms/Checkbox';
import * as S from './RideFiltersModal.styles';

export interface RideFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  onApply: (filters: string[]) => void;
  selectedFilters: string[];
  t: any;
}

export const RideFiltersModal: React.FC<RideFiltersModalProps> = ({
  isOpen,
  onClose,
  onClear,
  onApply,
  selectedFilters,
  t,
}) => {
  const theme = useTheme();
  const [proximity, setProximity] = useState<'pickup' | 'dropoff'>(
    selectedFilters.includes('nearDropoff') ? 'dropoff' : 'pickup'
  );
  const [preferences, setPreferences] = useState({
    noSmoking: selectedFilters.includes('noSmoking'),
    ladiesOnly: selectedFilters.includes('ladiesOnly'),
    verifiedOnly: selectedFilters.includes('verifiedOnly'),
    petFriendly: selectedFilters.includes('petFriendly'),
    luggageAllowed: selectedFilters.includes('luggageAllowed'),
    manualApproval: selectedFilters.includes('manualApproval'),
  });

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>(
    selectedFilters.filter((f) => f.startsWith('time_'))
  );

  const TIME_SLOTS = [
    { id: 'time_0_4', label: '12-4 AM', icon: 'nights-stay' },
    { id: 'time_4_8', label: '4-8 AM', icon: 'wb-twilight' },
    { id: 'time_8_12', label: '8-12 AM', icon: 'wb-sunny' },
    { id: 'time_12_16', label: '12-4 PM', icon: 'light-mode' },
    { id: 'time_16_20', label: '4-8 PM', icon: 'wb-cloudy' },
    { id: 'time_20_24', label: '8-12 PM', icon: 'bedtime' },
  ];

  const toggleTimeSlot = (id: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <S.ModalContainer>
        <S.Backdrop onPress={onClose} />
        <S.SheetContent>
          <S.Handle />
          <S.Header>
            <Typography variant="title" size="md" weight="bold">{t.title}</Typography>
            <TouchableOpacity onPress={onClear}>
              <Typography variant="label" size="md" weight="bold" color={theme.colors.primary}>
                {t.clearAll}
              </Typography>
            </TouchableOpacity>
          </S.Header>

          <S.ScrollBody showsVerticalScrollIndicator={false}>
            {/* Proximity */}
            <S.Section>
              <S.SectionTitle>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.proximityTitle.toUpperCase()}
                </Typography>
              </S.SectionTitle>
              <S.ProximityGrid>
                <S.ProximityButton active={proximity === 'pickup'} onPress={() => setProximity('pickup')}>
                  <Typography variant="label" size="md" weight="bold" color={proximity === 'pickup' ? theme.colors.primary : theme.colors.on_surface_variant}>
                    {t.nearPickup}
                  </Typography>
                  <Icon name={proximity === 'pickup' ? "check-circle" : "radio-button-unchecked"} size={moderateScale(20)} color={proximity === 'pickup' ? theme.colors.primary : theme.colors.outline_variant} />
                </S.ProximityButton>
                <S.ProximityButton active={proximity === 'dropoff'} onPress={() => setProximity('dropoff')}>
                  <Typography variant="label" size="md" weight="bold" color={proximity === 'dropoff' ? theme.colors.primary : theme.colors.on_surface_variant} >
                    {t.nearDropoff}
                  </Typography>
                  <Icon name={proximity === 'dropoff' ? "check-circle" : "radio-button-unchecked"} size={moderateScale(20)} color={proximity === 'dropoff' ? theme.colors.primary : theme.colors.outline_variant} />
                </S.ProximityButton>
              </S.ProximityGrid>
            </S.Section>

            {/* Departure Time */}
            <S.Section>
              <S.SectionTitle>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.departureTimeTitle.toUpperCase()}
                </Typography>
              </S.SectionTitle>
              <S.TimeGrid>
                {TIME_SLOTS.map((slot) => (
                  <S.TimeCell 
                    key={slot.id} 
                    active={selectedTimeSlots.includes(slot.id)}
                    onPress={() => toggleTimeSlot(slot.id)}
                  >
                    <Icon 
                      name={slot.icon} 
                      size={moderateScale(20)} 
                      color={selectedTimeSlots.includes(slot.id) ? theme.colors.primary : theme.colors.on_surface_variant} 
                    />
                    <Typography 
                      variant="label" 
                      size="xs" 
                      weight="bold" 
                      color={selectedTimeSlots.includes(slot.id) ? theme.colors.primary : theme.colors.on_surface_variant}
                    >
                      {slot.label}
                    </Typography>
                  </S.TimeCell>
                ))}
              </S.TimeGrid>
            </S.Section>

            {/* Preferences */}
            <S.Section>
              <S.SectionTitle>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.preferencesTitle.toUpperCase()}
                </Typography>
              </S.SectionTitle>
              <S.PreferenceItem onPress={() => togglePreference('noSmoking')}>
                <S.PreferenceLeft>
                  <Icon name="smoke-free" size={moderateScale(20)} color={theme.colors.secondary} />
                  <Typography variant="label" size="md" weight="bold">No Smoking</Typography>
                </S.PreferenceLeft>
                <Checkbox checked={preferences.noSmoking} onToggle={() => togglePreference('noSmoking')} />
              </S.PreferenceItem>
              <S.PreferenceItem onPress={() => togglePreference('ladiesOnly')}>
                <S.PreferenceLeft>
                  <Icon name="female" size={moderateScale(20)} color={theme.colors.tertiary} />
                  <Typography variant="label" size="md" weight="bold">Ladies Only</Typography>
                </S.PreferenceLeft>
                <Checkbox checked={preferences.ladiesOnly} onToggle={() => togglePreference('ladiesOnly')} />
              </S.PreferenceItem>
              <S.PreferenceItem onPress={() => togglePreference('verifiedOnly')}>
                <S.PreferenceLeft>
                  <Icon name="verified-user" size={moderateScale(20)} color={theme.colors.primary} />
                  <Typography variant="label" size="md" weight="bold">Verified Drivers</Typography>
                </S.PreferenceLeft>
                <Checkbox checked={preferences.verifiedOnly} onToggle={() => togglePreference('verifiedOnly')} />
              </S.PreferenceItem>
              <S.PreferenceItem onPress={() => togglePreference('petFriendly')}>
                <S.PreferenceLeft>
                  <Icon name="pets" size={moderateScale(20)} color="#8D6E63" />
                  <Typography variant="label" size="md" weight="bold">Pet Friendly</Typography>
                </S.PreferenceLeft>
                <Checkbox checked={preferences.petFriendly} onToggle={() => togglePreference('petFriendly')} />
              </S.PreferenceItem>
              <S.PreferenceItem onPress={() => togglePreference('luggageAllowed')}>
                <S.PreferenceLeft>
                  <Icon name="luggage" size={moderateScale(20)} color="#546E7A" />
                  <Typography variant="label" size="md" weight="bold">Luggage Allowed</Typography>
                </S.PreferenceLeft>
                <Checkbox checked={preferences.luggageAllowed} onToggle={() => togglePreference('luggageAllowed')} />
              </S.PreferenceItem>
            </S.Section>
          </S.ScrollBody>

          <S.Footer>
            <S.ApplyButton onPress={() => {
              const activeFilters = [];
              if (preferences.noSmoking) activeFilters.push('noSmoking');
              if (preferences.ladiesOnly) activeFilters.push('ladiesOnly');
              if (preferences.verifiedOnly) activeFilters.push('verifiedOnly');
              if (preferences.petFriendly) activeFilters.push('petFriendly');
              if (preferences.luggageAllowed) activeFilters.push('luggageAllowed');
              if (preferences.manualApproval) activeFilters.push('manualApproval');
              
              selectedTimeSlots.forEach(slot => activeFilters.push(slot));
              
              if (proximity === 'pickup') activeFilters.push('nearPickup');
              else if (proximity === 'dropoff') activeFilters.push('nearDropoff');
              
              onApply(activeFilters);
              onClose();
            }}>
              <Typography variant="title" size="sm" weight="bold" color={theme.colors.on_primary}>
                {t.applyFilters}
              </Typography>
            </S.ApplyButton>
          </S.Footer>
        </S.SheetContent>
      </S.ModalContainer>
    </Modal>
  );
};
