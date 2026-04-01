import apiClient from './apiClient';

export interface ProfileUpdateData {
  fullName: string;
  email: string;
  phone: string;
  dob: Date | string;
  gender: string;
  bio?: string;
  avatarUri?: string;
}

export const profileService = {
  updateProfile: async (data: ProfileUpdateData) => {
    try {
      const response = await apiClient.patch('/user/profile', data);
      return response.data;
    } catch (error) {
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
