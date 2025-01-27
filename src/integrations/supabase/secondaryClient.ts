import { createClient } from '@supabase/supabase-js';

// Create a second Supabase client for read-only access
export const createSecondaryClient = (url: string, anonKey: string) => {
  return createClient(url, anonKey, {
    auth: {
      persistSession: false // Since we only need read access
    }
  });
};

export const fetchParticipants = async (client: ReturnType<typeof createSecondaryClient>) => {
  const { data, error } = await client
    .from('participants') // Replace with your actual table name
    .select('name, phone_number');
  
  if (error) throw error;
  return data;
};