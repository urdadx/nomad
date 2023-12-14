/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';
import { MapPin, CalendarDays } from 'lucide-react';
import useSchedulesData from '@/hooks/use-schedules-data';
import useCurrentUser from '@/hooks/use-current-user';
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';
import { Trash, Pen, Eye } from 'lucide-react';

export const Trip = ({ scheduleId, image, name, location, date }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  const scheduleDate = date;

  useEffect(() => {
    setFromDate(scheduleDate.from);
    setToDate(scheduleDate.to);

    const formattedFromDate = new Date(scheduleDate.from).toLocaleDateString(
      'en-US',
      {
        day: 'numeric',
        month: 'short',
      }
    );

    const formattedToDate = new Date(scheduleDate.to).toLocaleDateString(
      'en-US',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );

    setFormattedDate(`${formattedFromDate} - ${formattedToDate}`);
  }, [scheduleDate.from, scheduleDate.to]);

  return (
    <>
      <Link href={`/schedule-trips/${scheduleId}`}>
        <div className="w-full cursor-pointer mb-4 p-2 h-[120px] flex gap-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="w-[120px] h-full">
            <img
              src={image}
              alt="image-location"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col py-2">
            <div className="flex items-center gap-2">
              <CalendarDays color="grey" size={17} />
              <small className="text-gray-500 text-md">{formattedDate}</small>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold pt-2 w-[180px] truncate">
                {name}
              </h2>
              <div className="flex gap-x-2 items-center py-1">
                <MapPin color="grey" size={17} />
                <span className="w-[180px] truncate text-gray-600">
                  {location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

const ScheduleTrips = () => {
  const [date, setDate] = useState(new Date());

  const { data: currentUser } = useCurrentUser();
  const { data: schedules, isLoading } = useSchedulesData(currentUser?.id);
  return (
    <>
      <BackNavigator name="Schedule" addButton={true} />
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
        {!isLoading ? (
          schedules?.map((item, index) => (
            <Trip
              id={item?.id}
              scheduleId={item?.scheduleId}
              key={index}
              name={item?.name}
              date={item?.scheduleDate}
              image={item?.image}
              location={item?.location}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full my-6">
            <div className="flex justify-center">
              <Oval
                height={55}
                width={55}
                color="orange"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="orange"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </div>
          </div>
        )}
        {schedules?.length === 0 && (
          <p className="font-semibold text-center text-gray-600 text-xl">
            You have no scheduled trips
          </p>
        )}
        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default ScheduleTrips;
