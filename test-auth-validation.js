/**
 * Basic integration tests for authentication and validation
 * Run with: node test-auth-validation.js
 */

import { validateEmail, validatePhone, validatePassword, validateName, validateLoginRequest, validateRegistrationRequest } from './server/utils/validation.js';
import { PasswordSecurity } from './server/utils/security.js';

console.log('🧪 Running Authentication & Validation Tests...\n');

// Test email validation
console.log('📧 Testing Email Validation:');
const emailTests = [
  { input: 'user@example.com', expected: true },
  { input: 'invalid-email', expected: false },
  { input: '', expected: false },
  { input: 'a'.repeat(255) + '@example.com', expected: false }
];

emailTests.forEach(test => {
  const result = validateEmail(test.input);
  const status = result.isValid === test.expected ? '✅' : '❌';
  console.log(`${status} "${test.input}" -> ${result.isValid} (${result.errors.join(', ')})`);
});

console.log('\n📱 Testing Phone Validation:');
const phoneTests = [
  { input: '+919876543210', expected: true },
  { input: '9876543210', expected: true },
  { input: '+91 9876543210', expected: true },
  { input: 'invalid-phone', expected: false },
  { input: '12345', expected: false }
];

phoneTests.forEach(test => {
  const result = validatePhone(test.input);
  const status = result.isValid === test.expected ? '✅' : '❌';
  console.log(`${status} "${test.input}" -> ${result.isValid} (${result.errors.join(', ')})`);
});

console.log('\n🔒 Testing Password Validation:');
const passwordTests = [
  { input: 'MySecurePass123!', expected: true },
  { input: 'weak', expected: false },
  { input: 'nouppercase123!', expected: false },
  { input: 'NOLOWERCASE123!', expected: false },
  { input: 'NoDigits!', expected: false },
  { input: 'NoSpecialChars123', expected: false },
  { input: 'AAAABBBBCCCCDDDD', expected: false } // repeated chars
];

passwordTests.forEach(test => {
  const result = validatePassword(test.input);
  const status = result.isValid === test.expected ? '✅' : '❌';
  console.log(`${status} "${test.input}" -> ${result.isValid}`);
  if (!result.isValid && result.errors.length > 0) {
    console.log(`   Errors: ${result.errors.slice(0, 2).join(', ')}`);
  }
});

console.log('\n👤 Testing Name Validation:');
const nameTests = [
  { input: 'John Doe', expected: true },
  { input: 'José María', expected: true },
  { input: 'O\'Connor', expected: true },
  { input: 'A', expected: false },
  { input: 'Name with 123 numbers', expected: false },
  { input: 'a'.repeat(51), expected: false }
];

nameTests.forEach(test => {
  const result = validateName(test.input);
  const status = result.isValid === test.expected ? '✅' : '❌';
  console.log(`${status} "${test.input}" -> ${result.isValid} (${result.errors.join(', ')})`);
});

console.log('\n🔐 Testing Password Security Utilities:');
(async () => {
  try {
    const password = 'TestPassword123!';
    const hashed = await PasswordSecurity.hashPassword(password);
    console.log('✅ Password hashing works');

    const isValid = await PasswordSecurity.verifyPassword(password, hashed);
    console.log(`${isValid ? '✅' : '❌'} Password verification works`);

    const isInvalid = await PasswordSecurity.verifyPassword('wrongpassword', hashed);
    console.log(`${!isInvalid ? '✅' : '❌'} Wrong password correctly rejected`);
  } catch (error) {
    console.log('❌ Password security test failed:', error.message);
  }

  console.log('\n📝 Testing Login Request Validation:');
  const loginTestData = [
    { email: 'user@example.com', password: 'ValidPass123!' },
    { phone: '+919876543210', password: 'ValidPass123!' },
    { email: 'invalid-email', password: 'ValidPass123!' },
    { password: 'ValidPass123!' } // missing email/phone
  ];

  loginTestData.forEach((data, index) => {
    const result = validateLoginRequest(data);
    const hasErrors = Object.keys(result.errors).length > 0;
    const status = (!hasErrors && index < 2) || (hasErrors && index >= 2) ? '✅' : '❌';
    console.log(`${status} Login test ${index + 1}: ${hasErrors ? 'Has errors' : 'Valid'}`);
  });

  console.log('\n📝 Testing Registration Request Validation:');
  const registrationTestData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'ValidPass123!',
      confirmPassword: 'ValidPass123!'
    },
    {
      firstName: 'J',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'weak',
      confirmPassword: 'weak'
    }
  ];

  registrationTestData.forEach((data, index) => {
    const result = validateRegistrationRequest(data);
    const hasErrors = Object.keys(result.errors).length > 0;
    const status = (index === 0 && !hasErrors) || (index === 1 && hasErrors) ? '✅' : '❌';
    console.log(`${status} Registration test ${index + 1}: ${hasErrors ? 'Has errors' : 'Valid'}`);
  });

  console.log('\n🎉 Authentication & Validation Tests Complete!');
})();
