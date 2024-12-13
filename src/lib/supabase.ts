import { createClient } from '@supabase/supabase-js';
import { getDatabaseConfig } from './database/config/databaseConfig';
import type { Database } from '../types/supabase';

const { url, key } = getDatabaseConfig();

export const supabase = createClient<Database>(url, key);