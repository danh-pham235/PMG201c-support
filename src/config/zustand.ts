import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { googleLogin, logout } from '../services/authService';

interface DecodedJWT {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
}

interface AuthState {
  token: string | null;
  user: { name: string; role?: string } | null; 
  loginWithGoogle: (googleIdToken: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  setUser: (user: { name: string; role?: string }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  loginWithGoogle: async (googleIdToken: string) => {
    try {
      const idToken = await googleLogin(googleIdToken); 
      const decoded: DecodedJWT = jwtDecode(idToken);
      const user = {
        name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'Unknown',
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'Unknown', // Lấy role
      };
      set({ token: idToken, user });
    } catch (error) {
      console.error('Login error:', error);
      set({ token: null, user: null });
    }
  },
  logoutUser: async () => {
    await logout();
    set({ token: null, user: null });
  },
  setUser: (user) => set({ user }),
}));