export interface SeatConfig {
  id: string;
  isDriver?: boolean;
  isBooked?: boolean;
}

// 5-seater: Front row [1A, Driver], Back row [2A, 2B, 2C]
export const FIVE_SEATER_ROWS: SeatConfig[][] = [
  [{ id: '1A' }, { id: 'driver', isDriver: true }],
  [{ id: '2A' }, { id: '2B' }, { id: '2C' }],
];

// 7-seater: Front row [1A, Driver], Middle row [2A, 2B, 2C], Back row [3A, 3B]
export const SEVEN_SEATER_ROWS: SeatConfig[][] = [
  [{ id: '1A' }, { id: 'driver', isDriver: true }],
  [{ id: '2A' }, { id: '2B' }, { id: '2C' }],
  [{ id: '3A' }, { id: '3B' }],
];
