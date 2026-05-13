import * as Keychain from 'react-native-keychain';
import { BASE_URL, API_ENDPOINTS } from '@/constants/apiEndpoints';
import apiClient from './apiClient';

export interface ProfileUpdateData {
  fullName: string;
  dob: string;
  gender: string;
  profileImage?: { uri: string } | null;
}

export interface VehiclePayload {
  vehicleNumber: string;
  vehicleTypeId: number;
  company: string;
  model: string;
  color: string;
}

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },

  getUserProfile: async (userId: string) => {
    const response = await apiClient.get(`${API_ENDPOINTS.USER.PROFILE}?userId=${userId}`);
    return response.data;
  },

  getVehicles: async () => {
    const response = await apiClient.get(API_ENDPOINTS.USER.VEHICLES);
    return response.data;
  },

  saveVehicle: async (data: VehiclePayload) => {
    const response = await apiClient.post(API_ENDPOINTS.USER.VEHICLES, data);
    return response.data;
  },

  updateVehicle: async (id: string, data: VehiclePayload) => {
    const response = await apiClient.put(`${API_ENDPOINTS.USER.VEHICLES}/${id}`, data);
    return response.data;
  },

  deleteVehicle: async (id: string) => {
    const response = await apiClient.delete(`${API_ENDPOINTS.USER.VEHICLES}/${id}`);
    return response.data;
  },

  updateProfile: async (data: ProfileUpdateData) => {
    try {
      const formData = new FormData();

      // Convert DD/MM/YYYY -> YYYY-MM-DD
      let formattedDate = data.dob;
      if (formattedDate && formattedDate.includes('/')) {
        const parts = formattedDate.split('/');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }

      // Appending as separate strings as confirmed working for the backend
      formData.append('name', data.fullName);
      formData.append('date', formattedDate);
      formData.append('gender', data.gender ? data.gender.toUpperCase() : 'OTHER');

      // Append the profile image if selected
      if (data.profileImage?.uri) {
        formData.append('file', {
          uri: data.profileImage.uri,
          type: 'image/jpeg',
          name: 'profile_image.jpg',
        } as any);
      }

      const credentials = await Keychain.getGenericPassword({ service: 'auth_token' });
      if (!credentials) {
        throw new Error('No authentication token found');
      }

      // Using native fetch for reliable multipart/form-data boundary generation in RN
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.USER.PROFILE}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${credentials.password}`,
          // Note: Content-Type is omitted so fetch automatically adds boundary
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Server Error ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};
