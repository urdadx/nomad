/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import StarSVG from '@/components/utils/star-svg';
import { Wifi, Utensils, Bath, Waves, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactReadMoreReadLess from 'react-read-more-read-less';

const LocationDetail = () => {
  return (
    <>
      <div className="relative w-full">
        <BackNavigator name="Detail" isTransparent={true} bookmark={true} />
        <div className="bg-contain w-full h-[450px] ">
          <img
            src="/assets/2.jpg"
            className="w-full h-full object-cover lg:rounded-xl"
            alt="image-location"
          />
        </div>
      </div>
      <div className="w-full h-screen mb-6">
        <div className="px-4 my-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">Black Star Square</h2>
            <small className="text-gray-500">Accra Beach Road</small>
          </div>
          <div className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full">
            <Heart color="red" size={20} />
          </div>
        </div>
        <div className="px-6 grid grid-cols-3 gap-8">
          <div className="flex items-center gap-1">
            <small className="text-lg text-gray-500">Accra</small>
            <MapPin color="grey" size={17} />
          </div>
          <div className="flex items-center gap-1">
            <StarSVG />
            <small className="text-lg text-gray-500">4.9(280)</small>
          </div>
          <div className="flex items-center">
            <small className="text-lg font-semibold text-primary">$80/</small>
            <small className="text-md">Person</small>
          </div>
        </div>
        <div className="container my-8 grid grid-cols-4 gap-2">
          <div className="flex items-center gap-1">
            <div className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-3xl">
              <Wifi color="grey" size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-3xl">
              <Utensils color="grey" size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-3xl">
              <Bath color="grey" size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-3xl">
              <Waves color="grey" size={20} />
            </div>
          </div>
        </div>
        <div className="px-4 my-8 flex flex-col gap-2">
          <h2 className="font-semibold text-xl">About Destination</h2>
          <p className="text-gray-500 text-justify">
            <ReactReadMoreReadLess
              charLimit={400}
              readMoreText={'Read more'}
              readLessText={'Read less'}
            >
              Black Star Square, also known as Independence Square, is a major
              and important public square, located in the heart of the capital
              city of the Republic of Ghana, Accra. Commissioned by the first
              prime minister and president of Ghana, Kwame Nkrumah, to honor the
              visit of Queen Elizabeth II, it was constructed in 1961 and so far
              it has been used for all major national public gatherings and
              national festivals, in addition to the most important event which
              is the parade for Ghana&apos;s Independence Day.
            </ReactReadMoreReadLess>
          </p>
        </div>
        <div className="bottom-0 px-4 inset-x-0">
          <Button className="bg-primary w-full h-12 text-lg hover:bg-orange-600">
            Visit Location
          </Button>
        </div>
      </div>
    </>
  );
};

export default LocationDetail;
