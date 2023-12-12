import BackNavigator from '@/components/utils/back-navigator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '@/contexts/context';
import axios from 'axios';
import useCurrentUser from '@/hooks/use-current-user';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';
import { nanoid } from 'nanoid';

const AddTripPackage = () => {
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [numSpots, setNumSpots] = useState(0);
  const [cost, setCost] = useState();
  const [tripId, setTripId] = useState(nanoid(20));
  const { tripdate, setTripDate } = useStore();

  const [isLoading, setIsLoading] = useState(false);

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

  const thumbnail = bioImage;

  const addTripPackage = useMutation(
    async ({ name, tripdate, location, numSpots, cost, thumbnail, tripId }) => {
      await axios.post('/api/packages/add-package', {
        name,
        tripdate,
        location,
        numSpots,
        cost,
        thumbnail,
        tripId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['trip-packages', currentUser?.id],
        });
        setIsLoading(false);
        setName('');
        setTripDate('');
        setLocation('');
        setNumSpots(0);
        setTripId('');
        setCost(0);
      },
    }
  );

  const handleSubmitPackage = async () => {
    setIsLoading(true);
    await toast.promise(
      addTripPackage.mutateAsync({
        name,
        tripdate,
        location,
        numSpots,
        cost,
        thumbnail,
        tripId,
      }),
      {
        loading: 'Creating package',
        success: 'Package added successfully',
        error: 'An error occured',
      }
    );
  };

  return (
    <>
      <BackNavigator name="Add trip package" cancel={true} />
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
          <DatePicker />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="location">
            Location (Seperate each location with a comma)
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
          <Label htmlFor="spots">Number of spots</Label>
          <Input
            value={numSpots}
            onChange={(e) => setNumSpots(e.target.value)}
            className="rounded-lg h-12"
            type="number"
            id="spots"
            placeholder="Enter number of spots"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="cost">Package cost</Label>
          <Input
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="rounded-lg h-12"
            type="number"
            id="cost"
            placeholder="Cost (USD)"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="image">Thumbnail</Label>
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
            onClick={handleSubmitPackage}
            className="w-full h-12 text-md bg-primary hover:bg-orange-400"
          >
            {!isLoading ? 'Add Package' : <LoadingDots color="#fff" />}
          </Button>
        </div>
        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default AddTripPackage;
