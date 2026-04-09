export interface SeatConfig {
  id: string;
  isDriver?: boolean;
  isBooked?: boolean;
}

// 5-seater: Front row [Driver, A1], Back row [B1, B2, B3]
export const FIVE_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 'driver', isDriver: true }, { id: 'A1' }],
  [{ id: 'B1' }, { id: 'B2' }, { id: 'B3', isBooked: true }],
];

// 7-seater: Front row [Driver, Passenger], Middle row [ML, MM, MR], Back row [BL, BR]
export const SEVEN_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 'driver', isDriver: true }, { id: 'front-passenger' }],
  [{ id: 'mid-left' }, { id: 'mid-mid' }, { id: 'mid-right' }],
  [{ id: 'back-left' }, { id: 'back-right' }],
];
