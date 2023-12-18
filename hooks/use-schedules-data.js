import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useSchedulesData = (userId) => {
  const fetchSchedules = async () => {
    const response = await axios.get(
      `/api/schedule/add-schedule?userId=${userId}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ['schedules', userId],
    queryFn: fetchSchedules,
    enabled: !!userId,
    onError: () => {
      toast.error('An error occurred');
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });
};

export default useSchedulesData;
