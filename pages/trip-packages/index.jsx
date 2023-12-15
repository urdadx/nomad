/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { CalendarDays } from 'lucide-react';
import useCurrentUser from '@/hooks/use-current-user';
import usePackagesData from '@/hooks/use-packages-data';
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';
import { Eye, Trash, Pen } from 'lucide-react';
import { Drawer } from 'vaul';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

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
  const queryClient = useQueryClient();

  const { data: currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';
  console.log(isAdmin);

  const deleteMutation = useMutation(
    async () => {
      await axios.delete(`/api/packages/${tripId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['packages', currentUser?.id],
        });
      },
    }
  );

  const handleDeletePackage = async () => {
    await toast.promise(deleteMutation.mutateAsync(), {
      loading: 'Deleting package',
      success: 'Package deleted successfully',
      error: 'An error occured',
    });
  };

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Link href="#">
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
                  <small className="text-gray-500 text-md">
                    {formattedDate}
                  </small>
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
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content className="bg-white lg:w-[395px] mx-auto flex flex-col rounded-t-[20px] lg:h-[30%] h-[25%] mt-24 fixed bottom-0 left-0 right-0 border">
          <div className="px-6 mt-8 mb-4 bg-white w-full rounded-4xl cursor-pointer  flex items-center gap-4 hover:bg-zinc">
            <Eye className="text-zinc-500" />
            <span className="font-semibold text-lg text-zinc-500">
              <Link href={`/trip-packages/${tripId}?view=${true}`}>
                View details
              </Link>
            </span>
          </div>
          <div className="px-6 mt-2 mb-6 bg-white w-full rounded-4xl cursor-pointer  flex items-center gap-4 hover:bg-zinc">
            <Pen className="text-zinc-500" />
            <span className="font-semibold text-lg text-zinc-500">
              <Link href={`/trip-packages/${tripId}?view=${false}`}>
                Edit package
              </Link>
            </span>
          </div>
          <div
            onClick={handleDeletePackage}
            className="px-6 mb-4 bg-white w-full rounded-4xl cursor-pointer flex items-center gap-4 hover:bg-zinc"
          >
            <Trash className="text-red-400" size={24} />
            <span className="font-semibold text-lg text-red-400">Delete</span>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
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
