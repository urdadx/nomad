/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { CalendarDays } from 'lucide-react';
import useCurrentUser from '@/hooks/use-current-user';
import usePackagesData from '@/hooks/use-packages-data';
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';
import { Trash, Pen } from 'lucide-react';
import { Drawer } from 'vaul';

export const Package = ({ id, name, date, image, spots, cost, tripId }) => {
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

  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <Drawer.Root shouldScaleBackground>
      <Link href={`/trip-packages/${tripId}`}>
        <div className="w-full cursor-pointer mb-4 p-2 h-[125px] flex gap-x-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="w-[120px] h-full">
            <img
              src={image}
              alt="image-location"
              loading="lazy"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="">
            <div className="flex flex-col">
              <h2 className="text-lg w-[190px] truncate font-semibold ">
                {name}
              </h2>
              <div className="flex items-center gap-2">
                <CalendarDays color="grey" size={17} />
                <small className="text-gray-500 text-md">{formattedDate}</small>
              </div>
              <div className="flex gap-2 items-center pt-1">
                <div className="flex">
                  <small className="text-md">{spots} spots left</small>
                </div>
              </div>
              <div className="pt-1 flex justify-between items-center">
                <div className="p-1 px-2 w-fit h-auto bg-primary rounded-lg">
                  <span className="font-semibold text-white">${cost}</span>
                </div>
                {isAdmin && (
                  <div className="p-1 px-2 flex items-center gap-2 w-fit h-auto rounded-lg ">
                    <Link href={`/trip-packages/${tripId}`}>
                      <Trash size={20} className="text-red-600" />
                    </Link>
                    <span className="flex items-center gap-4">
                      <Pen size={20} color="grey" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Drawer.Root>
  );
};

const TripPackages = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: packages, isLoading } = usePackagesData(currentUser?.id);
  const isAdmin = currentUser?.role === 'admin';
  return (
    <>
      {!isAdmin ? (
        <BackNavigator name="Popular Packages" cancel={true} />
      ) : (
        <BackNavigator name="Popular Packages" addButton2={true} />
      )}
      <div className="my-10 px-4">
        <h2 className="text-xl font-semibold text-slate-700">
          All Popular Trip Packages
        </h2>
        <div className="flex flex-col gap-3 my-4">
          {!isLoading ? (
            packages
              ?.map((item, index) => {
                return (
                  <Package
                    key={index}
                    name={item?.name}
                    image={item?.thumbnail}
                    date={item?.tripdate}
                    spots={item?.numSpots}
                    cost={item?.cost}
                    id={item?.id}
                    tripId={item?.tripId}
                  />
                );
              })
              .reverse(-1)
          ) : (
            <div className="flex justify-center items-center h-full mt-16">
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
        </div>
        {packages?.length === 0 && (
          <p className="font-semibold my-24 text-center text-gray-600 text-lg">
            No trip packages available 😢
          </p>
        )}
        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default TripPackages;
