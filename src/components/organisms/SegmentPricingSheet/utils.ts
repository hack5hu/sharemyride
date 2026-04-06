export interface StopSegment {
  id: string;
  from: string;
  to: string;
}

export const buildSegments = (
  start: string,
  stops: Array<{ id: string; name: string }>,
  destination: string
): StopSegment[] => {
  const points = [start, ...stops.map((s) => s.name), destination];
  return points.slice(0, -1).map((from, i) => ({
    id: `seg-${i}`,
    from,
    to: points[i + 1],
  }));
};
