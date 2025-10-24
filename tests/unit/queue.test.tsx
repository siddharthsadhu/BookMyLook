import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { QueueProvider, useQueue } from '../../client/contexts/QueueContext'
import { RealTimeProvider } from '../../client/contexts/RealTimeContext'
import { renderWithProviders } from '../test-utils'

// Mock socket
const mockSocket = {
  on: vi.fn(),
  off: vi.fn(),
  emit: vi.fn(),
  connected: true,
}

// Mock RealTimeContext
vi.mock('../../client/contexts/RealTimeContext', () => ({
  RealTimeProvider: ({ children }: { children: React.ReactNode }) => children,
  useRealTime: () => ({
    socket: mockSocket,
    isConnected: true,
    connectionStatus: 'connected',
    subscribeToSalon: vi.fn(),
    unsubscribeFromSalon: vi.fn(),
  }),
}))

describe('Queue Context', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const TestComponent = () => {
      const { state } = useQueue()
      return (
        <div>
          <div data-testid="loading">{state.loading.toString()}</div>
          <div data-testid="error">{state.error || 'null'}</div>
          <div data-testid="entries-count">{Object.keys(state.entries).length}</div>
        </div>
      )
    }

    render(
      <RealTimeProvider>
        <QueueProvider>
          <TestComponent />
        </QueueProvider>
      </RealTimeProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('false')
    expect(screen.getByTestId('error')).toHaveTextContent('null')
    expect(screen.getByTestId('entries-count')).toHaveTextContent('0')
  })

  it('should add entry to queue', async () => {
    const TestComponent = () => {
      const { addToQueue, getQueueForSalon } = useQueue()

      const handleAddToQueue = async () => {
        await addToQueue({
          salonId: 'test-salon',
          customerName: 'Test Customer',
          serviceName: 'Test Service',
          serviceId: 'test-service',
          bookingId: 'test-booking',
          customerPhone: '+91 9876543210',
          notes: 'Test booking'
        })
      }

      const queue = getQueueForSalon('test-salon')

      return (
        <div>
          <button onClick={handleAddToQueue} data-testid="add-button">
            Add to Queue
          </button>
          <div data-testid="queue-length">{queue.length}</div>
        </div>
      )
    }

    render(
      <RealTimeProvider>
        <QueueProvider>
          <TestComponent />
        </QueueProvider>
      </RealTimeProvider>
    )

    expect(screen.getByTestId('queue-length')).toHaveTextContent('0')

    await act(async () => {
      fireEvent.click(screen.getByTestId('add-button'))
    })

    expect(screen.getByTestId('queue-length')).toHaveTextContent('1')
  })

  it('should handle real-time queue events', () => {
    const TestComponent = () => {
      const { state } = useQueue()
      return (
        <div>
          <div data-testid="total-entries">
            {Object.values(state.entries).reduce((total, entries) => total + entries.length, 0)}
          </div>
        </div>
      )
    }

    render(
      <RealTimeProvider>
        <QueueProvider>
          <TestComponent />
        </QueueProvider>
      </RealTimeProvider>
    )

    // Initially should have demo data
    expect(screen.getByTestId('total-entries')).toHaveTextContent('3')
  })

  it('should update queue entry status', async () => {
    const TestComponent = () => {
      const { updateQueueEntry, getQueueForSalon } = useQueue()
      const queue = getQueueForSalon('salon_gentleman_zone')

      const handleUpdateStatus = async () => {
        if (queue.length > 0) {
          await updateQueueEntry('salon_gentleman_zone', queue[0].id, { status: 'IN_SERVICE' })
        }
      }

      return (
        <div>
          <button onClick={handleUpdateStatus} data-testid="update-button">
            Update Status
          </button>
          <div data-testid="first-entry-status">
            {queue.length > 0 ? queue[0].status : 'NO_ENTRIES'}
          </div>
        </div>
      )
    }

    render(
      <RealTimeProvider>
        <QueueProvider>
          <TestComponent />
        </QueueProvider>
      </RealTimeProvider>
    )

    expect(screen.getByTestId('first-entry-status')).toHaveTextContent('WAITING')

    await act(async () => {
      fireEvent.click(screen.getByTestId('update-button'))
    })

    expect(screen.getByTestId('first-entry-status')).toHaveTextContent('IN_SERVICE')
  })
})
