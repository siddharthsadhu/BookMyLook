import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

export function PasswordStrengthIndicator({ password, showRequirements = true }: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState(0);
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    special: false,
    noRepeat: false
  });

  useEffect(() => {
    const newChecks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      noRepeat: !/(.)\1{3,}/.test(password)
    };

    setChecks(newChecks);

    // Calculate strength (0-4)
    const passedChecks = Object.values(newChecks).filter(Boolean).length;
    setStrength(Math.min(passedChecks, 4));
  }, [password]);

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ];

  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">Password Strength</span>
          <span className={`text-sm font-bold ${
            strength === 0 ? 'text-red-600' :
            strength === 1 ? 'text-orange-600' :
            strength === 2 ? 'text-yellow-600' :
            strength === 3 ? 'text-blue-600' : 'text-green-600'
          }`}>
            {strengthLabels[strength]}
          </span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index < strength ? 1 : 0.3 }}
              className={`h-2 flex-1 rounded-full ${
                index < strength
                  ? strengthColors[strength]
                  : 'bg-slate-200'
              }`}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Requirements List */}
      <AnimatePresence>
        {showRequirements && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1"
          >
            {Object.entries(checks).map(([key, passed]) => {
              const labels = {
                length: 'At least 8 characters',
                uppercase: 'One uppercase letter',
                lowercase: 'One lowercase letter',
                digit: 'One number',
                special: 'One special character',
                noRepeat: 'No more than 3 repeated characters'
              };

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 text-xs ${
                    passed ? 'text-green-600' : 'text-slate-500'
                  }`}
                >
                  {passed ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                  {labels[key as keyof typeof labels]}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface RealTimeValidationProps {
  value: string;
  validator: (value: string) => { isValid: boolean; errors: string[] };
  showErrors?: boolean;
  debounceMs?: number;
}

export function RealTimeValidation({ value, validator, showErrors = true, debounceMs = 300 }: RealTimeValidationProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  useEffect(() => {
    if (debouncedValue) {
      const result = validator(debouncedValue);
      setErrors(result.errors);
    } else {
      setErrors([]);
    }
  }, [debouncedValue, validator]);

  if (!showErrors || errors.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-start gap-2 text-red-600 text-xs mt-1"
      >
        <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
        <span>{errors[0]}</span>
      </motion.div>
    </AnimatePresence>
  );
}
