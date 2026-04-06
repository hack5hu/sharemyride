export interface SeatConfig {
  id: string;
  isDriver?: boolean;
}

// 5-seater: Front row [Driver, Passenger], Back row [L, M, R]
export const FIVE_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 'driver', isDriver: true }, { id: 'front-passenger' }],
  [{ id: 'back-left' }, { id: 'back-mid' }, { id: 'back-right' }],
];

// 7-seater: Front row [Driver, Passenger], Middle row [ML, MM, MR], Back row [BL, BR]
export const SEVEN_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 'driver', isDriver: true }, { id: 'front-passenger' }],
  [{ id: 'mid-left' }, { id: 'mid-mid' }, { id: 'mid-right' }],
  [{ id: 'back-left' }, { id: 'back-right' }],
];
