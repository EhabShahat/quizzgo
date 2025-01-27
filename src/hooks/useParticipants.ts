import { useQuery } from '@tanstack/react-query';
import { createSecondaryClient, fetchParticipants } from '@/integrations/supabase/secondaryClient';

export const useParticipants = (databaseUrl?: string, anonKey?: string) => {
  return useQuery({
    queryKey: ['participants'],
    queryFn: async () => {
      if (!databaseUrl || !anonKey) {
        return [];
      }
      const client = createSecondaryClient(databaseUrl, anonKey);
      return fetchParticipants(client);
    },
    enabled: Boolean(databaseUrl && anonKey)
  });
};