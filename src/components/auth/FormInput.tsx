import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  type: 'email' | 'password' | 'text';
  registration: UseFormRegisterReturn;
  error?: string;
}

export function FormInput({ label, type, registration, error }: FormInputProps) {
  return (
    <div>
      <label htmlFor={registration.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          autoComplete={type === 'password' ? 'current-password' : type}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...registration}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}