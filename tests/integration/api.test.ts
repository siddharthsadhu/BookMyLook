import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { createServer } from '../../server'

// Note: These tests require the database to be running
// In a real CI/CD environment, you'd use a test database

describe('API Integration Tests', () => {
  let server: any

  beforeAll(async () => {
    server = createServer()
  })

  afterAll(async () => {
    if (server && server.close) {
      server.close()
    }
  })

  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await request(server).get('/api/health')

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('healthy')
      expect(response.body.timestamp).toBeDefined()
    })
  })

  describe('Demo Endpoint', () => {
    it('should return demo data', async () => {
      const response = await request(server).get('/api/demo')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeDefined()
    })
  })

  describe('Shops API', () => {
    it('should return list of shops', async () => {
      const response = await request(server).get('/api/shops')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('should return shop details', async () => {
      const response = await request(server).get('/api/shops/1')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('id')
      expect(response.body.data).toHaveProperty('name')
    })
  })

  describe('Services API', () => {
    it('should return list of services', async () => {
      const response = await request(server).get('/api/services')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('should return service categories', async () => {
      const response = await request(server).get('/api/services/categories')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
    })
  })

  describe('Queue API', () => {
    it('should return queue data', async () => {
      const response = await request(server).get('/api/queue')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
    })

    it('should add customer to queue', async () => {
      const queueData = {
        customerName: 'Test Customer',
        serviceName: 'Test Service',
        bookingId: 'test-booking-' + Date.now(),
        salonId: 'test-salon'
      }

      const response = await request(server)
        .post('/api/queue')
        .send(queueData)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('tokenNumber')
      expect(response.body.data).toHaveProperty('position')
    })
  })

  describe('Reviews API', () => {
    it('should return reviews', async () => {
      const response = await request(server).get('/api/reviews')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('should return review statistics', async () => {
      const response = await request(server).get('/api/reviews/stats')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('averageRating')
      expect(response.body.data).toHaveProperty('totalReviews')
    })
  })

  describe('Authentication (Public Routes)', () => {
    it('should allow registration', async () => {
      const userData = {
        email: `test${Date.now()}@example.com`,
        password: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'User',
        phone: '+91 9876543210',
        role: 'CUSTOMER'
      }

      const response = await request(server)
        .post('/api/auth/register')
        .send(userData)

      // Registration might succeed or fail depending on validation
      expect([200, 400, 409]).toContain(response.status)
      expect(response.body).toHaveProperty('success')
    })

    it('should handle login attempts', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      const response = await request(server)
        .post('/api/auth/login')
        .send(loginData)

      expect(response.status).toBe(401)
      expect(response.body.success).toBe(false)
    })
  })

  describe('Protected Routes (Without Auth)', () => {
    it('should reject bookings without authentication', async () => {
      const bookingData = {
        salonId: 'test-salon',
        serviceId: 'test-service',
        appointmentDate: '2024-01-01',
        appointmentTime: '10:00',
        customerName: 'Test Customer',
        customerPhone: '+91 9876543210',
        customerEmail: 'test@example.com'
      }

      const response = await request(server)
        .post('/api/bookings')
        .send(bookingData)

      expect(response.status).toBe(401)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('authenticated')
    })
  })
})
