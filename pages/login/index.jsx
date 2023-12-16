import Link from 'next/link';
import { Compass } from 'lucide-react';
import Head from 'next/head';
import { Form } from '@/components/core/form';

export default function Login() {
  return (
    <>
      <Head>
        <title>Nomad | Login</title>
      </Head>
      <div className=" lg:w-full w-[360px] inset-0 -z-10 h-screen mx-auto bg-white flex items-center justify-center ">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-10">
            <Link href="/">
              <Compass color="black" size={30} />
            </Link>
            <h3 className="text-xl w-full font-semibold">
              Sign in to your account
            </h3>
            <p className="text-sm text-gray-500">
              Start exploring the wonders of Ghana✨
            </p>
          </div>
          <Form type="login" />
        </div>
      </div>
    </>
  );
}
