import type { Session } from '@supabase/supabase-js';
import type { User } from '../../types';

export interface AuthResponse {
  session: Session | null;
  user: User;
}