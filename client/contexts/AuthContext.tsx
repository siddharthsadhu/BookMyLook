import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, ApiResponse } from '@shared/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginRequest & { rememberMe?: boolean }) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Simple storage keys - match OAuthCallback
const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 Checking authentication on app load...');
      const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
      console.log('📋 Stored token:', token ? 'PRESENT' : 'NOT FOUND');

      if (!token) {
        console.log('❌ No token found, user not authenticated');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔄 Calling /api/auth/me to verify token...');
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data: ApiResponse = await response.json();
        console.log('📡 Auth check response:', data);

        if (data.success && data.data) {
          console.log('✅ User authenticated:', data.data);
          setUser(data.data as User);
        } else {
          console.log('❌ Token invalid, clearing storage');
          // Clear invalid tokens
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_KEY);
          sessionStorage.removeItem(TOKEN_KEY);
          sessionStorage.removeItem(REFRESH_KEY);
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        // Clear tokens on error
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_KEY);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginRequest & { rememberMe?: boolean }): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        const { user: userData, accessToken, refreshToken } = data.data as any;
        setUser(userData);

        // Store based on Remember Me preference
        if (credentials.rememberMe) {
          localStorage.setItem(TOKEN_KEY, accessToken);
          localStorage.setItem(REFRESH_KEY, refreshToken);
        } else {
          sessionStorage.setItem(TOKEN_KEY, accessToken);
          sessionStorage.setItem(REFRESH_KEY, refreshToken);
        }

        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (userData: RegisterRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        const { user: userData, accessToken, refreshToken } = data.data as any;
        setUser(userData);

        // New registrations don't remember by default
        sessionStorage.setItem(TOKEN_KEY, accessToken);
        sessionStorage.setItem(REFRESH_KEY, refreshToken);

        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_KEY);
    }
  };

  const refreshUser = async (): Promise<void> => {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (!token) return;

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        setUser(data.data as User);
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      await logout();
    }
  };

  const refreshAuth = async (): Promise<void> => {
    console.log('🔄 Manually refreshing authentication state...');
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    if (!token) {
      console.log('❌ No token found during manual refresh');
      setUser(null);
      return;
    }

    try {
      console.log('🔄 Calling /api/auth/me during manual refresh...');
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data: ApiResponse = await response.json();
      console.log('📡 Manual auth refresh response:', data);

      if (data.success && data.data) {
        console.log('✅ User authenticated during manual refresh:', data.data);
        setUser(data.data as User);
      } else {
        console.log('❌ Token invalid during manual refresh');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Manual auth refresh failed:', error);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    refreshAuth,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
