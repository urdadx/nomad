// eslint-disable-next-line no-undef
import BackNavigator from '@/components/utils/back-navigator';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import { LocateFixed, MapPin } from 'lucide-react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { useState, useRef } from 'react';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';
import { toast } from 'react-hot-toast';
import { CarFront, Footprints, Bike } from 'lucide-react';

const libraries = ['places'];

const SearchLocation = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY,
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState({
    walking: '',
    driving: '',
    motorcycle: '',
  });
  const [destinationLatLng, setDestinationLatLng] = useState(null);
  const [noRouteFound, setNoRouteFound] = useState(false);

  const originRef = useRef();
  const destinationRef = useRef();
  const [loading, setLoading] = useState(false);

  const calculateRouteInfo = async (e) => {
    e.preventDefault();
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    setLoading(true);

    const directionsService = new google.maps.DirectionsService();
    try {
      // Simulate an API call delay of 500 ms
      await new Promise((resolve) => setTimeout(resolve, 500));

      const drivingMode = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      const walkingMode = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.WALKING,
      });

      const motorcycleMode = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.TWO_WHEELER,
      });
      if (drivingMode && drivingMode.routes && drivingMode.routes.length > 0) {
        setDirectionsResponse(drivingMode);
        setDistance(drivingMode.routes[0].legs[0].distance.text);
        setDuration({
          walking: walkingMode.routes[0].legs[0].duration.text,
          driving: drivingMode.routes[0].legs[0].duration.text,
          motorcycle: motorcycleMode.routes[0].legs[0].duration.text,
        });

        // Extract latitude and longitude of the destination
        const destinationLocation = drivingMode.routes[0].legs[0].end_location;
        setDestinationLatLng({
          latitude: destinationLocation.lat(),
          longitude: destinationLocation.lng(),
        });
        setNoRouteFound(false);
      } else {
        setNoRouteFound(true);
      }
    } catch (error) {
      console.error('Error calculating route', error);
      toast.error('No feasible route was found', error);
      setNoRouteFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackNavigator name="Search" cancel={true} />
      <form className="px-4 my-6 flex flex-col gap-y-5">
        <div className="relative">
          {isLoaded ? (
            <Autocomplete>
              <Input
                required
                ref={originRef}
                className="rounded-xl h-12 text-md pl-10 pr-4"
                type="text"
                placeholder="Your Location"
              />
            </Autocomplete>
          ) : (
            <Input
              className="rounded-xl h-12 text-md pl-10 pr-4"
              type="text"
              placeholder="Your Location"
            />
          )}
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LocateFixed size={20} />
          </span>
        </div>
        <div className="relative">
          {isLoaded ? (
            <Autocomplete>
              <Input
                required
                ref={destinationRef}
                className="rounded-xl h-12 text-md pl-10 pr-4"
                type="text"
                placeholder="Destination"
              />
            </Autocomplete>
          ) : (
            <Input
              className="rounded-xl h-12 text-md pl-10 pr-4"
              type="text"
              placeholder="Destination"
            />
          )}
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MapPin size={20} />
          </span>
        </div>
        <div className="relative">
          <Button
            type="submit"
            onClick={calculateRouteInfo}
            className="text-white bg-primary w-full h-12 rounded-xl text-lg font-semibold hover:bg-orange-400"
          >
            {loading ? <LoadingDots /> : <p>Search</p>}
          </Button>
        </div>
      </form>
      <div className="px-4">
        <h2 className="text-lg font-semibold">Search Routes</h2>
      </div>
      {!loading && !noRouteFound && directionsResponse ? (
        <SearchInfo
          duration={duration}
          distance={distance}
          destination={destinationRef.current.value}
          cordinates={destinationLatLng}
        />
      ) : (
        <div className="flex w-full justify-center mt-8">
          <p className="text-center text-lg font-semibold text-zinc-500">
            {noRouteFound
              ? 'No feasible route was found'
              : 'No routes to display'}
          </p>
        </div>
      )}
      <div className="h-[90px]" />
    </>
  );
};

export const SearchInfo = ({ duration, destination, distance, cordinates }) => {
  return (
    <>
      <div className="px-4">
        <div className="my-6 p-2 w-full h-auto rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-2">
            <div className="px-2 flex justify-between">
              <h2 className="truncate w-[300px]">
                <strong className="text-primary">{distance}</strong> to{' '}
                {destination}
              </h2>
            </div>
            <div className="px-4 my-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CarFront size={17} />
                <strong className="truncate w-[65px] text-primary">
                  {duration.driving}
                </strong>
              </div>
              <div className="flex items-center gap-2">
                <Footprints size={17} />
                <strong className="truncate w-[65px] text-primary">
                  {duration.walking}
                </strong>
              </div>
              <div className="flex items-center gap-2">
                <Bike size={17} />
                <strong className="truncate w-[65px] text-primary">
                  {duration.motorcycle}
                </strong>
              </div>
            </div>
            <Link
              href={`/maps-direction?longitude=${cordinates.longitude}&latitude=${cordinates.latitude}&time=${duration.driving}&distance=${distance}&destination=${destination}`}
              className="flex justify-center mt-4"
            >
              <Button className="flex items-center gap-1 bg-primary text-white px-10 rounded-xl">
                <span>Start</span>
                <span>
                  <Navigation size={17} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchLocation;
