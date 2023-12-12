import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useSchedule = (schduleId) => {
  const fetchPackage = async () => {
    const response = await axios.get(`/api/schedule/${schduleId}`);
    return response.data;
  };

  return useQuery(['schedule', schduleId], fetchPackage, {
    enabled: schduleId !== null,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default useSchedule;
