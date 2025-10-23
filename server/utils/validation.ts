/**
 * Validation utilities for server-side input validation
 */

// Email validation regex (RFC 5322 compliant)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Indian phone number validation (10 digits with optional +91 prefix)
const PHONE_REGEX = /^(\+91)?[6-9]\d{9}$/;

// Password strength requirements
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

// Name validation (2-50 characters, letters, spaces, hyphens, apostrophes)
const NAME_REGEX = /^[a-zA-Z\s\-']{2,50}$/;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationErrors {
  [key: string]: string[];
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email || typeof email !== 'string') {
    errors.push('Email address is required');
    return { isValid: false, errors };
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    errors.push('Email address cannot be empty');
  } else if (trimmedEmail.length > 254) {
    errors.push('Email address is too long - please use a shorter one');
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.push('Please enter a valid email address (like: name@example.com)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate Indian phone number
 */
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];

  if (!phone || typeof phone !== 'string') {
    errors.push('Phone number is required');
    return { isValid: false, errors };
  }

  const trimmedPhone = phone.trim();

  if (trimmedPhone.length === 0) {
    errors.push('Phone number cannot be empty');
  } else if (!PHONE_REGEX.test(trimmedPhone.replace(/\s+/g, ''))) {
    errors.push('Please enter a valid 10-digit Indian phone number (like: +919876543210 or 9876543210)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    errors.push('Password is required to secure your account');
    return { isValid: false, errors };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long for security`);
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    errors.push(`Password cannot be longer than ${PASSWORD_MAX_LENGTH} characters`);
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include at least one uppercase letter (A-Z)');
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must include at least one lowercase letter (a-z)');
  }

  // Check for at least one digit
  if (!/\d/.test(password)) {
    errors.push('Password must include at least one number (0-9)');
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must include at least one special character (!@#$%^&* etc.)');
  }

  // Check for common weak patterns
  const weakPatterns = [
    /^password/i,
    /^123456/,
    /^qwerty/i,
    /^admin/i,
    /^user/i
  ];

  if (weakPatterns.some(pattern => pattern.test(password))) {
    errors.push('Please choose a stronger password - avoid common words like "password" or "123456"');
  }

  // Check for repeated characters (more than 3 in a row)
  if (/(.)\1{3,}/.test(password)) {
    errors.push('Password cannot have the same character repeated more than 3 times in a row');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate name (first name or last name)
 */
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  const errors: string[] = [];

  if (!name || typeof name !== 'string') {
    errors.push(`${fieldName} is required`);
    return { isValid: false, errors };
  }

  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    errors.push(`${fieldName} cannot be empty`);
  } else if (!NAME_REGEX.test(trimmedName)) {
    errors.push(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes (no numbers or special characters)`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate user role
 */
export function validateRole(role: string): ValidationResult {
  const errors: string[] = [];
  const validRoles = ['CUSTOMER', 'SALON_OWNER', 'ADMIN'];

  if (!role || typeof role !== 'string') {
    errors.push('Role is required');
  } else if (!validRoles.includes(role.toUpperCase())) {
    errors.push(`Role must be one of: ${validRoles.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate login request
 */
export function validateLoginRequest(data: any): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Check if either email or phone is provided
  const hasEmail = data.email && typeof data.email === 'string' && data.email.trim().length > 0;
  const hasPhone = data.phone && typeof data.phone === 'string' && data.phone.trim().length > 0;

  if (!hasEmail && !hasPhone) {
    errors.credentials = ['Either email or phone number is required'];
  }

  if (hasEmail) {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errors;
    }
  }

  if (hasPhone) {
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.errors;
    }
  }

  // Validate password
  if (!data.password || typeof data.password !== 'string') {
    errors.password = ['Password is required'];
  } else if (data.password.trim().length === 0) {
    errors.password = ['Password cannot be empty'];
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate registration request
 */
export function validateRegistrationRequest(data: any): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Validate required firstName
  const firstNameValidation = validateName(data.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.errors;
  }

  // Validate lastName only if provided (optional field)
  if (data.lastName !== null && data.lastName !== undefined && data.lastName.trim().length > 0) {
    const lastNameValidation = validateName(data.lastName, 'Last name');
    if (!lastNameValidation.isValid) {
      errors.lastName = lastNameValidation.errors;
    }
  }

  // Email is required for registration
  if (!data.email || !data.email.trim()) {
    errors.email = ['Email address is required for account registration'];
  } else {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errors;
    }
  }

  // Phone is required for registration
  if (!data.phone || !data.phone.trim()) {
    errors.phone = ['Phone number is required for account registration'];
  } else {
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.errors;
    }
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors;
  }

  // Password confirmation is validated on the frontend, no need to check server-side

  // Validate role if provided
  if (data.role) {
    const roleValidation = validateRole(data.role);
    if (!roleValidation.isValid) {
      errors.role = roleValidation.errors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Format validation errors for API response
 */
export function formatValidationErrors(errors: ValidationErrors): string {
  const errorMessages: string[] = [];

  for (const [field, fieldErrors] of Object.entries(errors)) {
    errorMessages.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${fieldErrors.join(', ')}`);
  }

  return errorMessages.join('; ');
}
