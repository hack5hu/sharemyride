import olaClient from './olaClient';

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

export const locationService = {
  autocomplete: async (input: string): Promise<OlaPrediction[]> => {
    try {
      if (!input.trim()) return [];
      
      const response = await olaClient.get('/places/v1/autocomplete', {
        params: { input },
      });
      
      return response.data.predictions || [];
    } catch (error) {
      console.error('Ola Maps Autocomplete Error:', error);
      return [];
    }
  },

  reverseGeocode: async (latitude: number, longitude: number): Promise<{ name: string; address: string }> => {
    const cacheKey = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
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
      console.error('Ola Maps Reverse Geocode Error:', error);
      return { name: 'Picked Location', address: '' };
    }
  },

  getDirections: async (
    originLat: number, 
    originLng: number, 
    destLat: number, 
    destLng: number,
    waypoints?: string 
  ): Promise<OlaRoutingRoute[]> => {
    const cacheKey = `${originLat.toFixed(6)},${originLng.toFixed(6)}|${destLat.toFixed(6)},${destLng.toFixed(6)}|${waypoints || ''}`;
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
          mode: 'driving'
        },
      });

      if (response.data.status === 'SUCCESS' || response.data.routes) {
        const routes = response.data.routes;
        directionsCache.set(cacheKey, routes);
        return routes;
      }
      return [];
    } catch (error) {
      console.error('Ola Maps Directions Error:', error);
      return [];
    }
  },
};
