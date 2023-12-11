/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import StarSVG from '@/components/utils/star-svg';
import { MapPin } from 'lucide-react';
import useAttractionsData from '@/hooks/use-attractions-data';
import Link from 'next/link';

export const PopularLocationCard = ({
  id,
  width,
  img,
  name,
  location,
  rating,
}) => {
  const attractionPhoto = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY}&photoreference=${img}&maxwidth=${width}`;
  return (
    <Link href={`/location-detail/${id}`} className="">
      <div className="rounded-xl cursor-pointer border bg-card text-card-foreground shadow-sm">
        <div className="gap-y-2 max-w-md h-fit pb-2">
          <img
            src={attractionPhoto}
            className="object-cover rounded-t-xl w-full h-[150px]"
            alt="image-location"
          />
          <h2 className="font-semibold px-2 pt-2 w-[150px] truncate">{name}</h2>
          <div className="flex gap-1 items-center px-2 w-[150px] truncate">
            <MapPin size={18} color="grey" />
            <small className="">{location}</small>
          </div>
          <div className="flex gap-2 items-center px-2 h-auto">
            <span className="flex">
              <StarSVG />
            </span>
            <small>{rating}</small>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PopularLocation = () => {
  const { data: attractions, isLoading } = useAttractionsData();
  return (
    <>
      <BackNavigator name="Popular Places" showNotification={true} />
      <div className="my-10 px-4">
        <h2 className="text-xl font-semibold text-slate-700">
          All Popular Places
        </h2>
        <div className="grid grid-cols-2 gap-3 my-4">
          {!isLoading
            ? attractions?.map((attraction) => {
                return attraction?.map((item, index) => (
                  <>
                    <div
                      key={item?.place_id}
                      className="no-scrollbar"
                      style={{
                        flex: '0 0 auto',
                        scrollSnapAlign: 'start',
                      }}
                    >
                      <PopularLocationCard
                        id={item?.place_id}
                        img={item?.photos[0].photo_reference}
                        width={item?.photos[0].width}
                        name={item?.name}
                        location={item?.formatted_address}
                        rating={item?.rating}
                        key={index}
                      />
                    </div>
                  </>
                ));
              })
            : Array.from({ length: 6 }, (_, index) => (
                <PopularLocationSkeleton key={index} />
              ))}
        </div>
        <div className="h-[100px]" />
      </div>
    </>
  );
};

export default PopularLocation;

export const PopularLocationSkeleton = () => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="gap-y-2 max-w-md h-fit pb-2">
        <div className="rounded-t-xl w-full h-[130px] bg-gray-100"></div>
        <div className="font-semibold px-2 pt-2 w-full truncate bg-gray-100"></div>
        <div className="flex gap-1 items-center px-2 w-full truncate bg-gray-100">
          <small className="bg-gray-300"></small>
        </div>
        <div className="flex gap-2 items-center my-2 animate-pulse px-2 h-auto bg-gray-100">
          <span className="flex bg-gray-100 "></span>
        </div>
      </div>
    </div>
  );
};
