import BackNavigator from '@/components/utils/back-navigator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import useCurrentUser from '@/hooks/use-current-user';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState, useRef } from 'react';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/contexts/context';
import { nanoid } from 'nanoid';

const CreateSchedule = () => {
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const { scheduleDate, setScheduleDate } = useStore();
  const [scheduleId, setScheduleId] = useState(nanoid(20));

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(
    'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'
  );

  const onLoad = (fileString) => {
    setImage(fileString);
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
      // File size validation
      if (file.size > 1024 * 1024) {
        toast.error('File size should not exceed 1MB');
        setIsLoading(false);
        return;
      }

      // Check if the selected file is an image
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        setIsLoading(false);
        return;
      }

      getBase64(file);
    }
    setIsLoading(false);
  };

  const addScheduleTrip = useMutation(
    async ({ name, scheduleDate, location, image, scheduleId }) => {
      await axios.post('/api/schedule/add-schedule', {
        name,
        scheduleDate,
        location,
        image,
        scheduleId,
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
        setScheduleId('');
      },
      onError: () => {
        setIsLoading(false);
      },
    }
  );

  const handleSubmitSchedule = async () => {
    if (name.trim() === '' || !scheduleDate || !location) {
      toast.error('Please fill the form');
      return;
    }
    setIsLoading(true);
    await toast.promise(
      addScheduleTrip.mutateAsync({
        name,
        scheduleDate,
        location,
        image,
        scheduleId,
      }),
      {
        loading: 'Creating schedule',
        success: 'Schedule created ',
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
          <Input
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileSelect}
            className="rounded-lg h-12"
            type="file"
            id="file"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Button
            onClick={handleSubmitSchedule}
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
