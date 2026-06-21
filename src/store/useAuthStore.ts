import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as Keychain from 'react-native-keychain';
import { mmkvStorage } from '../utils/storage';
import { Logger } from '@/utils/logger';
import { AnalyticsService, AnalyticsEvent } from '@/serviceManager/AnalyticsService';

interface AuthUser {
  id?: string;
  userId?: string;
  phone?: string;
  name?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  profilePhotoUrl?: string;
  gender?: string;
  bio?: string;
  [key: string]: unknown;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
  isInitializing: boolean;
  setAuth: (
    user: AuthUser,
    token: string,
    isProfileCompleted?: boolean,
  ) => void;
  setProfileCompleted: (value: boolean) => void;
  logout: () => void;
  initialize: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isProfileCompleted: false,
      isInitializing: true,

      setAuth: (user, token, isProfileCompleted = false) => {
        set({ user, token, isAuthenticated: true, isProfileCompleted });
        if (user?.userId || user?.id) {
          AnalyticsService.setUser((user.userId || user.id) as string);
        }
      },

      setProfileCompleted: value => {
        set({ isProfileCompleted: value });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isProfileCompleted: false,
        });
        AnalyticsService.clearUser();
        AnalyticsService.logEvent(AnalyticsEvent.USER_LOGOUT);
        try {
          const { resetAllStores } = require('./resetAllStores');
          resetAllStores();
        } catch (error) {
          Logger.error('Failed to reset all stores in auth logout:', error);
        }
      },

      initialize: async () => {
        const startTime = Date.now();
        try {
          const credentials = await Keychain.getGenericPassword({
            service: 'auth_token',
          });
          if (credentials && credentials.password) {
            set({
              token: credentials.password,
              isAuthenticated: true,
            });
            if (useAuthStore.getState().isProfileCompleted) {
              useAuthStore.getState().fetchProfile();
            }
            if (useAuthStore.getState().user) {
              const u = useAuthStore.getState().user;
              if (u?.userId || u?.id) AnalyticsService.setUser((u.userId || u.id) as string);
            }
          } else {
            // No valid token in keychain — clear any stale persisted state
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isProfileCompleted: false,
            });
          }
        } catch {
          // Keychain error: treat as logged out
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isProfileCompleted: false,
          });
        } finally {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 1500 - elapsedTime);
          if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime));
          }
          set({ isInitializing: false });
        }
      },

      fetchProfile: async () => {
        try {
          const { UserService } = require('@/serviceManager/UserService');
          const profile = await UserService.getProfile();
          if (profile) {
            const currentUser = useAuthStore.getState().user;
            const isProfileCompleted =
              !!profile.name && !!(profile.date || profile.dateOfBirth);

            const isIdentical =
              currentUser &&
              currentUser.name === profile.name &&
              currentUser.dateOfBirth ===
                (profile.date || profile.dateOfBirth) &&
              currentUser.phoneNumber === profile.phoneNumber &&
              currentUser.profilePhotoUrl === profile.profilePhotoUrl &&
              currentUser.gender === profile.gender &&
              currentUser.bio === profile.bio &&
              useAuthStore.getState().isProfileCompleted === isProfileCompleted;

            if (!isIdentical) {
              set(state => ({
                user: {
                  ...state.user,
                  ...profile,
                  name: profile.name,
                  dateOfBirth: profile.date || profile.dateOfBirth,
                  phoneNumber: profile.phoneNumber,
                  profilePhotoUrl: profile.profilePhotoUrl,
                },
                isProfileCompleted,
              }));
            }
          }
        } catch (error) {
          Logger.error('Failed to fetch profile:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isProfileCompleted: state.isProfileCompleted,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<AuthState>),
        token: null,
      }),
    },
  ),
);
