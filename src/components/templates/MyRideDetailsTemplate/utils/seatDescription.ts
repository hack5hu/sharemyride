export const getSeatDescription = (
  seatId: string | number,
  vehicleType: string | undefined,
  translations: any,
): string => {
  const id = String(seatId);
  const typeStr = (vehicleType || '').toUpperCase();
  const is7Seater = typeStr.includes('7') || typeStr === '7';
  const positions = translations.bookingConfirmed.seatPositions;

  if (id === '1' || id === 'driver') return positions.driver;
  if (id === '2') return positions.frontPassenger;

  if (is7Seater) {
    switch (id) {
      case '3':
        return positions.middleLeft;
      case '4':
        return positions.middleCenter;
      case '5':
        return positions.middleRight;
      case '6':
        return positions.backLeft;
      case '7':
        return positions.backRight;
    }
  } else {
    switch (id) {
      case '3':
        return positions.backLeft;
      case '4':
        return positions.backCenter;
      case '5':
        return positions.backRight;
    }
  }

  return positions.defaultSeat.replace('{id}', id);
};
