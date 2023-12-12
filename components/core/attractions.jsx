/* eslint-disable @next/next/no-img-element */
import { Card, CardFooter } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StarSVG from '../utils/star-svg';
import useAttractionsData from '@/hooks/use-attractions-data';
import { AttractionCardSkeleton } from '../utils/card-skeleton';

const Attractions = () => {
  const { data: attractions, isLoading } = useAttractionsData();

  return (
    <div className="">
      <motion.div
        className="flex flex-row gap-3 w-full overflow-x-scroll no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {!isLoading
          ? attractions?.map((attraction) => {
              return attraction?.map((item) => (
                <div
                  key={item?.place_id}
                  className="no-scrollbar"
                  style={{
                    flex: '0 0 auto',
                    scrollSnapAlign: 'start',
                  }}
                >
                  <AttractionCard
                    id={item?.place_id}
                    img={item?.photos[0].photo_reference}
                    width={item?.photos[0].width}
                    name={item?.name}
                    location={item?.formatted_address}
                    rating={item?.rating}
                  />
                </div>
              ));
            })
          : Array.from({ length: 3 }, (_, index) => (
              <AttractionCardSkeleton key={index} />
            ))}
      </motion.div>
    </div>
  );
};

export default Attractions;

export const AttractionCard = ({ id, width, img, name, location, rating }) => {
  const attractionPhoto = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY}&photoreference=${img}&maxwidth=${width}`;

  return (
    <div className="w-[290px] h-full">
      <Link href={`location-detail/${id}`} className="flex cursor-pointer">
        <Card className="rounded-3xl">
          <div className="p-3 w-[275px] h-[240px]">
            <img
              src={attractionPhoto}
              className="w-full h-full rounded-2xl bg-contain"
              alt="location-img"
            />
          </div>
          <CardFooter className="grid grid-col-3">
            <div className="my-2 flex justify-between items-center">
              <div className="">
                <p className="truncate text-md w-[160px]">{name}</p>
              </div>
              <div className="text-lg flex gap-1 items-center">
                <small>
                  <StarSVG />
                </small>
                <span>{rating}</span>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <MapPin size={20} color="grey" />
              <small className="truncate text-md text-gray-600 w-[200px]">
                {location}
              </small>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
