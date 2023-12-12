/* eslint-disable @next/next/no-img-element */
import { Card, CardFooter } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import usePackagesData from '@/hooks/use-packages-data';
import { AttractionCardSkeleton } from './card-skeleton';

export const DestinationCard = ({ tripId, img, name, location, cost }) => {
  return (
    <div className="w-[290px] h-full">
      <Link
        href={`/trip-packages/${tripId}`}
        className="px-4 flex gap-4 cursor-pointer"
      >
        <Card className="rounded-3xl">
          <div className="p-3 bg-cover w-full h-[240px] sm:w-[265px]">
            <img
              src={img}
              className=" w-full h-full rounded-2xl"
              alt="location-img"
            />
          </div>
          <CardFooter className="grid grid-col-3">
            <div className="my-2 flex justify-between items-center">
              <div className="">
                <p className="text-md w-[160px] truncate">{name}</p>
              </div>
              <span className="font-semibold text-md text-primary">
                ${cost}
              </span>
            </div>
            <div className="flex gap-x-2 items-center">
              <MapPin size={20} color="grey" />
              <small className="w-[150px] truncate text-md text-gray-600">
                {location}
              </small>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

const Packages = () => {
  const { data: packages, isLoading } = usePackagesData();

  return (
    <div className="">
      <motion.div
        className="flex flex-row gap-3 w-full overflow-x-scroll no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {!isLoading
          ? packages?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="no-scrollbar"
                  style={{
                    flex: '0 0 auto',
                    scrollSnapAlign: 'start',
                  }}
                >
                  <DestinationCard
                    img={item.thumbnail}
                    name={item.name}
                    location={item.location}
                    cost={item.cost}
                    tripId={item?.tripId}
                  />
                </div>
              );
            })
          : Array.from({ length: 3 }, (_, index) => (
              <AttractionCardSkeleton key={index} />
            ))}
      </motion.div>
    </div>
  );
};

export default Packages;
