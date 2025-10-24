import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface RealTimeContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'reconnecting';
  subscribeToSalon: (salonId: string) => void;
  unsubscribeFromSalon: (salonId: string) => void;
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

export function RealTimeProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'reconnecting'>('disconnected');
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // Get current token (same logic as AuthContext)
  const getCurrentToken = (): string | null => {
    return localStorage.getItem('bookmylook_token') || sessionStorage.getItem('bookmylook_token');
  };

  // Connect to WebSocket when user is authenticated
  useEffect(() => {
    // Wait for authentication to complete
    if (isLoading) return;

    const token = getCurrentToken();

    // If user is authenticated and we have a token, connect
    if (isAuthenticated && token) {
      console.log('🔌 Connecting to real-time server...');

      setConnectionStatus('connecting');

      const socket = io('http://localhost:3001', {
        auth: { token },
        transports: ['websocket', 'polling']
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('✅ Connected to real-time server');
        setIsConnected(true);
        setConnectionStatus('connected');
        reconnectAttempts.current = 0;
      });

      socket.on('disconnect', () => {
        console.log('🔌 Disconnected from real-time server');
        setIsConnected(false);
        setConnectionStatus('disconnected');
      });

      socket.on('connect_error', (error) => {
        console.error('❌ WebSocket connection error:', error.message);
        setIsConnected(false);
        setConnectionStatus('disconnected');
      });

      // Listen for events
      socket.on('booking:created', (data) => {
        window.dispatchEvent(new CustomEvent('bookingCreated', { detail: data }));
      });

      socket.on('booking:updated', (data) => {
        window.dispatchEvent(new CustomEvent('bookingUpdated', { detail: data }));
      });

      socket.on('booking:cancelled', (data) => {
        window.dispatchEvent(new CustomEvent('bookingCancelled', { detail: data }));
      });

    } else if (!isAuthenticated) {
      // User logged out, disconnect socket
      if (socketRef.current) {
        console.log('🔌 Disconnecting real-time server (user logged out)');
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
        setConnectionStatus('disconnected');
      }
    }

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isAuthenticated, isLoading]);

  // Update user rooms when user changes
  useEffect(() => {
    if (socketRef.current && isConnected && user) {
      console.log('👤 Real-time user updated:', user.email);
    }
  }, [user, isConnected]);

  const subscribeToSalon = (salonId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('subscribe_to_salon', salonId);
    }
  };

  const unsubscribeFromSalon = (salonId: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('unsubscribe_from_salon', salonId);
    }
  };

  const value = {
    socket: socketRef.current,
    isConnected,
    connectionStatus,
    subscribeToSalon,
    unsubscribeFromSalon
  };

  return (
    <RealTimeContext.Provider value={value}>
      {children}
    </RealTimeContext.Provider>
  );
}

export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
}
