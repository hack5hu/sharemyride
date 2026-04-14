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
    try {
      const response = await olaClient.get('/places/v1/reverse-geocode', {
        params: {
          latlng: `${latitude},${longitude}`,
        },
      });

      if (response.data.status === 'ok' && response.data.results?.length > 0) {
        const result = response.data.results[0];
        // Capture specific name if available, otherwise fallback to neighborhood/first part of address
        const name = result.name || result.formatted_address.split(',')[0];
        
        return {
          name: name,
          address: result.formatted_address,
        };
      }
      return { name: 'Picked Location', address: '' };
    } catch (error) {
      console.error('Ola Maps Reverse Geocode Error:', error);
      return { name: 'Picked Location', address: '' };
    }
  },
};
