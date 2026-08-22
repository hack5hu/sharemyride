import olaClient from './olaClient';
import { Logger } from '@/utils/logger';

export interface OlaPrediction {
  description: string;
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface OlaReverseGeocodeResponse {
  results: Array<{
    formatted_address: string;
    name?: string;
    place_id: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
  status: string;
}

export interface OlaRoutingRoute {
  legs?: Array<{
    distance: number;
    duration: number;
  }>;
  overview_polyline?: string;
  distance?: number;
  duration?: number;
  geometry?: string;
  has_toll?: boolean;
  toll_price?: number;
  weight_name?: string;
  summary?: string;
}

export interface OlaRoutingResponse {
  routes: Array<OlaRoutingRoute>;
  status: string;
}

const directionsCache = new Map<string, OlaRoutingRoute[]>();
const geocodeCache = new Map<string, { name: string; address: string }>();
const autocompleteCache = new Map<string, OlaPrediction[]>();

export const LocationService = {
  autocomplete: async (input: string): Promise<OlaPrediction[]> => {
    try {
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return [];

      if (autocompleteCache.has(trimmed)) {
        return autocompleteCache.get(trimmed)!;
      }

      const response = await olaClient.get('/places/v1/autocomplete', {
        params: { input: trimmed },
      });

      const predictions = response.data.predictions || [];
      autocompleteCache.set(trimmed, predictions);
      return predictions;
    } catch (error) {
      Logger.error('Ola Maps Autocomplete Error:', error);
      return [];
    }
  },

  reverseGeocode: async (
    latitude: number,
    longitude: number,
  ): Promise<{ name: string; address: string }> => {
    // 4 decimal places (~11m) allows adjacent jitter to hit the cache
    const cacheKey = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    if (geocodeCache.has(cacheKey)) {
      return geocodeCache.get(cacheKey)!;
    }

    try {
      const response = await olaClient.get('/places/v1/reverse-geocode', {
        params: {
          latlng: `${latitude},${longitude}`,
        },
      });

      if (response.data.status === 'ok' && response.data.results?.length > 0) {
        const result = response.data.results[0];
        const name = result.name || result.formatted_address.split(',')[0];
        const data = {
          name: name,
          address: result.formatted_address,
        };
        geocodeCache.set(cacheKey, data);
        return data;
      }
      return { name: 'Picked Location', address: '' };
    } catch (error) {
      Logger.error('Ola Maps Reverse Geocode Error:', error);
      return { name: 'Picked Location', address: '' };
    }
  },


  getDirections: async (
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number,
    waypoints?: string,
  ): Promise<OlaRoutingRoute[]> => {
    const cacheKey = `${originLat.toFixed(6)},${originLng.toFixed(
      6,
    )}|${destLat.toFixed(6)},${destLng.toFixed(6)}|${waypoints || ''}`;
    if (directionsCache.has(cacheKey)) {
      return directionsCache.get(cacheKey)!;
    }

    try {
      const response = await olaClient.post('/routing/v1/directions', null, {
        params: {
          origin: `${originLat},${originLng}`,
          destination: `${destLat},${destLng}`,
          waypoints: waypoints || undefined,
          alternatives: true,
          steps: false,
          overview: 'full',
          mode: 'driving',
        },
      });

      if (response.data.status === 'SUCCESS' || response.data.routes) {
        const routes = response.data.routes;
        directionsCache.set(cacheKey, routes);
        return routes;
      }
      return [];
    } catch (error) {
      Logger.error('Ola Maps Directions Error:', error);
      return [];
    }
  },
};
