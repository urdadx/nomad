/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/shared/navbar';
import { RoughNotation } from 'react-rough-notation';
import Link from 'next/link';
import Packages from '@/components/utils/packages';
import Attractions from '@/components/core/attractions';

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="">
        <div className="container my-14">
          <h1 className="text-3xl  tracking-tight text-gray-900 sm:text-3xl ">
            <span className="block">Discover the wonders</span>
          </h1>
          <h1 className="text-3xl my-2 tracking-tight text-gray-900 sm:text-4xl">
            <span id="ghana" className="block">
              of{' '}
              <strong className="text-primary text-extrabold">
                <RoughNotation
                  type="underline"
                  strokeWidth={3}
                  animate={true}
                  show={true}
                >
                  Ghana!
                </RoughNotation>
              </strong>
            </span>
          </h1>
        </div>

        <div className="mb-3">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Best Destinations
            </h2>
            <Link
              className="text-primary hover:text-orange-600"
              href="/popular-locations"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="no-scrollbar px-4">
          <Attractions />
        </div>
        <div className="mt-8">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Trip Packages
            </h2>
            <Link
              className="text-primary hover:text-orange-600"
              href="/trip-packages"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="my-4 no-scrollbar">
          <Packages />
        </div>

        <div className="h-[100px]" />
      </section>
    </>
  );
};

export default Home;
