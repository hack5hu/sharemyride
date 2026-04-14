/**
 * Decodes a Google encoded polyline string into an array of [longitude, latitude] coordinates.
 * Compatible with MapLibre/GeoJSON which expects [lng, lat] order.
 * 
 * @param encoded - The encoded polyline string
 * @param precision - Factor to divide by (usually 1e5 for 5 decimals, or 1e6 for 6)
 * @returns Array of coordinates [longitude, latitude]
 */
export function decodePolyline(encoded: string, precision: number = 1e5): [number, number][] {
  if (!encoded) return [];

  const poly: [number, number][] = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    
    // Decode latitude
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    
    // Decode longitude
    if (index >= len) {
        break; // In case of malformed strings
    }
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    // GeoJSON format requires [longitude, latitude]
    poly.push([lng / precision, lat / precision]);
  }

  return poly;
}

/**
 * Returns a bounding box [minLng, minLat, maxLng, maxLat] from an array of coordinates.
 */
export function getBoundingBox(coordinates: [number, number][]): [number, number, number, number] {
  if (!coordinates || coordinates.length === 0) return [0, 0, 0, 0];
  
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  for (const [lng, lat] of coordinates) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }

  return [minLng, minLat, maxLng, maxLat];
}
