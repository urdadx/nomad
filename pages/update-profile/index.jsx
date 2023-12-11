import BackNavigator from '@/components/utils/back-navigator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useCurrentUser from '@/hooks/use-current-user';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';

const UpdateProfile = () => {
  const { data: currentUser } = useCurrentUser();

  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const queryClient = useQueryClient();

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsername(currentUser?.name);
    setImage(currentUser?.image);
    setPhone(currentUser?.phone);
    setEmail(currentUser?.email);
  }, [
    currentUser?.email,
    currentUser?.image,
    currentUser?.name,
    currentUser?.phone,
  ]);

  // edit profile details
  const editMutation = useMutation(
    async ({ username, image, phone }) => {
      await axios.patch('/api/users/edit-profile', {
        username,
        image,
        phone,
      });
      setIsLoading(true);
    },
    {
      onError: () => {
        setIsLoading(false);
        toast.error('An error occurred');
      },
      onSuccess: () => {
        setIsLoading(false);
        queryClient.invalidateQueries('users');
        toast.success('Changes applied');
      },
    }
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    await editMutation.mutateAsync({ username, image, phone });
  };

  return (
    <>
      <BackNavigator name="Edit Profile" cancel={true} />
      <div className="my-6 flex justify-center">
        <div className="bg-contain flex flex-col items-center">
          <Avatar className="rounded-full w-[120px] h-[120px] border-2 border-primary">
            <AvatarImage
              className="object-contain w-full h-full rounded-full"
              src={currentUser?.image}
              alt={`@${currentUser?.name}`}
            />
            <AvatarFallback>{currentUser?.name}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-center py-2">
            {currentUser?.name}
          </h2>
          <small className="font-semibold text-center">
            <Link href="#" className="text-primary">
              Change profile picture
            </Link>
          </small>
        </div>
      </div>

      <div className="px-6 h-full no-scrollbar">
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="email">Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg h-12"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg h-12"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="email">Phone Number</Label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg h-12"
            type="number"
            id="phone"
            placeholder="Phone Number"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Button
            onClick={handleSubmit}
            className="w-full h-12 text-md bg-primary hover:bg-orange-400"
          >
            {!loading ? 'Update Profile' : <LoadingDots color="#fff" />}
          </Button>
        </div>
      </div>
      <div className="h-[100px]" />
    </>
  );
};

export default UpdateProfile;
