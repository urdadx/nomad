/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { CalendarDays } from 'lucide-react';
import { locations } from '@/lib/stock-img-locations';

export const Package = ({ data }) => {
  return (
    <>
      <div className="w-full cursor-pointer mb-4 p-2 h-[125px] flex gap-x-4 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="w-[120px] h-full">
          <img
            src={data.image}
            alt="image-location"
            loading="lazy"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold ">{data.name}</h2>
            <div className="flex items-center gap-2">
              <CalendarDays color="grey" size={17} />
              <small className="text-gray-500 text-md">23 January 2023</small>
            </div>
            <div className="flex gap-2 items-center pt-1">
              <div className="flex">
                <small className="text-md">24 spots left</small>
              </div>
            </div>
            <div className="pt-1">
              <div className="p-1 px-2 w-fit h-auto bg-primary rounded-lg">
                <span className="font-semibold text-white">
                  ${Math.floor(Math.random() * 999)}
                </span>
              </div>
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
      <BackNavigator name="Popular Packages" addButton2={true} />
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
