import { EmailIndex } from 'client';

import { useQuery } from '@tanstack/react-query';

export const useQueryEmail = () => {
  return useQuery({
    queryKey: ['email'],
    queryFn: async () => EmailIndex({ page: 1, limit: 25 }),
  });
};
