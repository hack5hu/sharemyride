import { TimelinePoint } from '../3_AvailableRides/types';

export interface RideRouteMapParams {
  routePath: string;
  stops: Array<{
    lat: number;
    lon: number;
    name: string;
    sequence: number;
  }>;
}

export interface RideRouteMapProps {
  route: {
    params: RideRouteMapParams;
  };
}
