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
  updateProfile: async (data: Partial<ProfileUpdateData>) => {
    try {
      const formData = new FormData();
      
      // Map only provided fields to FormData
      if (data.fullName !== undefined) {
        formData.append('name', String(data.fullName));
      }
      if (data.email !== undefined) {
        formData.append('email', String(data.email));
      }
      if (data.phone !== undefined) {
        formData.append('phoneNumber', String(data.phone).replace(/\s/g, ''));
      }
      if (data.gender !== undefined) {
        formData.append('gender', String(data.gender).toUpperCase());
      }
      if (data.bio !== undefined) {
        formData.append('bio', data.bio);
      }
      if (data.dob !== undefined) {
        const dateStr = typeof data.dob === 'object' ? data.dob.toISOString().split('T')[0] : data.dob;
        formData.append('date', dateStr);
      }
      if (data.avatarUri !== undefined) {
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
