/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const UpdateProfile = () => {
  return (
    <>
      <BackNavigator name="Edit Profile" pen={true} />
      <div className="my-6 flex justify-center">
        <div className="block bg-contain">
          <div className="rounded-full w-[120px] h-[120px] border-2 border-primary">
            <img
              className="object-contain w-full h-full rounded-full"
              src="https://avatars.githubusercontent.com/u/70736338?v=4"
              alt="pfp"
            />
          </div>
          <h2 className="text-xl font-semibold text-center py-2">Imane fh</h2>
          <small className="font-semibold">
            <Link href="#" className="text-center text-primary ">
              Change profile picture
            </Link>
          </small>
        </div>
      </div>
      <div className="px-6 h-full no-scrollbar">
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="email">Username</Label>
          <Input
            className="rounded-lg h-12"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            className="rounded-lg h-12"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="email">Location</Label>
          <Input
            className="rounded-lg h-12"
            type="text"
            id="location"
            placeholder="Location"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="email">Phone Number</Label>
          <Input
            className="rounded-lg h-12"
            type="number"
            id="phone"
            placeholder="Phone Number"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Button className="w-full h-12 text-md bg-primary hover:bg-orange-400">
            Update Profile
          </Button>
        </div>
      </div>
      <div className="h-[100px]" />
    </>
  );
};

export default UpdateProfile;
