export interface RideRouteMapParams {
  routePath: string;
  stops: Array<{
    lat: number;
    lon: number;
    name: string;
    sequence: number;
  }>;
  initialStopIndex?: number;
}

export interface RideRouteMapProps {
  route: {
    params: RideRouteMapParams;
  };
}
