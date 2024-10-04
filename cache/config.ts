import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
});