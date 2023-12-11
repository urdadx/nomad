/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import StarSVG from '@/components/utils/star-svg';
import { MapPin, Heart, Phone } from 'lucide-react';
import { Oval } from 'react-loader-spinner';
import { Button } from '@/components/ui/button';
import useAttractionsDetails from '@/hooks/use-attractions-details';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReviewCard from '@/components/utils/review-card';

const LocationDetail = () => {
  const router = useRouter();

  const { query } = router;
  const { placeId } = query;
  const { data, isLoading } = useAttractionsDetails(placeId);

  const [cordinates, setCordinates] = useState(data?.geometry.location);

  const attractionPhoto = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY}&photoreference=${data?.photos[0].photo_reference}&maxwidth=${data?.photos[0].width}`;

  return (
    <>
      {!isLoading ? (
        <section>
          <div className="relative w-full">
            <BackNavigator name="Detail" isTransparent={true} bookmark={true} />
            <div className="bg-contain w-full h-[450px] ">
              <img
                src={attractionPhoto}
                className="w-full h-full object-cover lg:rounded-xl"
                alt="image-location"
              />
            </div>
          </div>
          <div className="w-full h-screen mb-6">
            <div className="px-4 my-6 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="w-[200px] truncate font-semibold text-lg">
                  {data?.name}
                </h2>
                <small className="text-gray-500">
                  {data?.formatted_address}
                </small>
              </div>
              <div className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full">
                <Heart color="red" size={20} />
              </div>
            </div>
            <div className="px-6 flex items-center gap-8">
              <div className="flex items-center gap-1">
                <small className=" text-lg text-gray-500">
                  {data?.address_components[2].long_name}
                </small>
                <MapPin color="grey" size={17} />
              </div>
              <div className="flex items-center gap-1 w-[120px]">
                <StarSVG />
                <small className="text-lg text-gray-500">
                  {data?.rating}({data?.user_ratings_total})
                </small>
              </div>
              <div className="flex items-center">
                <small className="text-lg font-semibold text-primary">
                  Opened
                </small>
              </div>
            </div>

            <div className="px-4 my-8 flex flex-col gap-2">
              <h2 className="font-semibold text-xl">
                <span>Contact Details</span>
              </h2>
              {data?.international_phone_number ? (
                <p className="text-gray-500 text-justify flex items-center gap-1">
                  <span>
                    <Phone color="grey" size={18} />
                  </span>
                  {data?.international_phone_number}
                </p>
              ) : (
                'No details available'
              )}
            </div>
            <div className="px-4 my-8 flex flex-col gap-2">
              <h2 className="font-semibold text-xl flex items-center gap-1">
                <span>Reviews</span>
                <span className="text-primary">({data?.reviews.length})</span>
              </h2>
              <div
                className="flex flex-row gap-3 w-full overflow-x-scroll no-scrollbar"
                style={{
                  scrollSnapType: 'x mandatory',
                }}
              >
                {data?.reviews
                  ? data?.reviews.map((item, index) => {
                      return (
                        <div
                          key={item?.place_id}
                          className="no-scrollbar"
                          style={{
                            flex: '0 0 auto',
                            scrollSnapAlign: 'start',
                          }}
                        >
                          <ReviewCard
                            name={item.author_name}
                            image={item.profile_photo_url}
                            rating={item.rating}
                            text={item.text}
                            key={index}
                          />
                        </div>
                      );
                    })
                  : 'No review available'}
              </div>
            </div>
            <div className="bottom-0 px-4 inset-x-0">
              <Button className="bg-primary w-full h-12 text-lg hover:bg-orange-600">
                Visit Location
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
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
    </>
  );
};

export default LocationDetail;
