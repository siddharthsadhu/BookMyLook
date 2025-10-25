import React, { useState, useEffect, useCallback } from 'react';
import { User, LoginRequest, RegisterRequest, ApiResponse } from '@shared/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  User as UserIcon,
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Chrome,
  Smartphone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  mode: 'login' | 'register';
  onComplete?: () => void;
  onModeChange?: (newMode: 'login' | 'register') => void;
  initialCredentials?: { email?: string; password?: string };
}

// Password strength indicator component
const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const getColor = () => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getLabel = () => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 w-full rounded-full transition-colors ${
              i <= strength ? getColor() : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength < 2 ? 'text-red-600' : strength < 4 ? 'text-yellow-600' : 'text-green-600'}`}>
        Password strength: {getLabel()}
      </p>
    </div>
  );
};

export const ConversationalAuth: React.FC<AuthProps> = ({ mode, onComplete, onModeChange, initialCredentials }) => {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  // Auto-fill form when initialCredentials change
  useEffect(() => {
    if (initialCredentials) {
      setFormData(prev => ({
        ...prev,
        email: initialCredentials.email || prev.email,
        password: initialCredentials.password || prev.password
      }));
      // Set email mode if email is provided
      if (initialCredentials.email) {
        setUseEmail(true);
      }
    }
  }, [initialCredentials]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
    phone: ''
  });
  const [useEmailForReset, setUseEmailForReset] = useState(true);
  const [useEmail, setUseEmail] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '');
    return /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    console.log('🔎 Starting form validation for mode:', mode);

    if (mode === 'register') {
      console.log('📋 Validating registration fields...');

      // First name validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters';
      }

      // Last name validation
      if (formData.lastName.trim() && formData.lastName.trim().length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters if provided';
      }

      // Email/Phone validation - both are required for registration
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
      }

      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
      }

      // Password confirmation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      // Login validation uses the toggle
      if (useEmail) {
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
      } else {
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;

    console.log('🎯 Final validation result:', {
      isValid,
      totalErrors: Object.keys(newErrors).length,
      errors: isValid ? 'NONE' : newErrors
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('🚀 Form submitted! Mode:', mode);

    if (!validateForm()) {
      console.log('❌ Form validation failed - not proceeding');
      return;
    }

    console.log('✅ Form validation passed - proceeding with submission');

    setIsLoading(true);
    setErrors({});

    try {
      const authData = {
        // For login, use the toggle to choose email or phone
        ...(mode === 'login' && {
          [useEmail ? 'email' : 'phone']: useEmail ? formData.email : formData.phone,
        }),
        // For registration, always include both email and phone
        ...(mode === 'register' && {
          email: formData.email,
          phone: formData.phone,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim() || null,
          role: 'CUSTOMER' as const
        }),
        password: formData.password,
        ...(mode === 'login' && { rememberMe: formData.rememberMe })
      };

      console.log('🔄 Registration attempt with data:', {
        firstName: authData.firstName,
        lastName: authData.lastName,
        email: authData.email,
        phone: authData.phone,
        password: '***',
        role: authData.role
      });

      let result;
      if (mode === 'login') {
        result = await login(authData);
      } else {
        result = await register(authData);
      }

      console.log('📡 API Response:', result);

      if (result.success) {
        // Navigation is handled by AuthContext
        const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/dashboard/customer';
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectTo);
      } else {
        setErrors({ general: result.error || `${mode === 'login' ? 'Login' : 'Registration'} failed` });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleAuthMode = () => {
    if (onModeChange) {
      onModeChange(mode === 'login' ? 'register' : 'login');
    } else {
      navigate(mode === 'login' ? '/register' : '/login');
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters and +91 if present
    const cleaned = value.replace(/\D/g, '').replace(/^91/, '');

    // If the cleaned number is empty, return empty string
    if (!cleaned) return '';

    // Limit to 10 digits (Indian phone number length)
    const limited = cleaned.slice(0, 10);

    // Add +91 prefix for display if we have digits
    return limited ? `+91${limited}` : '';
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotPasswordForm.email && !forgotPasswordForm.phone) {
      setErrors({ general: 'Email or phone number is required' });
      return;
    }

    if (useEmailForReset && forgotPasswordForm.email && !validateEmail(forgotPasswordForm.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    if (!useEmailForReset && forgotPasswordForm.phone && !validatePhone(forgotPasswordForm.phone)) {
      setErrors({ phone: 'Please enter a valid phone number' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      console.log('Attempting to call forgot password API...');
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [useEmailForReset ? 'email' : 'phone']: useEmailForReset ? forgotPasswordForm.email : forgotPasswordForm.phone
        })
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('API Response data:', data);

      if (data.success) {
        // Show success message and close modal
        setShowForgotPassword(false);
        setForgotPasswordForm({ email: '', phone: '' });

        // Show success toast notification
        toast({
          title: "Reset Link Sent!",
          description: "Check your email for password reset instructions. The link expires in 1 hour.",
          duration: 5000, // Show for 5 seconds
        });

        console.log('Password reset email sent successfully');
      } else {
        setErrors({ general: data.error || 'Failed to send reset email' });
      }
    } catch (error) {
      console.error('Forgot password fetch error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      // Provide more specific error messages
      let errorMessage = 'Network error. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Unable to connect to server. Please check your connection.';
        } else if (error.message.includes('JSON')) {
          errorMessage = 'Server response error. Please try again.';
        } else {
          errorMessage = error.message || errorMessage;
        }
      }

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl dark:from-purple-500/20 dark:to-pink-500/20"
        />
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-15 blur-xl dark:from-pink-500/20 dark:to-purple-500/20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {mode === 'login' ? 'Welcome Back' : 'Join BookMyLook'}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              {mode === 'login'
                ? 'Sign in to your account'
                : 'Create your account to get started'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name - Register only */}
              {mode === 'register' && (
                <>
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`pl-10 ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name (optional)"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`pl-10 ${errors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Leave blank if you have only one name
                    </p>
                    {errors.lastName && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Email - Always required for registration */}
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              )}

              {/* Phone - Always required for registration */}
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = formatPhoneNumber(e.target.value);
                        handleInputChange('phone', value);
                      }}
                      className={`pl-10 ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    +91 will be added automatically
                  </p>
                  {errors.phone && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              )}

              {/* Email/Phone Toggle - Login only */}
              {mode === 'login' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      type="button"
                      variant={useEmail ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseEmail(true)}
                      className="flex-1"
                      disabled={isLoading}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={!useEmail ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseEmail(false)}
                      className="flex-1"
                      disabled={isLoading}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </Button>
                  </div>

                  {/* Login Email/Phone Input */}
                  <div className="space-y-2">
                    <Label htmlFor={useEmail ? "email" : "phone"} className="text-sm font-medium">
                      {useEmail ? 'Email Address' : 'Phone Number'}
                    </Label>
                    <div className="relative">
                      {useEmail ? (
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      ) : (
                        <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      )}
                      <Input
                        id={useEmail ? "email" : "phone"}
                        type={useEmail ? "email" : "tel"}
                        placeholder={useEmail ? "Enter your email" : "Enter 10-digit phone number"}
                        value={useEmail ? formData.email : formData.phone}
                        onChange={(e) => {
                          const value = useEmail ? e.target.value : formatPhoneNumber(e.target.value);
                          handleInputChange(useEmail ? 'email' : 'phone', value);
                        }}
                        className={`pl-10 ${errors[useEmail ? 'email' : 'phone'] ? 'border-red-500 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {!useEmail && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        +91 will be added automatically
                      </p>
                    )}
                    {errors[useEmail ? 'email' : 'phone'] && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors[useEmail ? 'email' : 'phone']}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'register' && <PasswordStrength password={formData.password} />}
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password - Login only */}
              {mode === 'login' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      // Pre-fill the forgot password form with current login values
                      setForgotPasswordForm({
                        email: useEmail ? formData.email : '',
                        phone: !useEmail ? formData.phone : ''
                      });
                      setUseEmailForReset(useEmail);
                      setShowForgotPassword(true);
                    }}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline"
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Confirm Password - Register only */}
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me - Login only */}
              {mode === 'login' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </Label>
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.general}
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="space-y-4">
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white dark:bg-gray-900 px-2 text-sm text-gray-500">or</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full py-3 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                disabled={isLoading}
                onClick={() => {
                  // Redirect to Google OAuth
                  window.location.href = '/api/auth/google';
                }}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
            </div>

            {/* Mode Toggle */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="ml-1 text-purple-600 hover:text-purple-700 font-medium hover:underline"
                  disabled={isLoading}
                >
                  {mode === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowForgotPassword(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Reset Password
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter your email or phone number to receive a password reset link
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {/* Email/Phone Toggle */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        type="button"
                        variant={useEmailForReset ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUseEmailForReset(true)}
                        className="flex-1"
                        disabled={isLoading}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        type="button"
                        variant={!useEmailForReset ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUseEmailForReset(false)}
                        className="flex-1"
                        disabled={isLoading}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Button>
                    </div>

                    {/* Email/Phone Input */}
                    <div className="space-y-2">
                      <Label htmlFor={useEmailForReset ? "reset-email" : "reset-phone"} className="text-sm font-medium">
                        {useEmailForReset ? 'Email Address' : 'Phone Number'}
                      </Label>
                      <div className="relative">
                        {useEmailForReset ? (
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        ) : (
                          <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        )}
                        <Input
                          id={useEmailForReset ? "reset-email" : "reset-phone"}
                          type={useEmailForReset ? "email" : "tel"}
                          placeholder={useEmailForReset ? "Enter your email" : "Enter 10-digit phone number"}
                          value={useEmailForReset ? forgotPasswordForm.email : forgotPasswordForm.phone}
                          onChange={(e) => {
                            const value = useEmailForReset ? e.target.value : formatPhoneNumber(e.target.value);
                            setForgotPasswordForm(prev => ({
                              ...prev,
                              [useEmailForReset ? 'email' : 'phone']: value
                            }));
                          }}
                          className={`pl-10 ${errors[useEmailForReset ? 'email' : 'phone'] ? 'border-red-500 focus:border-red-500' : ''}`}
                          disabled={isLoading}
                        />
                      </div>
                      {!useEmailForReset && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          +91 will be added automatically
                        </p>
                      )}
                      {errors[useEmailForReset ? 'email' : 'phone'] && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors[useEmailForReset ? 'email' : 'phone']}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* General Error */}
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.general}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordForm({ email: '', phone: '' });
                      setErrors({});
                    }}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline"
                    disabled={isLoading}
                  >
                    Back to Login
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ConversationalAuth;
