export const calculateDistanceKm = (
  lat1?: number | null,
  lon1?: number | null,
  lat2?: number | null,
  lon2?: number | null,
): number | null => {
  if (
    lat1 === undefined ||
    lon1 === undefined ||
    lat2 === undefined ||
    lon2 === undefined ||
    lat1 === null ||
    lon1 === null ||
    lat2 === null ||
    lon2 === null
  ) {
    return null;
  }
  const R = 6371; // km
  const dLat = ((Number(lat2) - Number(lat1)) * Math.PI) / 180;
  const dLon = ((Number(lon2) - Number(lon1)) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((Number(lat1) * Math.PI) / 180) *
      Math.cos((Number(lat2) * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const formatPassengerDistance = (
  distanceKm: number | null | undefined,
  locale: {
    atPickupStop: string;
    distanceAwayFromStop: string;
    liveLocationInactive: string;
  },
): string | undefined => {
  if (
    distanceKm === undefined ||
    distanceKm === null ||
    isNaN(Number(distanceKm))
  ) {
    return undefined;
  }
  const num = Number(distanceKm);
  if (num < 0.05) {
    return locale.atPickupStop;
  }
  if (num < 1) {
    const meters = Math.round(num * 1000);
    return locale.distanceAwayFromStop.replace('{{distance}}', `${meters} m`);
  }
  return locale.distanceAwayFromStop.replace(
    '{{distance}}',
    `${num.toFixed(1)} km`,
  );
};
