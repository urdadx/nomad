import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const usePackage = (packageId) => {
  const fetchPackage = async () => {
    const response = await axios.get(`/api/packages/${packageId}`);
    return response.data;
  };

  return useQuery(['packages', packageId], fetchPackage, {
    enabled: packageId !== null,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default usePackage;
