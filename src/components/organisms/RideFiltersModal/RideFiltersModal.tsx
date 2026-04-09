import React, { useState, useRef, useMemo } from 'react';
import { Modal, View, TouchableOpacity, PanResponder, Animated } from 'react-native';
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
  t: any;
}

export const RideFiltersModal: React.FC<RideFiltersModalProps> = ({
  isOpen,
  onClose,
  onClear,
  t,
}) => {
  const theme = useTheme();
  const [proximity, setProximity] = useState<'pickup' | 'dropoff'>('pickup');
  const [seats, setSeats] = useState(2);
  const [preferences, setPreferences] = useState({
    noSmoking: true,
    ladiesOnly: false,
    verifiedOnly: true,
  });

  // Slider State
  const [trackWidth, setTrackWidth] = useState(0);
  const [startTimePos, setStartTimePos] = useState(20); // 0-100
  const [endTimePos, setEndTimePos] = useState(60);   // 0-100

  const formatTime = (pos: number) => {
    const totalMinutes = (pos / 100) * 12 * 60; // 12 hours
    const hour24 = Math.floor(totalMinutes / 60) + 6;
    const minutes = Math.floor(totalMinutes % 60);
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24;
    return `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const createPanResponder = (type: 'start' | 'end') => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (trackWidth === 0) return;
      
      const deltaPercent = (gestureState.dx / trackWidth) * 100;
      if (type === 'start') {
        const newPos = Math.max(0, Math.min(endTimePos - 5, startTimePos + deltaPercent));
        setStartTimePos(newPos);
      } else {
        const newPos = Math.max(startTimePos + 5, Math.min(100, endTimePos + deltaPercent));
        setEndTimePos(newPos);
      }
    },
    // Resetting gestureState offset is handled by updating base position on release if needed,
    // but here we use cumulative dx since start of gesture relative to current state.
    // For simplicity with useState, we can just use the gestureState.dx.
  });

  const startPanResponder = useMemo(() => createPanResponder('start'), [trackWidth, endTimePos, startTimePos]);
  const endPanResponder = useMemo(() => createPanResponder('end'), [trackWidth, startTimePos, endTimePos]);

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
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.primary}>
                  {formatTime(startTimePos)} - {formatTime(endTimePos)}
                </Typography>
              </S.SectionTitle>
              <S.SliderTrack onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}>
                <S.SliderRange start={startTimePos} end={endTimePos} />
                <View 
                  style={{ position: 'absolute', left: `${startTimePos}%`, zIndex: 10 }} 
                  {...startPanResponder.panHandlers}
                >
                  <S.SliderThumb />
                </View>
                <View 
                  style={{ position: 'absolute', left: `${endTimePos}%`, zIndex: 10 }} 
                  {...endPanResponder.panHandlers}
                >
                  <S.SliderThumb />
                </View>
              </S.SliderTrack>
              <S.TimeLabelContainer>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>06:00 AM</Typography>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>12:00 PM</Typography>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>06:00 PM</Typography>
              </S.TimeLabelContainer>
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
            </S.Section>

            {/* Seat Availability */}
            <S.Section>
              <S.SectionTitle>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t.seatAvailabilityTitle.toUpperCase()}
                </Typography>
              </S.SectionTitle>
              <S.CounterRow>
                <Typography variant="label" size="md" weight="bold">{t.seatsRequiredLabel}</Typography>
                <S.CounterControls>
                  <TouchableOpacity onPress={() => setSeats(Math.max(1, seats - 1))}>
                    <Icon name="remove-circle-outline" size={moderateScale(32)} color={theme.colors.on_surface_variant} />
                  </TouchableOpacity>
                  <Typography variant="title" size="md" weight="bold" color={theme.colors.primary}>{seats}</Typography>
                  <TouchableOpacity onPress={() => setSeats(Math.min(8, seats + 1))}>
                    <Icon name="add-circle" size={moderateScale(32)} color={theme.colors.primary} />
                  </TouchableOpacity>
                </S.CounterControls>
              </S.CounterRow>
            </S.Section>
            <View style={{ height: verticalScale(120) }} />
          </S.ScrollBody>

          <S.Footer>
            <S.ApplyButton onPress={onClose}>
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
