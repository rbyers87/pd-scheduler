import { supabase } from '../supabase';
import type { User } from '../../types';

export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    // First check if the user exists in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);
    if (authError || !authUser) return null;

    // Then get the user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (profileError) throw profileError;
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    return getUserProfile(session.user.id);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}