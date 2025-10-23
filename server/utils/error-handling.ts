/**
 * Standardized error handling utilities for consistent API responses
 */

import { Response } from 'express';
import { ApiResponse } from '@shared/api';

export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR'
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    type: ErrorType,
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Predefined error classes for common scenarios
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(ErrorType.VALIDATION_ERROR, message, 400);
    this.details = details;
  }
  details?: any;
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(ErrorType.AUTHENTICATION_ERROR, message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(ErrorType.AUTHORIZATION_ERROR, message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(ErrorType.NOT_FOUND_ERROR, `${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(ErrorType.CONFLICT_ERROR, message, 409);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(ErrorType.DATABASE_ERROR, message, 500);
  }
}

// Error response utilities
export class ErrorResponse {
  static send(res: Response, error: AppError | Error | string): void {
    let statusCode = 500;
    let type = ErrorType.INTERNAL_ERROR;
    let message = 'An unexpected error occurred';

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      type = error.type;
      message = error.message;
    } else if (error instanceof Error) {
      message = process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    const response: ApiResponse = {
      success: false,
      error: message
    };

    // Log error for monitoring (excluding validation errors in production)
    if (process.env.NODE_ENV !== 'production' || type !== ErrorType.VALIDATION_ERROR) {
      console.error(`[${type}] ${message}`, error instanceof Error ? error.stack : '');
    }

    res.status(statusCode).json(response);
  }

  static validation(res: Response, errors: Record<string, string[]>): void {
    const response: ApiResponse = {
      success: false,
      error: Object.values(errors).flat().join('; ')
    };
    res.status(400).json(response);
  }

  static success<T>(res: Response, data?: T, message?: string, meta?: any): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      meta
    };
    res.json(response);
  }
}

// Async error wrapper for route handlers
export function asyncHandler(fn: Function) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      ErrorResponse.send(res, error);
    });
  };
}

// Database operation wrapper with error handling
export async function withDatabaseOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Database operation failed'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new DatabaseError(`${errorMessage}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Prisma error handler
export function handlePrismaError(error: any): AppError {
  // Handle specific Prisma error codes
  if (error?.code) {
    switch (error.code) {
      case 'P2002':
        return new ConflictError('A record with this information already exists');
      case 'P2025':
        return new NotFoundError('Record');
      case 'P1001':
        return new DatabaseError('Database connection failed');
      case 'P1017':
        return new DatabaseError('Database server closed connection');
      default:
        return new DatabaseError(`Database error: ${error.code}`);
    }
  }

  return new DatabaseError(error?.message || 'Unknown database error');
}

// Input validation wrapper
export function validateInput<T>(
  data: any,
  validator: (data: any) => { isValid: boolean; errors: Record<string, string[]> },
  fieldName: string = 'Input'
): asserts data is T {
  const validation = validator(data);
  if (!validation.isValid) {
    throw new ValidationError(`${fieldName} validation failed`, validation.errors);
  }
}
