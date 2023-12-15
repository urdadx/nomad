import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const usePackagesData = () => {
  const fetchPackages = async () => {
    const response = await axios.get(`/api/packages/add-package`);
    return response.data;
  };

  return useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default usePackagesData;
