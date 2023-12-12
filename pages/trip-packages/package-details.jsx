/* eslint-disable @next/next/no-img-element */
import { Oval } from 'react-loader-spinner';
import { Users, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackNavigator from '@/components/utils/back-navigator';

const PackageDetails = ({ data, isLoading }) => {
  const inputDateString = data?.tripdate;
  const inputDate = new Date(inputDateString);

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = inputDate.toLocaleDateString('en-US', options);
  return (
    <>
      {!isLoading ? (
        <section>
          <div className="relative w-full">
            <BackNavigator name="Details" isTransparent={true} cancel={true} />

            <div className="bg-contain w-full h-[450px] ">
              <img
                src={data?.thumbnail}
                className="w-full h-full object-cover lg:rounded-xl"
                alt="image-location"
              />
            </div>
          </div>
          <div className="w-full h-screen mb-6">
            <div className="px-4 my-4 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg">{data?.name}</h2>
                <small className="text-gray-500">{data?.location}</small>
              </div>
            </div>

            <div className="px-4 my-6 flex flex-col gap-2">
              <h2 className="font-semibold text-xl">
                <span>Description</span>
              </h2>
              <p className="text-gray-500 text-justify flex items-center gap-1">
                The Empire of Ghana formed in 300AD when different tribes of the
                Soninke people were united under the first king, Dinga Cisse.
                The Soninke people used the word Ghana, meaning Warrior King to
                refer to the king, and the Empire&apos;s enemies and allies
                subsequently began to refer to the region as Ghana.
              </p>
            </div>
            <div className="px-4 my-4 flex flex-col gap-2">
              <h2 className="font-semibold text-xl">
                <span>Number of spots</span>
              </h2>
              <p className="text-gray-500 text-justify flex items-center gap-1">
                <span>
                  <Users color="grey" size={18} />
                </span>
                {data?.numSpots} seats left
              </p>
            </div>
            <div className="px-4 my-8 flex flex-col gap-2">
              <h2 className="font-semibold text-xl">
                <span>Date</span>
              </h2>
              <p className="text-gray-500 text-justify flex items-center gap-2">
                <span>
                  <Users color="grey" size={18} />
                </span>
                {formattedDate}
              </p>
            </div>
            <div className="px-4 my-4 flex flex-col gap-2">
              <h2 className="font-semibold text-xl">
                <span>Cost</span>
              </h2>
              <p className="text-gray-500 text-justify flex items-center gap-1">
                <span>
                  <CircleDollarSign color="grey" size={18} />
                </span>
                {data?.cost} USD
              </p>
            </div>
            <div className="bottom-0 px-4 inset-x-0">
              <Button className="bg-primary w-full h-12 text-lg hover:bg-orange-600">
                Book a seat
              </Button>
            </div>
            <div className="h-[50px]" />
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

export default PackageDetails;
