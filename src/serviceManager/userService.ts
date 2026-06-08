import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import apiClient from './apiClient';
import { Logger } from '@/utils/logger';

export interface ProfileUpdateData {
  fullName: string;
  dob: string;
  gender: string;
  profileImage?: { uri: string } | null;
}

interface ReactNativeFile {
  uri: string;
  type: string;
  name: string;
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

      formData.append('name', data.fullName);
      formData.append('date', formattedDate);
      formData.append('gender', data.gender ? data.gender.toUpperCase() : 'OTHER');

      if (data.profileImage?.uri) {
        formData.append('file', {
          uri: data.profileImage.uri,
          type: 'image/jpeg',
          name: 'profile_image.jpg',
        } as unknown as Blob);
      } else if (data.profileImage === null) {
        // Explicitly send empty file to tell backend to remove it
        formData.append('file', '');
      }

      const response = await apiClient.post(API_ENDPOINTS.USER.PROFILE, formData);
      return response.data;
    } catch (error) {
      Logger.error('Error updating profile:', error);
      throw error;
    }
  },
};

