import React from 'react';
import { Button } from '@/components/atoms/Button';
import { useLocale } from '@/constants/localization';
import * as S from '../RideInformationTemplate.styles';

export interface FixedFooterCTAProps {
  isDriver: boolean;
  showBookButton: boolean;
  onCancelRide?: () => void;
  handleBook: () => void;
  onCancelPassenger?: (id: string) => void;
}

export const FixedFooterCTA: React.FC<FixedFooterCTAProps> = React.memo(
  ({
    isDriver,
    showBookButton,
    onCancelRide,
    handleBook,
    onCancelPassenger,
  }) => {
    const translations = useLocale();

    return (
      <S.FixedFooter>
        {isDriver ? (
          <Button
            variant="outline"
            icon="cancel"
            iconPosition="left"
            onPress={onCancelRide}
          >
            {translations.rideDetails.cancelRide}
          </Button>
        ) : showBookButton ? (
          <Button
            variant="primary"
            icon="airline-seat-recline-normal"
            iconPosition="left"
            onPress={handleBook}
          >
            {translations.rideDetails.selectSeat}
          </Button>
        ) : (
          <Button
            variant="outline"
            icon="person-remove"
            iconPosition="left"
            onPress={() => onCancelPassenger?.('')}
          >
            {translations.rideDetails.cancelBooking}
          </Button>
        )}
      </S.FixedFooter>
    );
  },
);
