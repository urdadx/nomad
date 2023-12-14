import Link from 'next/link';
import { Compass } from 'lucide-react';
import GlobeClient from '@/components/utils/globe';
import { Suspense } from 'react';
import { markers } from '@/lib/utils';

const Hero = () => {
  return (
    <section className="h-screen overflow-y-hidden">
      <nav
        className="relative flex items-center my-2 px-3 justify-between md:justify-start"
        aria-label="Global"
      >
        <Link className="flex items-center gap-2 font-bold text-lg" href="#">
          <Compass color="black" size={30} />
          <h3 className="lg:block"> Nomad</h3>
        </Link>
      </nav>
      <div className="mx-auto mb-4 mt-16 lg:mt-10 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0">
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-3xl sm:leading-[1.15]">
          Explore the wonders
          <br />
          <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            of Ghana
          </span>
        </h1>
        <h2 className="mt-8 lg:m-3 text-gray-600 sm:text-md">
          Nomad is an AI-powered travel companion that helps you craft
          personalized adventures
        </h2>

        <div className="mx-auto mt-3 flex max-w-fit space-x-4">
          <a
            href={`/register`}
            className="rounded-full border-primary border-black bg-primary px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-orange-500 hover:text-white"
          >
            Get Started
          </a>
        </div>
      </div>
      <Suspense fallback={<GlobeClient markers={[]} />}>
        <GlobeClient markers={markers} />{' '}
      </Suspense>
    </section>
  );
};

export default Hero;
