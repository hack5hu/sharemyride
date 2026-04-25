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
  selectedSeats: Set<string>;
  occupiedSeats?: Set<string>;
  prices?: Record<string, number>;
  onSeatPress: (id: string) => void;
  driverLabel: string;
}

export const CarFloorPlan: React.FC<CarFloorPlanProps> = ({
  rows,
  selectedSeats,
  occupiedSeats = new Set(),
  prices = {},
  onSeatPress,
  driverLabel,
}) => {
  const getSeatState = (id: string, isDriver?: boolean): SeatState => {
    if (isDriver) return 'driver';
    if (selectedSeats.has(id)) return 'selected';
    if (occupiedSeats.has(id)) return 'occupied';
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
            {row.map((seat) => (
              <SeatButton
                key={seat.id}
                id={seat.id}
                state={getSeatState(seat.id, seat.isDriver)}
                onPress={onSeatPress}
                driverLabel={seat.isDriver ? driverLabel : undefined}
                price={prices[seat.id]}
              />
            ))}
          </SeatRow>
        ))}
      </SeatsWrapper>
      <TrunkBar />
    </FloorPlanContainer>
  );
};
