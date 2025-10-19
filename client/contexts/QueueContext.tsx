import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { QueueEntry, QueueStats, QueueUpdate, CreateQueueEntryRequest, UpdateQueueEntryRequest } from '@shared/api';

// Queue State Interface
interface QueueState {
  entries: { [salonId: string]: QueueEntry[] };
  stats: { [salonId: string]: QueueStats };
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

// Queue Actions
type QueueAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ENTRIES'; payload: { salonId: string; entries: QueueEntry[] } }
  | { type: 'SET_STATS'; payload: { salonId: string; stats: QueueStats } }
  | { type: 'ADD_ENTRY'; payload: QueueEntry }
  | { type: 'UPDATE_ENTRY'; payload: { salonId: string; entryId: string; updates: Partial<QueueEntry> } }
  | { type: 'REMOVE_ENTRY'; payload: { salonId: string; entryId: string } }
  | { type: 'UPDATE_POSITIONS'; payload: { salonId: string; entries: QueueEntry[] } };

// Initial State
const initialState: QueueState = {
  entries: {},
  stats: {},
  loading: false,
  error: null,
  lastUpdate: null,
};

// Queue Reducer
function queueReducer(state: QueueState, action: QueueAction): QueueState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_ENTRIES':
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.salonId]: action.payload.entries,
        },
        lastUpdate: new Date(),
        loading: false,
        error: null,
      };

    case 'SET_STATS':
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload.salonId]: action.payload.stats,
        },
        lastUpdate: new Date(),
      };

    case 'ADD_ENTRY':
      const salonId = action.payload.salonId;
      const currentEntries = state.entries[salonId] || [];
      return {
        ...state,
        entries: {
          ...state.entries,
          [salonId]: [...currentEntries, action.payload],
        },
        lastUpdate: new Date(),
      };

    case 'UPDATE_ENTRY':
      const { salonId: updateSalonId, entryId, updates } = action.payload;
      const salonEntries = state.entries[updateSalonId] || [];
      return {
        ...state,
        entries: {
          ...state.entries,
          [updateSalonId]: salonEntries.map(entry =>
            entry.id === entryId ? { ...entry, ...updates } : entry
          ),
        },
        lastUpdate: new Date(),
      };

    case 'REMOVE_ENTRY':
      const { salonId: removeSalonId, entryId: removeEntryId } = action.payload;
      const removeSalonEntries = state.entries[removeSalonId] || [];
      return {
        ...state,
        entries: {
          ...state.entries,
          [removeSalonId]: removeSalonEntries.filter(entry => entry.id !== removeEntryId),
        },
        lastUpdate: new Date(),
      };

    case 'UPDATE_POSITIONS':
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.salonId]: action.payload.entries,
        },
        lastUpdate: new Date(),
      };

    default:
      return state;
  }
}

// Queue Context
const QueueContext = createContext<{
  state: QueueState;
  dispatch: React.Dispatch<QueueAction>;
  // Action creators
  addToQueue: (request: CreateQueueEntryRequest) => void;
  updateQueueEntry: (salonId: string, entryId: string, updates: UpdateQueueEntryRequest) => void;
  removeFromQueue: (salonId: string, entryId: string) => void;
  refreshQueue: (salonId: string) => void;
  getQueueForSalon: (salonId: string) => QueueEntry[];
  getQueueStats: (salonId: string) => QueueStats | null;
} | null>(null);

