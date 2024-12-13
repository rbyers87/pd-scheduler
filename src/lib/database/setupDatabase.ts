import { supabase } from '../supabase';
import { checkDatabaseConnection } from './utils/initCheck';
import { handleDatabaseError } from './utils/errorHandling';
import { setupTables } from './setup/setupTables';
import { setupPolicies } from './setup/setupPolicies';
import { seedInitialData } from './seed/initialData';
import { getDatabaseConfig } from './config/databaseConfig';

async function initializeDatabase() {
  try {
    // Setup tables first
    console.log('Setting up tables...');
    await setupTables(supabase);
    
    // Then setup policies
    console.log('Setting up policies...');
    await setupPolicies(supabase);
    
    // Finally seed initial data
    console.log('Seeding initial data...');
    await seedInitialData(supabase);

    return true;
  } catch (error) {
    const dbError = handleDatabaseError(error as any, 'database initialization');
    console.error('Database initialization failed:', dbError.message);
    throw dbError;
  }
}

export async function setupDatabase() {
  try {
    // Verify configuration
    getDatabaseConfig();

    // Check database connection
    const isConnected = await checkDatabaseConnection(supabase);
    if (!isConnected) {
      throw new Error('Could not connect to database. Please check your Supabase configuration.');
    }

    // Initialize database
    console.log('Initializing database...');
    await initializeDatabase();
    
    console.log('Database setup completed successfully');
    return true;
  } catch (error) {
    const dbError = handleDatabaseError(error as any, 'database setup');
    console.error('Database setup failed:', dbError.message);
    throw dbError;
  }
}