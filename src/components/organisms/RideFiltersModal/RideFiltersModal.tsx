import React from 'react';
import { Modal } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useBottomSafeArea } from '@/hooks/useBottomSafeArea';
import { PreferencesSection } from './PreferencesSection';
import { ProximitySection } from './ProximitySection';
import { RadiusSection } from './RadiusSection';
import * as S from './RideFiltersModal.styles';
import { TimeSlotSection } from './TimeSlotSection';
import { type RideFiltersModalProps } from './types.d';
import { useRideFilters } from './useRideFilters';

export const RideFiltersModal: React.FC<RideFiltersModalProps> = React.memo(
  props => {
    const { isOpen, onClose, t } = props;
    const theme = useTheme();
    const bottomPadding = useBottomSafeArea(16, 16) + 16;

    const {
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
    } = useRideFilters(props);

    const buttonLabel = activeCount > 0
      ? `${t.applyFilters} (${activeCount})`
      : t.applyFilters;

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <S.ModalContainer>
          <S.Backdrop onPress={onClose} />
          <S.SheetContent>
            <S.Handle />
            <S.Header>
              <Typography variant="title" size="md" weight="bold">
                {t.title}
              </Typography>
              <S.ClearButton onPress={handleClearAll} activeOpacity={0.7}>
                <Typography
                  variant="label"
                  size="md"
                  weight="bold"
                  color={theme.colors.primary}
                >
                  {t.clearAll}
                </Typography>
              </S.ClearButton>
            </S.Header>

            <S.ScrollBody showsVerticalScrollIndicator={false}>
              <ProximitySection
                proximity={proximity}
                onSelect={setProximity}
                t={t}
              />

              <RadiusSection
                radiusKm={radiusKm}
                onSelectRadius={setRadiusKm}
                onStepRadius={handleStepRadius}
                t={t}
              />

              <TimeSlotSection
                timeSlots={timeSlots}
                selectedSlots={selectedTimeSlots}
                onToggleSlot={toggleTimeSlot}
                t={t}
              />

              <PreferencesSection
                preferences={preferences}
                onToggle={togglePreference}
                t={t}
              />
            </S.ScrollBody>

            <S.Footer $paddingBottom={bottomPadding}>
              <Button
                variant="primary"
                onPress={handleApply}
              >
                {buttonLabel}
              </Button>
            </S.Footer>
          </S.SheetContent>
        </S.ModalContainer>
      </Modal>
    );
  },
);
