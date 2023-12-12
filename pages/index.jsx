/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Compass } from 'lucide-react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  const toRegisterPage = () => {
    router.push('/register');
  };
  return (
    <>
      <Head>
        <title>Nomad | Your AI Travel Assistant</title>
      </Head>
      <div className="absolute top-0 z-[-2] h-full w-[380px] bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mt-4">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-y-0 w-full h-full"
            aria-hidden="true"
          ></div>
          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <nav
                className="relative flex items-center justify-between md:justify-start"
                aria-label="Global"
              >
                <Link
                  className="flex items-center gap-2 font-bold text-xl"
                  href="/"
                >
                  <Compass color="black" size={30} />

                  <h3 className="lg:block"> Nomad</h3>
                </Link>
              </nav>
            </div>
            <div className="flex items-center justify-center h-screen">
              <div className="px-4 max-w-7xl sm:px-6 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                  <span className="block">Explore and discover the</span>
                  <span id="ghana" className="hero-title block">
                    wonders of Ghana
                  </span>
                </h1>

                <Button
                  onClick={toRegisterPage}
                  className="bg-primary w-[140px] h-[45px] rounded-3xl p-3 my-12"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
