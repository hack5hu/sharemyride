import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import axiosClient from './axiosClient';

export interface ProfileUpdateData {
  fullName?: string;
  email?: string;
  phone?: string;
  dob?: string | Date;
  gender?: string;
  bio?: string;
  profileImage?: { uri: string } | null;
  avatarUri?: string;
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

export const UserService = {
  getProfile: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.USER.PROFILE);

    return response.data;
  },

  getUserProfile: async (userId: string) => {
    const response = await axiosClient.get(
      `${API_ENDPOINTS.USER.PROFILE}?userId=${userId}`,
    );

    return response.data;
  },

  getVehicles: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.USER.VEHICLES);

    return response.data;
  },

  saveVehicle: async (data: VehiclePayload) => {
    const response = await axiosClient.post(API_ENDPOINTS.USER.VEHICLES, data);

    return response.data;
  },

  updateVehicle: async (id: string, data: VehiclePayload) => {
    const response = await axiosClient.put(
      `${API_ENDPOINTS.USER.VEHICLES}/${id}`,
      data,
    );

    return response.data;
  },

  deleteVehicle: async (id: string) => {
    const response = await axiosClient.delete(
      `${API_ENDPOINTS.USER.VEHICLES}/${id}`,
    );

    return response.data;
  },

  updateProfile: async (data: ProfileUpdateData) => {
    const formData = new FormData();

    if (data.fullName !== undefined) {
      formData.append('name', data.fullName);
    }
    if (data.email !== undefined) {
      formData.append('email', String(data.email));
    }
    if (data.phone !== undefined) {
      formData.append('phoneNumber', String(data.phone).replace(/\s/g, ''));
    }
    if (data.bio !== undefined) {
      formData.append('bio', data.bio);
    }
    if (data.dob !== undefined) {
      let formattedDate = data.dob as string;
      if (typeof data.dob === 'object') {
        formattedDate = data.dob.toISOString().split('T')[0];
      } else if (formattedDate && formattedDate.includes('/')) {
        const parts = formattedDate.split('/');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
      formData.append('date', formattedDate);
    }

    if (data.gender !== undefined) {
      formData.append('gender', data.gender ? data.gender.toUpperCase() : 'OTHER');
    }

    const uri = data.avatarUri || data.profileImage?.uri;
    if (uri) {
      const filename = uri.split('/').pop() || 'avatar.jpg';
      const profilePhoto: ReactNativeFile = {
        uri: uri,
        name: filename,
        type: 'image/jpeg',
      };
      formData.append('file', profilePhoto as unknown as Blob);
      formData.append('profilePhoto', profilePhoto as unknown as Blob);
    }

    const response = await axiosClient.post(
      API_ENDPOINTS.USER.PROFILE,
      formData,
    );

    return response.data;
  },

  uploadProfilePhoto: async (imageUri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile_image.jpg',
    } as unknown as Blob);

    const response = await axiosClient.post(
      API_ENDPOINTS.USER.PROFILE,
      formData,
    );

    return response.data;
  },

  deleteProfilePhoto: async () => {
    const response = await axiosClient.delete(API_ENDPOINTS.USER.DELETE_PHOTO);

    return response.data;
  },

  getUserRatings: async (userId: string) => {
    const response = await axiosClient.get(
      API_ENDPOINTS.RIDE.GET_USER_RATINGS(userId),
    );

    return response.data;
  },

  reportUser: async (payload: {
    reportedUserId: string;
    reason: string;
    description: string;
  }) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.USER.REPORT, payload);

      return response.data;
    } catch (error) {
      console.warn('Report API error:', error);
      throw error;
    }
  },
};
