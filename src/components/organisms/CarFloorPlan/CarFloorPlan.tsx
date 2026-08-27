import React from 'react';
import { SeatButton, SeatState } from '@/components/atoms/SeatButton';
import {
  FloorPlanContainer,
  Windshield,
  SeatsWrapper,
  SeatRow,
  TrunkBar,
  Mirror,
} from './CarFloorPlan.styles';
import { SeatConfig } from './seatConfig';

export interface CarFloorPlanProps {
  rows: SeatConfig[][];
  selectedSeats: Set<string | number>;
  occupiedSeats?: Set<string | number>;
  unavailableSeats?: Set<string | number>;
  prices?: Record<string | number, number>;
  onSeatPress: (id: string | number) => void;
  driverLabel: string;
  occupiedLabel?: string;
  unavailableLabel?: string;
}

export const CarFloorPlan: React.FC<CarFloorPlanProps> = ({
  rows,
  selectedSeats,
  occupiedSeats = new Set(),
  unavailableSeats = new Set(),
  prices = {},
  onSeatPress,
  driverLabel,
  occupiedLabel,
  unavailableLabel,
}) => {
  const getSeatState = (id: string, isDriver?: boolean): SeatState => {
    if (isDriver) return 'driver';
    const numId = Number(id);
    const hasSelected =
      selectedSeats.has(id) || (!isNaN(numId) && selectedSeats.has(numId));
    if (hasSelected) return 'selected';

    const hasOccupied =
      occupiedSeats.has(id) || (!isNaN(numId) && occupiedSeats.has(numId));
    if (hasOccupied) return 'occupied';

    const hasUnavailable =
      unavailableSeats.has(id) ||
      (!isNaN(numId) && unavailableSeats.has(numId));
    if (hasUnavailable) return 'unavailable';

    return 'available';
  };

  return (
    <FloorPlanContainer>
      <Windshield />
      <Mirror side="left" />
      <Mirror side="right" />
      <SeatsWrapper>
        {rows.map((row, rowIndex) => (
          <SeatRow key={`row-${rowIndex}`}>
            {row.map(seat => (
              <SeatButton
                key={seat.seatId}
                id={String(seat.seatId)}
                state={getSeatState(String(seat.seatId), seat.isDriver)}
                onPress={onSeatPress}
                driverLabel={seat.isDriver ? driverLabel : undefined}
                occupiedLabel={occupiedLabel}
                unavailableLabel={unavailableLabel}
                price={prices[seat.seatId]}
              />
            ))}
          </SeatRow>
        ))}
      </SeatsWrapper>
      <TrunkBar />
    </FloorPlanContainer>
  );
};
