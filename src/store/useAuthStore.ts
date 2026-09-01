import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as Keychain from 'react-native-keychain';
import { mmkvStorage } from '../utils/storage';
import { Logger } from '@/utils/logger';
import { AnalyticsService, AnalyticsEvent } from '@/serviceManager/AnalyticsService';
import { useChatStore } from './useChatStore';
import { initAdminDebugger } from '@/utils/adminDebugger';

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
  admin?: boolean;
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
        const uid = (user?.userId || user?.id) as string;
        if (uid) {
          AnalyticsService.setUser(uid);
          useChatStore.getState().setMyUserId(uid);
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
        initAdminDebugger();
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
            const u = useAuthStore.getState().user;
            const uid = (u?.userId || u?.id) as string;
            if (uid) {
              AnalyticsService.setUser(uid);
              useChatStore.getState().setMyUserId(uid);
            }
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isProfileCompleted: false,
            });
          }
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isProfileCompleted: false,
          });
        } finally {
          set({ isInitializing: false });
        }
      },

      fetchProfile: async () => {
        try {
          const { UserService } = require('@/serviceManager/UserService');
          const profile = await UserService.getProfile();
          if (profile) {
            const isCompleted =
              !!profile.name && !!(profile.date || profile.dateOfBirth);
            set(state => ({
              user: {
                ...state.user,
                ...profile,
                name: profile.name,
                dateOfBirth: profile.date || profile.dateOfBirth,
              },
              isProfileCompleted: isCompleted,
            }));
          }
        } catch (error: any) {
          Logger.error('Failed to fetch profile:', error);
          const errorData = error?.response?.data;
          const status = error?.response?.status;
          const msg = String(
            errorData?.message || errorData?.error || error?.message || '',
          ).toLowerCase();
          if (
            status === 401 ||
            status === 403 ||
            msg.includes('user not found') ||
            msg.includes('user_not_found') ||
            msg.includes('user does not exist') ||
            msg.includes('account deleted') ||
            msg.includes('user deleted')
          ) {
            Logger.warn('[Auth] User not found during fetchProfile. Logging out.');
            useAuthStore.getState().logout();
          }
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
