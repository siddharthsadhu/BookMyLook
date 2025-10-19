import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface QueueEntry {
  id: string;
  bookingId: string;
  tokenNumber: number;
  position: number;
  estimatedTime: string;
  status: 'WAITING' | 'CALLED' | 'IN_SERVICE' | 'COMPLETED' | 'NO_SHOW';
  joinedAt: Date;
  booking?: {
    customerName: string;
    customerPhone: string;
    service?: {
      name: string;
      durationMinutes: number;
    };
  };
}

export interface SalonQueue {
  id: string;
  salonId: string;
  date: string;
  currentNumber: number;
  totalWaiting: number;
  averageWaitTime: number;
  isActive: boolean;
  entries: QueueEntry[];
  salon?: {
    name: string;
    address: string;
    phone: string;
  };
}

// Queue service for managing real-time queue data
class QueueService {
  private static instance: QueueService;
  private subscribers: Set<(queues: SalonQueue[]) => void> = new Set();

  static getInstance(): QueueService {
    if (!QueueService.instance) {
      QueueService.instance = new QueueService();
    }
    return QueueService.instance;
  }

  // Fetch queue data from API
  async fetchQueues(): Promise<SalonQueue[]> {
    try {
      const response = await fetch('/api/queue');
      const data = await response.json();

      if (data.success) {
        return data.data || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching queues:', error);
      return [];
    }
  }

  // Subscribe to queue updates
  subscribe(callback: (queues: SalonQueue[]) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  notify(queues: SalonQueue[]): void {
    this.subscribers.forEach(callback => callback(queues));
  }

  // Start polling for updates
  startPolling(intervalMs: number = 10000): () => void {
    const poll = async () => {
      const queues = await this.fetchQueues();
      this.notify(queues);
    };

    // Initial fetch
    poll();

    // Set up interval
    const intervalId = setInterval(poll, intervalMs);

    // Return cleanup function
    return () => clearInterval(intervalId);
  }
}

// React hook for using queue data
export function useQueueData() {
  const [queues, setQueues] = useState<SalonQueue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const queueService = QueueService.getInstance();

  // Initial data fetch
  const { data: initialData, isLoading: queryLoading } = useQuery({
    queryKey: ['queues'],
    queryFn: () => queueService.fetchQueues(),
    staleTime: 5000, // Consider data fresh for 5 seconds
    refetchInterval: 15000, // Refetch every 15 seconds
  });

  useEffect(() => {
    if (initialData) {
      setQueues(initialData);
      setIsLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    setIsLoading(queryLoading);
  }, [queryLoading]);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = queueService.subscribe((updatedQueues) => {
      setQueues(updatedQueues);
    });

    return unsubscribe;
  }, [queueService]);

  // Calculate queue statistics
  const stats = {
    totalWaiting: queues.reduce((sum, queue) => sum + queue.totalWaiting, 0),
    totalActiveSalons: queues.filter(queue => queue.isActive).length,
    averageWaitTime: queues.length > 0
      ? Math.round(queues.reduce((sum, queue) => sum + queue.averageWaitTime, 0) / queues.length)
      : 0,
  };

  return {
    queues,
    stats,
    isLoading,
    refetch: () => queueService.fetchQueues().then(setQueues),
  };
}

// Hook for a specific salon's queue
export function useSalonQueue(salonId: string) {
  const { queues, isLoading } = useQueueData();

  const salonQueue = queues.find(queue => queue.salonId === salonId);

  return {
    queue: salonQueue,
    isLoading,
  };
}

// Utility functions
export const getQueueStatusColor = (status: string) => {
  switch (status) {
    case 'WAITING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'CALLED': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'IN_SERVICE': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
    case 'NO_SHOW': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getQueueStatusText = (status: string) => {
  switch (status) {
    case 'WAITING': return 'Waiting';
    case 'CALLED': return 'Called';
    case 'IN_SERVICE': return 'In Service';
    case 'COMPLETED': return 'Completed';
    case 'NO_SHOW': return 'No Show';
    default: return status;
  }
};

export const formatEstimatedTime = (estimatedTime: string) => {
  // Convert HH:MM format to readable time
  const [hours, minutes] = estimatedTime.split(':').map(Number);
  const now = new Date();
  const estimatedDate = new Date(now);
  estimatedDate.setHours(hours, minutes, 0, 0);

  if (estimatedDate < now) {
    estimatedDate.setDate(estimatedDate.getDate() + 1);
  }

  const diffMs = estimatedDate.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));

  if (diffMins <= 0) return 'Ready now';
  if (diffMins < 60) return `~${diffMins} min`;
  const diffHours = Math.floor(diffMins / 60);
  const remainingMins = diffMins % 60;
  return `~${diffHours}h ${remainingMins}m`;
};