// Queue Provider Component
export function QueueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(queueReducer, initialState);
  const demoDataLoadedRef = React.useRef(false);

  // Initialize demo data
  useEffect(() => {
    // Prevent multiple demo data loads
    if (demoDataLoadedRef.current) {
      return;
    }

    const salon1Id = 'salon_gentleman_zone';
    const salon2Id = 'salon_style_studio';

    const now = new Date();

    // Clear any existing demo data first
    dispatch({ type: 'SET_ENTRIES', payload: { salonId: salon1Id, entries: [] } });
    dispatch({ type: 'SET_ENTRIES', payload: { salonId: salon2Id, entries: [] } });

    // Demo queue entries for Salon 1: The Gentlemen's Zone
    const salon1Entries: QueueEntry[] = [
      {
        id: 'queue_gentleman_1',
        salonId: salon1Id,
        bookingId: 'BML-GZ-001',
        customerName: 'Arjun Sharma',
        customerPhone: '+91 98765 43210',
        serviceName: 'Hair Cut & Styling',
        serviceId: 'service_haircut',
        position: 1,
        totalInQueue: 2,
        estimatedTime: '3:15 PM',
        estimatedWaitMinutes: 15,
        status: 'WAITING',
        joinedAt: new Date(now.getTime() - 5 * 60000),
        calledAt: null,
        startedAt: null,
        completedAt: null,
        notes: 'Wants modern fade haircut'
      },
      {
        id: 'queue_gentleman_2',
        salonId: salon1Id,
        bookingId: 'BML-GZ-002',
        customerName: 'Vikram Singh',
        customerPhone: '+91 98765 43211',
        serviceName: 'Beard Grooming',
        serviceId: 'service_beard',
        position: 2,
        totalInQueue: 2,
        estimatedTime: '3:30 PM',
        estimatedWaitMinutes: 30,
        status: 'WAITING',
        joinedAt: new Date(now.getTime() - 2 * 60000),
        calledAt: null,
        startedAt: null,
        completedAt: null,
        notes: 'Full beard trim and styling'
      }
    ];

    // Demo queue entries for Salon 2: Style Studio
    const salon2Entries: QueueEntry[] = [
      {
        id: 'queue_studio_1',
        salonId: salon2Id,
        bookingId: 'BML-SS-001',
        customerName: 'Priya Gupta',
        customerPhone: '+91 98765 43212',
        serviceName: 'Hair Spa Treatment',
        serviceId: 'service_spa',
        position: 1,
        totalInQueue: 3,
        estimatedTime: '3:20 PM',
        estimatedWaitMinutes: 15,
        status: 'WAITING',
        joinedAt: new Date(now.getTime() - 8 * 60000),
        calledAt: null,
        startedAt: null,
        completedAt: null,
        notes: 'Deep conditioning hair spa'
      },
      {
        id: 'queue_studio_2',
        salonId: salon2Id,
        bookingId: 'BML-SS-002',
        customerName: 'Ananya Patel',
        customerPhone: '+91 98765 43213',
        serviceName: 'Facial Treatment',
        serviceId: 'service_facial',
        position: 2,
        totalInQueue: 3,
        estimatedTime: '3:35 PM',
        estimatedWaitMinutes: 30,
        status: 'WAITING',
        joinedAt: new Date(now.getTime() - 4 * 60000),
        calledAt: null,
        startedAt: null,
        completedAt: null,
        notes: 'Anti-aging facial treatment'
      },
      {
        id: 'queue_studio_3',
        salonId: salon2Id,
        bookingId: 'BML-SS-003',
        customerName: 'Kavita Joshi',
        customerPhone: '+91 98765 43214',
        serviceName: 'Manicure & Pedicure',
        serviceId: 'service_nails',
        position: 3,
        totalInQueue: 3,
        estimatedTime: '3:50 PM',
        estimatedWaitMinutes: 45,
        status: 'WAITING',
        joinedAt: new Date(now.getTime() - 1 * 60000),
        calledAt: null,
        startedAt: null,
        completedAt: null,
        notes: 'Gel manicure and pedicure'
      }
    ];

    // Add all demo entries to state
    [...salon1Entries, ...salon2Entries].forEach(entry => {
      dispatch({ type: 'ADD_ENTRY', payload: entry });
    });

    // Add stats for both salons
    const salon1Stats: QueueStats = {
      salonId: salon1Id,
      totalWaiting: 2,
      totalInService: 0,
      totalCompleted: 0,
      averageWaitTime: 23,
      nextCustomerEstimatedTime: '3:15 PM',
      peakHours: ['10:00-12:00', '17:00-19:00'],
    };

    const salon2Stats: QueueStats = {
      salonId: salon2Id,
      totalWaiting: 3,
      totalInService: 0,
      totalCompleted: 0,
      averageWaitTime: 30,
      nextCustomerEstimatedTime: '3:20 PM',
      peakHours: ['11:00-13:00', '14:00-16:00'],
    };

    dispatch({ type: 'SET_STATS', payload: { salonId: salon1Id, stats: salon1Stats } });
    dispatch({ type: 'SET_STATS', payload: { salonId: salon2Id, stats: salon2Stats } });

    // Mark demo data as loaded
    demoDataLoadedRef.current = true;

    console.info('🎯 Demo queue data for 2 salons loaded successfully!');
  }, []); // Only run once on mount

  // Mock queue service functions (in a real app, these would call APIs)
  const addToQueue = async (request: CreateQueueEntryRequest) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Calculate position and estimated time
      const salonEntries = state.entries[request.salonId] || [];
      const position = salonEntries.length + 1;
      const estimatedWaitMinutes = position * 15; // 15 minutes per customer
      const now = new Date();
      const estimatedTime = new Date(now.getTime() + estimatedWaitMinutes * 60000);

      const newEntry: QueueEntry = {
        id: `queue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        salonId: request.salonId,
        bookingId: request.bookingId,
        customerName: request.customerName,
        customerPhone: request.customerPhone,
        serviceName: request.serviceName,
        serviceId: request.serviceId,
        position,
        totalInQueue: position,
        estimatedTime: estimatedTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        estimatedWaitMinutes,
        status: 'WAITING',
        joinedAt: now,
        calledAt: null,
        startedAt: null,
        completedAt: null,
        notes: request.notes,
      };

      dispatch({ type: 'ADD_ENTRY', payload: newEntry });

      // Update stats
      const stats: QueueStats = {
        salonId: request.salonId,
        totalWaiting: salonEntries.filter(e => e.status === 'WAITING').length + 1,
        totalInService: salonEntries.filter(e => e.status === 'IN_SERVICE').length,
        totalCompleted: salonEntries.filter(e => e.status === 'COMPLETED').length,
        averageWaitTime: 15,
        nextCustomerEstimatedTime: newEntry.estimatedTime,
        peakHours: ['09:00-11:00', '14:00-16:00'],
      };

      dispatch({ type: 'SET_STATS', payload: { salonId: request.salonId, stats } });

      console.info(`✅ Added ${request.customerName} to queue at position ${position}`);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add to queue' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQueueEntry = async (salonId: string, entryId: string, updates: UpdateQueueEntryRequest) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const updateData: Partial<QueueEntry> = {};

      if (updates.status) {
        updateData.status = updates.status;
        if (updates.status === 'CALLED') {
          updateData.calledAt = new Date();
        } else if (updates.status === 'IN_SERVICE') {
          updateData.startedAt = new Date();
        } else if (updates.status === 'COMPLETED') {
          updateData.completedAt = new Date();
        }
      }

      if (updates.notes !== undefined) {
        updateData.notes = updates.notes;
      }

      dispatch({ type: 'UPDATE_ENTRY', payload: { salonId, entryId, updates: updateData } });

      // If status changed to completed, recalculate positions
      if (updates.status === 'COMPLETED') {
        const salonEntries = state.entries[salonId] || [];
        const updatedEntries = salonEntries
          .filter(entry => entry.id !== entryId && entry.status === 'WAITING')
          .map((entry, index) => ({
            ...entry,
            position: index + 1,
            totalInQueue: salonEntries.filter(e => e.status === 'WAITING').length - 1,
            estimatedWaitMinutes: (index + 1) * 15,
          }));

        dispatch({ type: 'UPDATE_POSITIONS', payload: { salonId, entries: updatedEntries } });
      }

      console.info(`🔄 Updated queue entry ${entryId} status to ${updates.status}`);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update queue entry' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromQueue = async (salonId: string, entryId: string) => {
    try {
      dispatch({ type: 'REMOVE_ENTRY', payload: { salonId, entryId } });

      // Recalculate positions for remaining entries
      const salonEntries = state.entries[salonId] || [];
      const updatedEntries = salonEntries
        .filter(entry => entry.status === 'WAITING')
        .map((entry, index) => ({
          ...entry,
          position: index + 1,
          totalInQueue: salonEntries.filter(e => e.status === 'WAITING').length,
        }));

      dispatch({ type: 'UPDATE_POSITIONS', payload: { salonId, entries: updatedEntries } });

      console.info(`🗑️ Removed entry ${entryId} from queue`);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove from queue' });
    }
  };

  const refreshQueue = async (salonId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // In a real app, this would fetch from API
      // For now, just refresh positions based on current state
      const salonEntries = state.entries[salonId] || [];
      const waitingEntries = salonEntries.filter(entry => entry.status === 'WAITING');

      const updatedEntries = waitingEntries.map((entry, index) => ({
        ...entry,
        position: index + 1,
        totalInQueue: waitingEntries.length,
        estimatedWaitMinutes: (index + 1) * 15,
        estimatedTime: new Date(Date.now() + (index + 1) * 15 * 60000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
      }));

      dispatch({ type: 'UPDATE_POSITIONS', payload: { salonId, entries: updatedEntries } });

      console.info(`🔄 Refreshed queue positions for salon ${salonId}`);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh queue' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getQueueForSalon = (salonId: string): QueueEntry[] => {
    return state.entries[salonId] || [];
  };

  const getQueueStats = (salonId: string): QueueStats | null => {
    return state.stats[salonId] || null;
  };

  // Simulate real-time updates (in a real app, this would be WebSocket)
  // DISABLED for demo - uncomment when ready for production
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update positions or simulate customer movements
      Object.keys(state.entries).forEach(salonId => {
        const entries = state.entries[salonId];
        if (entries.length > 0 && Math.random() < 0.1) { // 10% chance every 30 seconds
          refreshQueue(salonId);
        }
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [state.entries]);
  */

  const value = {
    state,
    dispatch,
    addToQueue,
    updateQueueEntry,
    removeFromQueue,
    refreshQueue,
    getQueueForSalon,
    getQueueStats,
  };

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

// Custom hook to use queue context
export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}
