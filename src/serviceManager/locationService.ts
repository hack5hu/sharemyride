import axios from 'axios';

const OLA_MAPS_BASE_URL = 'https://api.olamaps.io/places/v1';
export const API_KEY = 'LqlaA77D09ngpTaBVVAnHAEsvBycEoGmb76reivs';
export const OLA_TILE_URL = `https://api.olamaps.io/tiles/v1/styles/default-light-standard/{z}/{x}/{y}.png?api_key=${API_KEY}`;
export const OLA_STYLE_URL = `https://api.olamaps.io/tiles/v1/styles/default-light-standard/style.json?api_key=${API_KEY}`;

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
      
      const response = await axios.get(`${OLA_MAPS_BASE_URL}/autocomplete`, {
        params: {
          input,
          api_key: API_KEY,
        },
      });

      return response.data.predictions || [];
    } catch (error) {
      console.error('Ola Maps Autocomplete Error:', error);
      return [];
    }
  },

  reverseGeocode: async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await axios.get(`${OLA_MAPS_BASE_URL}/reverse-geocode`, {
        params: {
          latlng: `${latitude},${longitude}`,
          api_key: API_KEY,
        },
      });

      if (response.data.status === 'ok' && response.data.results?.length > 0) {
        return response.data.results[0].formatted_address;
      }
      return '';
    } catch (error) {
      console.error('Ola Maps Reverse Geocode Error:', error);
      return '';
    }
  },
};
