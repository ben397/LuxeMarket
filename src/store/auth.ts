import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { users, mockCredentials } from '../data/users';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate network request
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if credentials match mock user
          if (email === mockCredentials.user.email && password === mockCredentials.user.password) {
            set({ user: users[0], isLoading: false });
            return;
          }
          
          // Check if credentials match mock admin
          if (email === mockCredentials.admin.email && password === mockCredentials.admin.password) {
            set({ user: users.find(u => u.role === 'admin') || null, isLoading: false });
            return;
          }
          
          // If no match found, set error
          set({ error: 'Invalid email or password', isLoading: false });
        } catch (error) {
          set({ error: 'An error occurred during login', isLoading: false });
        }
      },
      
      logout: () => {
        set({ user: null, error: null });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);