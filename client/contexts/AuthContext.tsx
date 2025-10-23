import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, ApiResponse } from '@shared/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('bookmylook_token');
      const rememberMe = localStorage.getItem('bookmylook_remember');
      const rememberUntil = localStorage.getItem('bookmylook_remember_until');

      // Check if we have a remember me session that's still valid
      if (rememberMe === 'true' && rememberUntil) {
        const rememberUntilDate = parseInt(rememberUntil);
        if (Date.now() > rememberUntilDate) {
          // Remember me session expired, clean up
          localStorage.removeItem('bookmylook_remember');
          localStorage.removeItem('bookmylook_remember_until');
          localStorage.removeItem('bookmylook_token');
          localStorage.removeItem('bookmylook_refresh_token');
          setIsLoading(false);
          return;
        }
      }

      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          const data: ApiResponse = await response.json();

          if (data.success && data.data) {
            setUser(data.data as User);
          } else {
            // Token invalid, clear it
            localStorage.removeItem('bookmylook_token');
            localStorage.removeItem('bookmylook_refresh_token');
            // Don't clear remember me settings unless the session has expired
            if (rememberMe !== 'true' || (rememberUntil && Date.now() > parseInt(rememberUntil))) {
              localStorage.removeItem('bookmylook_remember');
              localStorage.removeItem('bookmylook_remember_until');
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('bookmylook_token');
          localStorage.removeItem('bookmylook_refresh_token');
          // Keep remember me settings for retry
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginRequest & { rememberMe?: boolean }): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
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

        // Store tokens
        localStorage.setItem('bookmylook_token', accessToken);
        localStorage.setItem('bookmylook_refresh_token', refreshToken);

        // Store remember me preference for session management
        if (credentials.rememberMe) {
          localStorage.setItem('bookmylook_remember', 'true');
          localStorage.setItem('bookmylook_remember_until', String(Date.now() + (30 * 24 * 60 * 60 * 1000))); // 30 days
        } else {
          localStorage.removeItem('bookmylook_remember');
          localStorage.removeItem('bookmylook_remember_until');
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
      const response = await fetch('http://localhost:3001/api/auth/register', {
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

        // Store tokens
        localStorage.setItem('bookmylook_token', accessToken);
        localStorage.setItem('bookmylook_refresh_token', refreshToken);

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
      // Call logout endpoint
      await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('bookmylook_token')}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local state and storage regardless of API call result
      setUser(null);
      localStorage.removeItem('bookmylook_token');
      localStorage.removeItem('bookmylook_refresh_token');
      // Clear remember me settings on logout
      localStorage.removeItem('bookmylook_remember');
      localStorage.removeItem('bookmylook_remember_until');
    }
  };

  const refreshUser = async (): Promise<void> => {
    const token = localStorage.getItem('bookmylook_token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        setUser(data.data as User);
      } else {
        // Token invalid
        await logout();
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
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
