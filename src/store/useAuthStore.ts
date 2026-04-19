import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as Keychain from 'react-native-keychain';
import { mmkvStorage } from '../utils/storage';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
  setAuth: (user: any, token: string, isProfileCompleted?: boolean) => void;
  setProfileCompleted: (value: boolean) => void;
  logout: () => void;
  initialize: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isProfileCompleted: false,
      
      setAuth: (user, token, isProfileCompleted = false) => {
        set({ user, token, isAuthenticated: true, isProfileCompleted });
      },

      setProfileCompleted: (value) => {
        set({ isProfileCompleted: value });
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, isProfileCompleted: false });
      },
      
      initialize: async () => {
        const credentials = await Keychain.getGenericPassword({ service: 'auth_token' });
        if (credentials) {
          set({ 
            token: credentials.password, 
            isAuthenticated: true 
          });
          // Background fetch profile after token is loaded
          useAuthStore.getState().fetchProfile();
        }
      },

      fetchProfile: async () => {
        try {
          const { userService } = require('@/serviceManager/userService');
          const profile = await userService.getProfile();
          if (profile) {
            set((state) => ({
              user: { 
                ...state.user, 
                ...profile,
                name: profile.name,
                dateOfBirth: profile.date, // Map API 'date' to 'dateOfBirth'
                phoneNumber: profile.phoneNumber,
                profilePhotoUrl: profile.profilePhotoUrl,
              },
              isProfileCompleted: !!profile.name && !!profile.date
            }));
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      // We explicitly don't persist tokens in MMKV here; Keychain is the source of truth.
      // But we persist 'token' in state for easy access in UI if needed.
    }
  )
);
