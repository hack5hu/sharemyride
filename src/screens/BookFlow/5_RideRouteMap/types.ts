export interface RideRouteMapParams {
  routePath?: string;
  stops?: Array<{
    id?: number | string;
    lat: number;
    lon: number;
    name: string;
    sequence: number;
  }>;
  initialStopIndex?: number;
  sourceStopId?: number | string;
  destinationStopId?: number | string;
  destination?: {
    latitude: number;
    longitude: number;
    name: string;
    address?: string;
  };
  userSearchedPickup?: {
    latitude: number;
    longitude: number;
    name: string;
  };
  userSearchedDropoff?: {
    latitude: number;
    longitude: number;
    name: string;
  };
}

export interface RideRouteMapProps {
  route: {
    params: RideRouteMapParams;
  };
}
