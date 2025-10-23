import React, { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface RealTimeContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'reconnecting';
  subscribeToSalon: (salonId: string) => void;
  unsubscribeFromSalon: (salonId: string) => void;
}

const RealTimeContext = createContext<RealTimeContextType | null>(null);

export function RealTimeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'reconnecting'>('disconnected');
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('bookmylook_token');

      // Try to detect the server port - use environment variable or default to 3001
      const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      console.log('🔌 Attempting to connect to real-time server at:', serverUrl);
      console.log('🔑 Authentication token present:', !!token);

      setConnectionStatus('connecting');

      // Create socket connection with enhanced error handling
      const socket = io(serverUrl, {
        auth: {
          token: token || undefined
        },
        transports: ['websocket', 'polling'],
        autoConnect: true,
        timeout: 20000, // Increased timeout for slower connections
        forceNew: false,
        reconnection: true,
        reconnectionAttempts: maxReconnectAttempts,
        reconnectionDelay: 2000, // Increased delay
        reconnectionDelayMax: 10000,
        randomizationFactor: 0.5,
        upgrade: true,
        rememberUpgrade: true
      });

      socketRef.current = socket;

      // Enhanced connection event handlers
      socket.on('connect', () => {
        console.log('✅ Successfully connected to real-time server');
        setIsConnected(true);
        setConnectionStatus('connected');
        reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
      });

      socket.on('disconnect', (reason) => {
        console.log('🔌 Disconnected from real-time server:', reason);
        setIsConnected(false);

        // Handle different disconnect reasons
        if (reason === 'io server disconnect') {
          console.log('🔌 Server initiated disconnect');
          setConnectionStatus('disconnected');
        } else if (reason === 'io client disconnect') {
          console.log('🔌 Client initiated disconnect');
          setConnectionStatus('disconnected');
        } else {
          console.log('🔌 Connection lost, attempting to reconnect...');
          setConnectionStatus('reconnecting');
        }
      });

      socket.on('connect_error', (error) => {
        console.error('❌ Connection error:', error.message);
        setIsConnected(false);
        setConnectionStatus('reconnecting');
        reconnectAttempts.current++;

        // Log more details for debugging
        if (error.message.includes('Authentication')) {
          console.warn('🔐 Authentication failed. This is normal if not logged in.');
        } else if (error.message.includes('timeout')) {
          console.warn('⏱️ Connection timeout. Server may not be running.');
        } else {
          console.warn('🔌 Network or server error:', error.message);
        }

        if (reconnectAttempts.current >= maxReconnectAttempts) {
          console.error('🔌 Max reconnection attempts reached, giving up');
          setConnectionStatus('disconnected');
        }
      });

      socket.on('reconnect', (attemptNumber) => {
        console.log(`🔄 Reconnected to real-time server after ${attemptNumber} attempts`);
        setIsConnected(true);
        setConnectionStatus('connected');
        reconnectAttempts.current = 0;
      });

      socket.on('reconnect_error', (error) => {
        console.error('🔄 Reconnection failed:', error.message);
        setConnectionStatus('reconnecting');
      });

      socket.on('reconnect_failed', () => {
        console.error('🔌 Failed to reconnect after maximum attempts');
        setConnectionStatus('disconnected');
      });

      // Listen for booking events
      socket.on('booking:created', (data) => {
        console.log('📡 Booking created:', data);
        // Dispatch custom event for React components to listen to
        window.dispatchEvent(new CustomEvent('bookingCreated', { detail: data }));
      });

      socket.on('booking:updated', (data) => {
        console.log('📡 Booking updated:', data);
        window.dispatchEvent(new CustomEvent('bookingUpdated', { detail: data }));
      });

      socket.on('booking:cancelled', (data) => {
        console.log('📡 Booking cancelled:', data);
        window.dispatchEvent(new CustomEvent('bookingCancelled', { detail: data }));
      });

      // Cleanup on unmount
      return () => {
        console.log('🔌 Cleaning up socket connection');
        if (socket) {
          socket.disconnect();
        }
        socketRef.current = null;
      };
    } catch (error) {
      console.error('❌ Failed to initialize real-time connection:', error);
      // Allow app to continue without real-time features
      setIsConnected(false);
      setConnectionStatus('disconnected');
    }
  }, []); // No dependencies - socket is created once

  // Update user rooms when user changes
  useEffect(() => {
    if (!socketRef.current || !isConnected) return;

    // The server handles room joining automatically based on authentication
    console.log('👤 Real-time user updated:', user?.email || 'Anonymous');
  }, [user, isConnected]);

  const subscribeToSalon = (salonId: string) => {
    if (socketRef.current && isConnected) {
      try {
        socketRef.current.emit('subscribe_to_salon', salonId);
      } catch (error) {
        console.error('Failed to subscribe to salon:', error);
      }
    }
  };

  const unsubscribeFromSalon = (salonId: string) => {
    if (socketRef.current && isConnected) {
      try {
        socketRef.current.emit('unsubscribe_from_salon', salonId);
      } catch (error) {
        console.error('Failed to unsubscribe from salon:', error);
      }
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
