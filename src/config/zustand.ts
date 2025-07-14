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
  setUser: (user: { name: string; role?: string } | null) => void;
}

const savedToken = sessionStorage.getItem("token");
const savedUser = sessionStorage.getItem("user");

export const useAuthStore = create<AuthState>((set) => ({
  token: savedToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  loginWithGoogle: async (googleIdToken: string) => {
    try {
      const idToken = await googleLogin(googleIdToken); 
      const decoded: DecodedJWT = jwtDecode(idToken);
      const user = {
        name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'Unknown',
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'Unknown',
      };
      set({ token: idToken, user });
      sessionStorage.setItem("token", idToken);
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      set({ token: null, user: null });
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
  },
  logoutUser: async () => {
    await logout();
    set({ token: null, user: null });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  },
  setUser: (user) => {
    set({ user });
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  },
}));