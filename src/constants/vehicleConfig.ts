export interface Seat {
  id: number;
  seatName: string;
}

export interface VehicleSeatConfig {
  typeName: string;
  seats: Seat[];
}

export const VEHICLE_SEAT_CONFIGS: VehicleSeatConfig[] = [
  {
    typeName: 'CAR_5_SEATER',
    seats: [
      { id: 2, seatName: '1A' },
      { id: 3, seatName: '2A' },
      { id: 4, seatName: '2B' },
      { id: 5, seatName: '2C' },
    ],
  },
  {
    typeName: 'CAR_7_SEATER',
    seats: [
      { id: 2, seatName: '1A' },
      { id: 3, seatName: '2A' },
      { id: 4, seatName: '2B' },
      { id: 5, seatName: '2C' },
      { id: 6, seatName: '3A' },
      { id: 7, seatName: '3B' },
    ],
  },
];
