export const computeTotalRides = (userObj: any): number => {
  if (!userObj) return 0;
  
  if (typeof userObj.rideCount === 'number' && userObj.rideCount > 0) {
    return userObj.rideCount;
  }
  if (typeof userObj.totalRides === 'number' && userObj.totalRides > 0) {
    return userObj.totalRides;
  }
  if (typeof userObj.totalRidesCount === 'number' && userObj.totalRidesCount > 0) {
    return userObj.totalRidesCount;
  }

  const driverRides = typeof userObj.totalRidesAsDriver === 'number' ? userObj.totalRidesAsDriver : 0;
  const passengerRides = typeof userObj.totalRidesAsPassenger === 'number' ? userObj.totalRidesAsPassenger : 0;

  if (driverRides > 0 || passengerRides > 0) {
    return driverRides + passengerRides;
  }

  return userObj.rideCount || userObj.totalRides || userObj.totalRidesCount || 0;
};
