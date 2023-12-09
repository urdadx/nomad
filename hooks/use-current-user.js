import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/lib/constants';

const useCurrentUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('/api/current');
      return response.data;
    },
    onError: (err) => {
      console.error(err.message);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });
};

export default useCurrentUser;
