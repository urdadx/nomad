/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import Link from 'next/link';
import {
  CircleUserRound,
  ChevronRight,
  Heart,
  Globe2,
  Settings,
  History,
} from 'lucide-react';
import BottomNavigator from '@/components/shared/bottom-navigator';

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
      name: 'Previous Trips',
      icon: <Globe2 color="grey" />,
      link: '/previous-trips',
    },
    {
      name: 'Settings',
      icon: <Settings color="grey" />,
      link: '/settings',
    },
    {
      name: 'Version',
      icon: <History color="grey" />,
      link: '/versions',
    },
  ];

  return (
    <>
      <BackNavigator name="Profile" showNotification={true} />
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
          <small className="text-center text-gray-500">
            imanefh28@gmail.com
          </small>
        </div>
      </div>
      <div className="px-4">
        <div className=" w-full h-20 p-2 grid grid-cols-3 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col border-r p-2">
            <small className="font-semibold text-md text-center">
              Reward Points
            </small>
            <small className="flex justify-center text-primary font-semibold text-lg">
              50
            </small>
          </div>
          <div className="flex flex-col border-r p-2">
            <small className="font-semibold text-md text-center">
              Travel Trips
            </small>
            <small className="flex justify-center text-primary font-semibold text-lg">
              30
            </small>
          </div>
          <div className="flex flex-col p-2">
            <small className="font-semibold text-md text-center">
              Bucket List
            </small>
            <small className="flex justify-center text-primary font-semibold text-lg">
              200
            </small>
          </div>
        </div>
      </div>
      <div className="px-4 no-scrollbar">
        <div className="my-4 p-2 border rounded-2xl w-full h-auto bg-card text-card-foreground shadow-sm">
          <div className="grid grid-rows-5 ">
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
      <BottomNavigator />
    </>
  );
};

export default Profile;
