/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { Button } from '@/components/ui/button';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Rings } from 'react-loader-spinner';
import { useRouter } from 'next/router';

const libraries = ['places'];

const MapsDirection = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY,
    libraries,
  });

  const [center, setCenter] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [destination, setDestination] = useState('');
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const [openDrawer, setOpenDrawer] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    const { longitude, latitude, time, distance, destination } = query;

    if (longitude && latitude && time && distance && destination) {
      const markerCoordinates = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };

      setCenter(markerCoordinates);
      setDistance(distance);
      setDuration(time);
      setDestination(destination);
    }
  }, [router, router.query]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Rings
          height="120"
          width="120"
          color="orange"
          radius="610"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-auto absolute">
        <div className="lg:w-[382px] w-full h-screen">
          <GoogleMap
            center={center}
            zoom={13}
            mapContainerStyle={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            <DirectionsRenderer />
          </GoogleMap>
        </div>
      </section>

      <Drawer.Root open={openDrawer} shouldScaleBackground>
        <Drawer.Portal>
          <Drawer.Content className="bg-zinc-100 lg:w-[395px] mx-auto flex flex-col rounded-t-[10px] h-[35%] mt-24 fixed bottom-0 left-0 right-0 border">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8 sm:mb-4" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-semibold text-2xl flex items-center gap-1 mb-6 sm:mb-4">
                  <p className="truncate w-[230px]">{destination}</p>
                </Drawer.Title>
                <p className="text-zinc-600 mb-2">
                  Time: <strong className="text-primary">{duration}</strong>
                </p>
                <p className="text-zinc-600 mb-2">
                  Total Distance:{' '}
                  <strong className="text-primary">{distance}</strong>
                </p>
                <Button
                  onClick={() => {
                    setOpenDrawer(false);
                    map.panTo(center);
                    map.setZoom(15);
                  }}
                  className="mt-6 lg:mt-4 h-12 rounded-xl text-lg text-white bg-primary w-full"
                >
                  Select Route
                </Button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default MapsDirection;
