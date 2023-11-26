/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { CalendarDays } from 'lucide-react';
import StarSVG from '@/components/utils/star-svg';
import { locations } from '@/lib/stock-img-locations';

export const Package = ({ data }) => {
  return (
    <>
      <div className="w-full mb-4 p-2 h-[117px] flex gap-x-4 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="w-[120px]">
          <img
            src={data.image}
            alt="image-location"
            className="object-contain w-full rounded-xl"
          />
        </div>
        <div className="">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold ">{data.name}</h2>
            <div className="flex items-center gap-2">
              <CalendarDays color="grey" size={17} />
              <small className="text-gray-500 text-md">23 January 2023</small>
            </div>
            <div className="flex gap-2 items-center pt-1 overflow-scroll">
              <span className="flex">
                {Array.from({
                  length: Math.floor(Math.random() * (4 - 2 + 1)) + 2,
                }).map((_, index) => (
                  <StarSVG key={index} />
                ))}
              </span>
              <small>{Math.ceil(Math.random() * (4.0 - 1.9)) + 1.9}</small>
            </div>
            <div className="pt-1 flex items-center gap-2">
              <div className="-space-x-3 avatar-group justify-start">
                {Array.from({
                  length: 3,
                }).map((_, index) => (
                  <div key={index} className="avatar w-[25px] h-[25px]">
                    <img
                      alt="people-avatar"
                      fetchpriority="high"
                      className="rounded-full"
                      style={{ color: 'transparent' }}
                      src="https://avatars.githubusercontent.com/u/70736338?v=4"
                    />
                  </div>
                ))}
              </div>
              <small className="text-gray-500">
                {Math.floor(Math.random() * (5 - 2 + 1) + 2)} People Joined
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TripPackages = () => {
  return (
    <>
      <BackNavigator name="Popular Packages" />
      <div className="my-10 px-4">
        <h2 className="text-xl font-semibold text-slate-700">
          All Popular Trip Packages
        </h2>
        <div className="flex flex-col gap-3 my-4">
          {locations.map((item, index) => {
            return <Package key={index} data={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default TripPackages;
