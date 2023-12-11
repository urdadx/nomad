import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useAttractionsData = () => {
  return useQuery({
    queryKey: ['attractions'],
    queryFn: async () => {
      const response = await axios.get('/api/attractions');
      return response.data;
    },
    onError: (err) => {
      console.error(err.message);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });
};

export default useAttractionsData;
