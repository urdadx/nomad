/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import Link from 'next/link';
import {
  CircleUserRound,
  ChevronRight,
  Heart,
  LogOut,
  Settings,
  History,
} from 'lucide-react';
import useCurrentUser from '@/hooks/use-current-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigators = [
    {
      name: 'Profile',
      icon: <CircleUserRound color="grey" />,
      link: '/update-profile',
    },
    {
      name: 'Favorites',
      icon: <Heart color="grey" />,
      link: '/favorite-places',
    },

    {
      name: 'Settings',
      icon: <Settings color="grey" />,
      link: '/settings',
    },
    {
      name: 'Sign out',
      icon: <LogOut color="grey" />,
      link: '#',
    },
  ];

  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <BackNavigator name="Profile" showNotification={true} />
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
          <small className="text-center text-primary">
            {currentUser?.email}
          </small>
        </div>
      </div>

      <div className="px-4 no-scrollbar">
        <div className="my-4 p-2 border rounded-2xl w-full h-auto bg-card text-card-foreground shadow-sm">
          <div className="grid grid-rows-4 ">
            {navigators?.map((item, index) => {
              return (
                <div key={index}>
                  <Link className="" href={item.link}>
                    <div className="flex justify-between mb-2 p-4 cursor-pointer rounded-xl hover:bg-gray-100">
                      <div className="flex gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <div className="">
                        <ChevronRight color="grey" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default Profile;
