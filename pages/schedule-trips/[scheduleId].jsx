import BackNavigator from '@/components/utils/back-navigator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '@/contexts/context';
import axios from 'axios';
import useCurrentUser from '@/hooks/use-current-user';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';
import { useRouter } from 'next/router';
import useSchedule from '@/hooks/use-schedule';

const EditSchedule = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { query } = router;
  const { scheduleId } = query;

  const { data } = useSchedule(scheduleId);

  const [name, setName] = useState(data?.name);
  const [location, setLocation] = useState(data?.location);
  const { scheduleDate, setScheduleDate } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setLocation(data.location || '');
      setScheduleDate(new Date(data?.scheduleDate));
    }
  }, [data, setScheduleDate]);

  const { currentUser } = useCurrentUser();

  const fileInputRef = useRef(null);
  const [bioImage, setBioImage] = useState('');

  const onLoad = (fileString) => {
    setBioImage(fileString);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoad(reader.result);
      }
    };
  };

  const handleFileSelect = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    const file = files && files[0];
    if (file) {
      getBase64(file);
    }
    setIsLoading(false);
  };

  const image = bioImage;

  const editSchedule = useMutation(
    async ({ name, scheduleDate, location, image }) => {
      await axios.patch(`/api/schedule/${scheduleId}`, {
        name,
        scheduleDate,
        location,
        image,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['schedules', currentUser?.id],
        });
        setIsLoading(false);
        setName('');
        setScheduleDate('');
        setLocation('');
      },
    }
  );

  const handleEditSchedule = async () => {
    setIsLoading(true);
    await toast.promise(
      editSchedule.mutateAsync({
        name,
        scheduleDate,
        location,
        image,
      }),
      {
        loading: 'Editing schedule',
        success: 'Changes added successfully',
        error: 'An error occured',
      }
    );
  };

  return (
    <>
      <BackNavigator name="Edit schedule" cancel={true} />
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
          <Label htmlFor="location">
            Locations (Seperate each location with a comma)
          </Label>
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
          <Label htmlFor="image">Image</Label>
          <Input
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="rounded-lg h-12"
            type="file"
            id="file"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Button
            onClick={handleEditSchedule}
            className="w-full h-12 text-md bg-primary hover:bg-orange-400"
          >
            {!isLoading ? 'Edit Schedule' : <LoadingDots color="#fff" />}
          </Button>
        </div>

        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default EditSchedule;
