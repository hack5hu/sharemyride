import React from 'react';
import { SeatButton, SeatState } from '@/components/atoms/SeatButton';
import {
  FloorPlanContainer,
  Windshield,
  SeatsWrapper,
  SeatRow,
  TrunkBar,
} from './CarFloorPlan.styles';
import { SeatConfig } from './seatConfig';

export interface CarFloorPlanProps {
  rows: SeatConfig[][];
  selectedSeats: Set<string>;
  onSeatPress: (id: string) => void;
  driverLabel: string;
}

export const CarFloorPlan: React.FC<CarFloorPlanProps> = ({
  rows,
  selectedSeats,
  onSeatPress,
  driverLabel,
}) => {
  const getSeatState = (id: string, isDriver?: boolean): SeatState => {
    if (isDriver) return 'driver';
    if (selectedSeats.has(id)) return 'selected';
    return 'available';
  };

  return (
    <FloorPlanContainer>
      <Windshield />
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
              />
            ))}
          </SeatRow>
        ))}
      </SeatsWrapper>
      <TrunkBar />
    </FloorPlanContainer>
  );
};
