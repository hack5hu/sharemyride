import apiClient from './apiClient';

export interface ProfileUpdateData {
  fullName: string;
  dob: string;
  gender: string;
  profileImage?: { uri: string } | null;
}

export const userService = {
  updateProfile: async (data: ProfileUpdateData) => {
    try {
      const formData = new FormData();

      // Convert DD/MM/YYYY -> YYYY-MM-DD if needed
      let formattedDate = data.dob;
      if (formattedDate && formattedDate.includes('/')) {
        const parts = formattedDate.split('/');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }

      const profilePayload = {
        name: data.fullName,
        date: '2001-01-2000',
        gender: data.gender ? data.gender.toUpperCase() : 'OTHER',
      };

      // We pass it as an object with `string` and `type` so that React Native's FormData
      // adds the `Content-Type: application/json` header for this specific part,
      // avoiding a 415 Unsupported Media Type error from the backend.
      formData.append('profile', {
        string: JSON.stringify(profilePayload),
        type: 'application/json',
      } as any);

      // Append the profile image if selected
      if (data.profileImage?.uri) {
        // The backend expects the key 'file' according to the Postman snippet.
        formData.append('file', {
          uri: data.profileImage.uri,
          type: 'image/jpeg', // A generic type for image
          name: 'profile_image.jpg',
        } as any);
      }

      // API interceptor will automatically wipe 'Content-Type' so RN assigns the boundary.
      const response = await apiClient.post('/user/profile', formData);

      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};
