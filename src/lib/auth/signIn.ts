import { supabase } from '../supabase';
import { getUserProfile } from './userProfile';
import type { AuthResponse } from './types';

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (authError) throw authError;
    if (!authData.user) throw new Error('No user data returned');
    
    // Fetch the user profile after successful authentication
    const userProfile = await getUserProfile(authData.user.id);
    if (!userProfile) throw new Error('User profile not found');
    
    return {
      session: authData.session,
      user: userProfile
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Invalid email or password');
  }
}