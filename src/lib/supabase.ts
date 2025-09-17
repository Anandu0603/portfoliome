import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our contact messages
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  status?: 'new' | 'read' | 'replied' | 'archived';
  admin_notes?: string;
  ip_address?: string;
  user_agent?: string;
}
