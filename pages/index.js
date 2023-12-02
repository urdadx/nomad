/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/shared/navbar';
import { RoughNotation } from 'react-rough-notation';
import Link from 'next/link';
import SlidingCarousel from '@/components/utils/sliding-carousel';
import BottomNavigator from '@/components/shared/bottom-navigator';

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
              Best Destination
            </h2>
            <Link
              className="text-primary hover:text-orange-600"
              href="/popular-locations"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="no-scrollbar">
          <SlidingCarousel />
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
          <SlidingCarousel />
        </div>
        <div className="container my-8">
          <h2 className="text-primary text-center font-semibold text-2xl">
            Personalized AI Assistant
          </h2>
          <p className="text-center my-2">
            Get a personalized itinerary just for you, guided by traveler tips
            and reviews
          </p>
          <div className="bg-contain mx-auto w-[300px] h-[250px] mt-2 rounded-2xl cursor-pointer">
            <img
              src="/assets/chatbot.png"
              alt="chat-bot"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="h-[100px]" />
        </div>
      </section>
      {/* <BottomNavigator /> */}
    </>
  );
};

export default Home;
