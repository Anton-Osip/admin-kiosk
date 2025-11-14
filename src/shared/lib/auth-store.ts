import { create } from 'zustand';

import { authAPI, LoginRequest, LoginResponse } from '@/shared/api';

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: LoginResponse | null;
  
  login: (credentials: LoginRequest) => Promise<void>;
  checkAuthStatus: () => void;
}

// Функция для проверки cookie
const checkConnectSidCookie = (): boolean => {
  const cookies = document.cookie.split(';');
  const connectSidCookie = cookies.find(cookie => 
    cookie.trim().startsWith('connect.sid=')
  );

  return !!connectSidCookie;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  user: null,

  login: async (credentials: LoginRequest) => {
    try {
      set({ isLoading: true });
      const response = await authAPI.login(credentials);
      const user = response.data?.data as LoginResponse;

      set({
        isAuthenticated: true,
        isLoading: false,
        user: user || null,
      });
    } catch (err: unknown) {
      console.error('[AuthStore] Ошибка авторизации:', err);
      set({ isLoading: false });
    }
  },

  checkAuthStatus: () => {
    const hasCookie = checkConnectSidCookie();
    set({ isAuthenticated: hasCookie });
  },
}));

