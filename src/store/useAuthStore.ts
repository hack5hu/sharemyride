import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as Keychain from 'react-native-keychain';
import { mmkvStorage } from '../utils/storage';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  setAuth: (user: any, token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      setAuth: async (user, token) => {
        await Keychain.setGenericPassword('auth_token', token);
        set({ user, token, isAuthenticated: true });
      },
      
      logout: async () => {
        await Keychain.resetGenericPassword();
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      initialize: async () => {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          set({ 
            token: credentials.password, 
            isAuthenticated: true 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
