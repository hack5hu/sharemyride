export interface RideRouteMapParams {
  routePath?: string;
  stops?: Array<{
    lat: number;
    lon: number;
    name: string;
    sequence: number;
  }>;
  initialStopIndex?: number;
  destination?: {
    latitude: number;
    longitude: number;
    name: string;
    address?: string;
  };
}

export interface RideRouteMapProps {
  route: {
    params: RideRouteMapParams;
  };
}
