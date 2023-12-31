/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import StarSVG from '@/components/utils/star-svg';
import { MapPin } from 'lucide-react';
import { locations } from '@/lib/stock-img-locations';

export const FavoriteLocationCard = ({ data }) => {
  return (
    <div className="">
      <div className="rounded-xl cursor-pointer border bg-card text-card-foreground shadow-sm">
        <div className="gap-y-2 max-w-md h-fit pb-2">
          <img
            src={data.image}
            className="object-cover rounded-t-xl w-full h-[150px]"
            alt="image-location"
          />
          <h2 className="font-semibold px-2 pt-2">{data.name}</h2>
          <div className="flex gap-1 items-center px-2">
            <MapPin size={18} color="grey" />
            <small>{data.location}</small>
          </div>
          <div className="flex gap-2 items-center px-2 h-auto">
            <span className="flex">
              {Array.from({
                length: Math.floor(Math.random() * (4 - 2 + 1)) + 2,
              }).map((_, index) => (
                <StarSVG key={index} />
              ))}
            </span>
            <small>{Math.ceil(Math.random() * (4.0 - 1.9)) + 1.9}</small>
          </div>
          <span className="p-2">
            <small className="text-primary font-semibold">$459/</small>
            <small>Person</small>
          </span>
        </div>
      </div>
    </div>
  );
};

const FavoriteLocation = () => {
  return (
    <>
      <BackNavigator name="Favorite Places" showNotification={true} />
      <div className="my-10 px-4">
        <h2 className="text-xl font-semibold text-slate-700">
          Favorite Places
        </h2>
        <div className="grid grid-cols-2 gap-3 my-4">
          {locations?.map((item, index) => (
            <FavoriteLocationCard data={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteLocation;
