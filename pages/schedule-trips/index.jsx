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
import { ScheduleForm } from '@/components/core/schedule-download';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import { Download } from 'lucide-react';

export const Trip = ({ scheduleId, image, name, location, date }) => {
  const formatDate = (dateObj) => {
    const dateString = dateObj.toString();
    const date = new Date(dateString);

    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      date
    );
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  const formattedDate = formatDate(date);

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

  const [loading, setIsLoading] = useState(false);

  const downloadPDF = async () => {
    try {
      setIsLoading(true);
      await toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            const capture = document.querySelector('.schedule-ref');
            html2canvas(capture, { scale: 2 }).then((canvas) => {
              const imgData = canvas.toDataURL('img/png');
              const doc = new jsPDF('p', 'mm', 'a4');
              const componentWidth = doc.internal.pageSize.getWidth();
              const componentHeight = doc.internal.pageSize.getHeight();
              doc.addImage(
                imgData,
                'PNG',
                0,
                0,
                componentWidth,
                componentHeight
              );
              setIsLoading(false);
              doc.save('trip-schedule.pdf');
              resolve();
            });
          }, 500);
        }),
        {
          loading: 'Downloading...',
          success: 'Download complete!',
          error: 'Download failed',
        }
      );
    } catch (error) {
      console.error('Error during PDF download:', error);
      setIsLoading(false);
      toast.error('Download failed');
    }
  };
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
        <div
          onClick={downloadPDF}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span className="text-primary text-sm font-semibold">Download</span>
          <span>
            <Download size={20} className="text-primary font-semibold" />
          </span>
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
        <div
          className={
            loading ? 'w-full h-full schedule-ref block' : 'schedule-ref hidden'
          }
        >
          <ScheduleForm schedules={schedules} />
        </div>
        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default ScheduleTrips;
