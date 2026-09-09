import { type ReactNode } from 'react';
import { type Translations } from '@/constants/localization/types';

export interface RideFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  onApply: (filters: string[]) => void;
  selectedFilters: string[];
  t: Translations['rideFilters'];
}

export interface FilterPreferenceState {
  noSmoking: boolean;
  ladiesOnly: boolean;
  verifiedOnly: boolean;
  petFriendly: boolean;
  luggageAllowed: boolean;
  manualApproval: boolean;
}

export interface TimeSlotOption {
  id: string;
  label: string;
  icon: string;
}
