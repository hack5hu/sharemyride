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

  const nLat1 = Number(lat1);
  const nLon1 = Number(lon1);
  const nLat2 = Number(lat2);
  const nLon2 = Number(lon2);

  const R = 6371; // Earth radius in km
  const dLat = ((nLat2 - nLat1) * Math.PI) / 180;
  const dLon = ((nLon2 - nLon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((nLat1 * Math.PI) / 180) *
      Math.cos((nLat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const formatPassengerStopProgress = (
  distanceKm: number | null | undefined,
  rawEtaMinutes: number | null | undefined,
  arrivalTime?: string | null,
): string => {
  const hasDist =
    distanceKm !== undefined &&
    distanceKm !== null &&
    !isNaN(Number(distanceKm));

  const numDist = hasDist ? Number(distanceKm) : undefined;

  let etaMins: number | undefined;
  if (
    rawEtaMinutes !== undefined &&
    rawEtaMinutes !== null &&
    !isNaN(Number(rawEtaMinutes))
  ) {
    etaMins = Math.round(Number(rawEtaMinutes));
  } else if (arrivalTime) {
    try {
      const arr = new Date(arrivalTime).getTime();
      const now = Date.now();
      const diff = Math.round((arr - now) / 60000);
      if (diff > 0) etaMins = diff;
    } catch {}
  } else if (numDist !== undefined) {
    etaMins = Math.max(1, Math.round(numDist * 1.5));
  }

  if (numDist === undefined && etaMins === undefined) {
    return '0 km • 0 mins';
  }

  let distText = '';
  if (numDist !== undefined) {
    if (numDist < 0.05) {
      distText = '0 m';
    } else if (numDist < 1) {
      distText = `${Math.round(numDist * 1000)} m`;
    } else {
      distText = `${numDist.toFixed(1)} km`;
    }
  }

  const etaText =
    etaMins !== undefined
      ? `${etaMins} ${etaMins === 1 ? 'min' : 'mins'}`
      : undefined;

  if (distText && etaText) {
    return `${distText} • ${etaText}`;
  }
  return distText || etaText || '0 km • 0 mins';
};

export const getReadableColorName = (
  colorStr?: string | null,
): string | undefined => {
  if (!colorStr) return undefined;
  const raw = colorStr.trim();
  const upper = raw.toUpperCase();

  const colorMap: Record<string, string> = {
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFFFF': 'White',
    '#000000': 'Black',
    '#FFFF00': 'Yellow',
    '#808080': 'Grey',
    '#C0C0C0': 'Silver',
    '#FFA500': 'Orange',
    '#A52A2A': 'Brown',
    '#800080': 'Purple',
    '#FFC0CB': 'Pink',
  };

  if (raw.startsWith('#')) {
    return colorMap[upper] || 'Custom Color';
  }

  // Capitalize first letter of each word
  return raw.replace(/\b\w/g, (c) => c.toUpperCase());
};
