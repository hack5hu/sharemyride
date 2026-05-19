import apiClient from './apiClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Logger } from '@/utils/logger';

export interface ProfileUpdateData {
  fullName: string;
  email: string;
  phone: string;
  dob: Date | string;
  gender: string;
  bio?: string;
  avatarUri?: string;
}

interface ReactNativeFile {
  uri: string;
  type: string;
  name: string;
}

export const profileService = {
  updateProfile: async (data: ProfileUpdateData) => {
    try {
      const formData = new FormData();
      
      // Map all fields to FormData
      formData.append('name', String(data.fullName || ''));
      formData.append('email', String(data.email || ''));
      formData.append('phoneNumber', String(data.phone || '').replace(/\s/g, '')); // Remove spaces
      formData.append('gender', String(data.gender || 'male').toUpperCase());
      
      if (data.bio) {
        formData.append('bio', data.bio);
      }
      
      if (data.dob) {
        const dateStr = typeof data.dob === 'object' ? data.dob.toISOString().split('T')[0] : data.dob;
        formData.append('date', dateStr);
      }
      
      // Handle avatar file if it's a local URI (file:// or content://)
      const uri = data.avatarUri;
      if (uri && (uri.startsWith('file://') || uri.startsWith('content://'))) {
        const filename = uri.split('/').pop() || 'avatar.jpg';
        const profilePhoto: ReactNativeFile = {
          uri: uri,
          name: filename,
          type: 'image/jpeg',
        };
        formData.append('profilePhoto', profilePhoto as unknown as Blob);
      }

      const response = await apiClient.post(API_ENDPOINTS.USER.PROFILE, formData);
      return response.data;
    } catch (error) {
      Logger.error('[ProfileService] Update failed:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
