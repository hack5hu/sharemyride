export interface SeatConfig {
  id: string | number;
  isDriver?: boolean;
  isBooked?: boolean;
}

// 5-seater: Front row [1A (2), Driver], Back row [2A (3), 2B (4), 2C (5)]
export const FIVE_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 2 }, { id: 'driver', isDriver: true }],
  [{ id: 3 }, { id: 4 }, { id: 5 }],
];

// 7-seater: Front row [1A (2), Driver], Middle row [2A (3), 2B (4), 2C (5)], Back row [3A (6), 3B (7)]
export const SEVEN_SEATER_ROWS: SeatConfig[][] = [
  [{ id: 2 }, { id: 'driver', isDriver: true }],
  [{ id: 3 }, { id: 4 }, { id: 5 }],
  [{ id: 6 }, { id: 7 }],
];
