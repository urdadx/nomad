import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useUser = (id) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${id}`);
      return response.data;
    },
    enabled: id !== null,
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data.message || 'An error occurred');
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });
};

export default useUser;
