import nearestPointOnLine from '@turf/nearest-point-on-line';
import turfDistance from '@turf/distance';
import { point, lineString } from '@turf/helpers';

/** Maximum allowed deviation from the route in kilometers */
export const MAX_DEVIATION_KM = 1;

export interface SnapResult {
  /** [lng, lat] of the closest point on the polyline */
  snappedPoint: [number, number];
  /** Perpendicular distance in km from the original point to the snapped point */
  distanceKm: number;
  /** Whether the distance is within the allowed threshold */
  isWithinThreshold: boolean;
}

/**
 * Snaps a geographic point to the nearest position on a polyline.
 *
 * @param target - [lng, lat] of the point to snap
 * @param routeCoords - Array of [lng, lat] coordinates forming the route polyline
 * @returns SnapResult with snapped position, distance, and threshold check
 */
export const snapToRoute = (
  target: [number, number],
  routeCoords: [number, number][],
): SnapResult => {
  if (!routeCoords || routeCoords.length < 2) {
    return {
      snappedPoint: target,
      distanceKm: 0,
      isWithinThreshold: true,
    };
  }

  const targetPoint = point(target);
  const line = lineString(routeCoords);

  const snapped = nearestPointOnLine(line, targetPoint, { units: 'kilometers' });

  const snappedCoords = snapped.geometry.coordinates as [number, number];
  const distanceKm = turfDistance(targetPoint, point(snappedCoords), {
    units: 'kilometers',
  });

  return {
    snappedPoint: snappedCoords,
    distanceKm: Math.round(distanceKm * 10) / 10, // round to 1 decimal
    isWithinThreshold: distanceKm <= MAX_DEVIATION_KM,
  };
};

/**
 * Builds a GeoJSON LineString between two [lng, lat] points.
 * Used to draw the dashed connector line on the map.
 */
export const buildConnectorLine = (
  from: [number, number],
  to: [number, number],
): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [from, to],
      },
    },
  ],
});

/**
 * Builds a GeoJSON LineString from an array of route coordinates.
 * Used to draw the main route polyline on the map.
 */
export const buildRouteLineGeoJSON = (
  coords: [number, number][],
): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coords,
      },
    },
  ],
});
