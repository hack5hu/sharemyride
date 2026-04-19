export interface SeatConfig {
  id: string;
  isDriver?: boolean;
  isBooked?: boolean;
}

// 5-seater: Front row [A1, Driver], Back row [B1, B2, B3]
export const FIVE_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 'A1' }, { id: 'driver', isDriver: true }],
  [{ id: 'B1' }, { id: 'B2' }, { id: 'B3', isBooked: true }],
];

// 7-seater: Front row [Front Passenger, Driver], Middle row [ML, MM, MR], Back row [BL, BR]
export const SEVEN_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 'front-passenger' }, { id: 'driver', isDriver: true }],
  [{ id: 'mid-left' }, { id: 'mid-mid' }, { id: 'mid-right' }],
  [{ id: 'back-left' }, { id: 'back-right' }],
];
