import BackNavigator from '@/components/utils/back-navigator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import useCurrentUser from '@/hooks/use-current-user';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/contexts/context';

const CreateSchedule = () => {
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const { scheduleDate, setScheduleDate } = useStore();

  const addScheduleTrip = useMutation(
    async ({ name, scheduleDate, location }) => {
      await axios.post('/api/add-schedule', {
        name,
        scheduleDate,
        location,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['schedules', currentUser?.id],
        });
        setIsLoading(false);
        setName('');
        setLocation('');
        setScheduleDate('');
      },
    }
  );

  const handleSubmitPackage = async () => {
    setIsLoading(true);
    await toast.promise(
      addScheduleTrip.mutateAsync({
        name,
        scheduleDate,
        location,
      }),
      {
        loading: 'Creating schedule',
        success: 'Schedule added successfully',
        error: 'An error occured',
      }
    );
  };
  return (
    <>
      <BackNavigator name="Add Schedule" cancel={true} />
      <div className="px-6 h-screen no-scrollbar mt-8">
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="name">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg h-12"
            type="text"
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="">Pick a date</Label>
          <DateRangePicker />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="location">Location</Label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg h-12"
            type="text"
            id="location"
            placeholder="Location"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="location">Thumbnail</Label>
          <Input className="rounded-lg h-12" type="file" id="file" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Button
            onClick={handleSubmitPackage}
            className="w-full h-12 text-md bg-primary hover:bg-orange-400"
          >
            {!isLoading ? 'Schedule Trip' : <LoadingDots color="#fff" />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateSchedule;
