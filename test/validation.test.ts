import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateName,
  validateLoginRequest,
  validateRegistrationRequest
} from '../server/utils/validation.js';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      const result = validateEmail('user@example.com');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid email addresses', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid email format');
    });

    it('should reject empty emails', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email cannot be empty');
    });
  });

  describe('validatePhone', () => {
    it('should validate correct Indian phone numbers', () => {
      const result = validatePhone('+919876543210');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate phone numbers without country code', () => {
      const result = validatePhone('9876543210');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid phone numbers', () => {
      const result = validatePhone('invalid-phone');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid Indian phone number format');
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('MySecurePass123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject passwords without uppercase letters', () => {
      const result = validatePassword('nouppercase123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject passwords without lowercase letters', () => {
      const result = validatePassword('NOLOWERCASE123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject passwords without digits', () => {
      const result = validatePassword('NoDigits!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one digit');
    });

    it('should reject passwords without special characters', () => {
      const result = validatePassword('NoSpecialChars123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character');
    });
  });

  describe('validateName', () => {
    it('should validate correct names', () => {
      const result = validateName('John Doe');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject names that are too short', () => {
      const result = validateName('A');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters');
    });

    it('should reject names with invalid characters', () => {
      const result = validateName('Name with 123 numbers');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name can only contain letters, spaces, hyphens, and apostrophes');
    });
  });

  describe('validateLoginRequest', () => {
    it('should validate correct login requests with email', () => {
      const result = validateLoginRequest({
        email: 'user@example.com',
        password: 'ValidPass123!'
      });
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should validate correct login requests with phone', () => {
      const result = validateLoginRequest({
        phone: '+919876543210',
        password: 'ValidPass123!'
      });
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject login requests without email or phone', () => {
      const result = validateLoginRequest({
        password: 'ValidPass123!'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.credentials).toBeDefined();
    });
  });

  describe('validateRegistrationRequest', () => {
    it('should validate correct registration requests', () => {
      const result = validateRegistrationRequest({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'ValidPass123!',
        confirmPassword: 'ValidPass123!'
      });
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject registration requests with password mismatch', () => {
      const result = validateRegistrationRequest({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'ValidPass123!',
        confirmPassword: 'DifferentPass123!'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.confirmPassword).toContain('Passwords do not match');
    });
  });
});
