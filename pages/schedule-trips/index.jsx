/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { MapPin, CalendarDays } from 'lucide-react';
import BottomNavigator from '@/components/shared/bottom-navigator';
import { locations } from '@/lib/stock-img-locations';

export const Trip = ({ data }) => {
  return (
    <>
      <div className="w-full mb-4 p-2 h-[120px] flex gap-4 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="w-[120px] h-full">
          <img
            src={data.image}
            alt="image-location"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col py-2">
          <div className="flex items-center gap-2">
            <CalendarDays color="grey" size={17} />
            <small className="text-gray-500 text-md">23 January 2023</small>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold pt-2">{data.name}</h2>
            <div className="flex gap-x-2 items-center py-1">
              <MapPin color="grey" size={17} />
              <span className="text-gray-600">{data.location}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ScheduleTrips = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <BackNavigator name="Schedule" showNotification={true} />
      <div className="container my-6 flex justify-center ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-2xl border w-fit"
        />
      </div>
      <div className="px-4 flex justify-between items-center">
        <div className="flex items-center gap-1 text-gray-600 text-lg">
          <span>My Schedule</span>
        </div>
      </div>
      <div className="px-4 mt-4  h-full no-scrollbar">
        {locations.map((data, index) => (
          <Trip key={index} data={data} />
        ))}
        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default ScheduleTrips;
