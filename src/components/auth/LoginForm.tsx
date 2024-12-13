import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../stores/authStore';
import { FormInput } from './FormInput';
import { ErrorMessage } from './ErrorMessage';

const loginSchema = z.object({
  email: z.string().email().endsWith('@work.com', { message: 'Must be a work email' }),
  password: z.string().min(6)
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { signIn, error: authError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Work Email"
        type="email"
        registration={register('email')}
        error={errors.email?.message}
      />

      <FormInput
        label="Password"
        type="password"
        registration={register('password')}
        error={errors.password?.message}
      />

      {authError && <ErrorMessage message={authError} />}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}