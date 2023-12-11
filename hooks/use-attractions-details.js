import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useAttractionsDetails = (id) => {
  const fetchAttractions = async () => {
    const response = await axios.get(`/api/attractions-details/${id}`);
    return response.data.result;
  };

  return useQuery(['attractions', id], fetchAttractions, {
    enabled: id !== null,
    onError: () => {
      toast.error('An error occurred');
    },
  });
};

export default useAttractionsDetails;
