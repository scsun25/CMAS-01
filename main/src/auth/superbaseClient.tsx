import { createClient } from '@supabase/supabase-js';
import type { User } from '../types/User';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const updateAuthContext = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  user: User | null
) => {
  setUser(user);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
