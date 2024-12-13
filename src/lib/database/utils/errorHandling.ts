import { PostgrestError } from '@supabase/supabase-js';

export interface DatabaseError extends Error {
  code?: string;
  details?: string;
  hint?: string;
}

export function handleDatabaseError(error: PostgrestError | null | unknown, context: string): Error {
  if (!error) {
    return new Error(`Unknown error in ${context}`);
  }

  // Handle non-Postgrest errors
  if (!(error as PostgrestError).code) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Error(`${context}: ${message}`);
  }

  const pgError = error as PostgrestError;
  console.error(`Database error in ${context}:`, {
    code: pgError.code,
    message: pgError.message,
    details: pgError.details,
    hint: pgError.hint
  });
  
  switch (pgError.code) {
    case '42P07': // duplicate table
      return new Error(`Table already exists in ${context}`);
    case '42P16': // duplicate policy
      return new Error(`Policy already exists in ${context}`);
    case '42P13': // duplicate function
      return new Error(`Function already exists in ${context}`);
    case '42501': // permission denied
      return new Error(`Permission denied in ${context}`);
    case '23505': // unique violation
      return new Error(`Duplicate key value violates unique constraint in ${context}`);
    case '42P01': // undefined table
      return new Error(`Table does not exist in ${context}`);
    case '28P01': // invalid password
      return new Error('Invalid credentials');
    case '3D000': // database does not exist
      return new Error('Database configuration error');
    default:
      return new Error(`Database error in ${context}: ${pgError.message}`);
  }
}