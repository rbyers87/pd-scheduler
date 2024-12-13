import { SupabaseClient } from '@supabase/supabase-js';
import { handleDatabaseError } from '../utils/errorHandling';

export async function seedInitialData(supabase: SupabaseClient) {
  try {
    // Check if data already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (checkError) {
      throw handleDatabaseError(checkError, 'checking existing users');
    }

    if (existingUsers && existingUsers.length > 0) {
      console.log('Initial data already seeded');
      return;
    }

    // Create admin user
    const { data: adminAuthData, error: adminAuthError } = await supabase.auth.signUp({
      email: 'admin@work.com',
      password: 'test123',
      options: {
        data: {
          name: 'Admin User',
          role: 'admin'
        }
      }
    });

    if (adminAuthError) {
      throw handleDatabaseError(adminAuthError as any, 'creating admin user auth');
    }

    if (!adminAuthData.user) {
      throw new Error('Admin user creation failed');
    }

    const { error: adminError } = await supabase.from('users').insert({
      id: adminAuthData.user.id,
      email: 'admin@work.com',
      name: 'Admin User',
      role: 'admin',
      group: 'Management',
      benefits: {
        vacation: 80,
        sick: 40,
        comp: 20
      }
    });

    if (adminError) {
      throw handleDatabaseError(adminError, 'creating admin user record');
    }

    // Create regular user
    const { data: userAuthData, error: userAuthError } = await supabase.auth.signUp({
      email: 'user@work.com',
      password: 'test123',
      options: {
        data: {
          name: 'Regular User',
          role: 'user'
        }
      }
    });

    if (userAuthError) {
      throw handleDatabaseError(userAuthError as any, 'creating regular user auth');
    }

    if (!userAuthData.user) {
      throw new Error('Regular user creation failed');
    }

    const { error: userError } = await supabase.from('users').insert({
      id: userAuthData.user.id,
      email: 'user@work.com',
      name: 'Regular User',
      role: 'user',
      group: 'Day Shift',
      benefits: {
        vacation: 40,
        sick: 20,
        comp: 10
      }
    });

    if (userError) {
      throw handleDatabaseError(userError, 'creating regular user record');
    }

    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial data:', error);
    throw error;
  }
}