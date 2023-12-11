/* eslint-disable @next/next/no-img-element */
import { Card, CardFooter } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import StarSVG from './star-svg';
import { motion } from 'framer-motion';
import { locations } from '@/lib/stock-img-locations';

export const DestinationCard = ({ img, name, location, rating }) => {
  return (
    <div className="w-[290px] h-full">
      <Link href="/location-detail" className="px-4 flex gap-4 cursor-pointer">
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
                <p className="text-lg">{name}</p>
              </div>
              <div className="text-lg flex gap-1 items-center">
                <small>
                  <StarSVG />
                </small>
                <span>4.9</span>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <MapPin size={20} color="grey" />
              <small className="text-md text-gray-600">{location}</small>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

const SlidingCarousel = () => {
  return (
    <div className="">
      <motion.div
        className="flex w-full overflow-x-scroll no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {locations?.map((item, index) => {
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
                img={item.image}
                name={item.name}
                location={item.location}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SlidingCarousel;
