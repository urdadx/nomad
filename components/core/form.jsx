/* eslint-disable @next/next/no-img-element */
import LoadingDots from '../utils/loading-dots/loading-dots';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export const Form = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next');

  useEffect(() => {
    const error = searchParams?.get('error');
    error && toast.error(error);
  }, [searchParams]);

  const [email, setEmail] = useState('');

  return (
    <div
      // onSubmit={(e) => {
      //   setLoading(true);
      //   e.preventDefault();
      //   signIn('email', { email, redirect: false });
      //   setLoading(false);
      // }}
      className="px-4 my-8"
    >
      {/* <div className="flex flex-col gap-8">
        {type === 'register' && (
          <Input
            name="username"
            className="rounded-lg h-12 text-md"
            type="text"
            placeholder="Username"
          />
        )} 
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="rounded-lg h-12 text-md"
          type="text"
          placeholder="Email"
        />
       <Input
          name="password"
          className="rounded-lg h-12 text-md"
          type="password"
          placeholder="Password"
        /> 
      </div> */}
      {/* 
      <div className="my-6 ">
        <Button
          disabled={loading}
          className={`${
            loading
              ? 'cursor-not-allowed w-full bg-black'
              : 'w-full h-12 bg-black text-white hover:bg-slate-800'
          }`}
        >
          {loading ? (
            <LoadingDots />
          ) : (
            <p>
              {type === 'login' ? 'Continue with email' : 'Continue with email'}
            </p>
          )}
        </Button>
      </div> */}
      {/* {type === 'register' ? (
        <p className="flex gap-2 items-center justify-center text-center my-6 ">
          <span className="text-gray-500"> Already have an account? </span>
          <strong>
            <Link href="/login">Sign in</Link>
          </strong>
        </p>
      ) : (
        <p className="flex gap-2 items-center justify-center text-center my-6 ">
          <span className="text-gray-500"> Don&apos;t have an account?</span>
          <strong>
            <Link href="/register">Sign up</Link>
          </strong>
        </p>
      )} */}
      <Button
        onClick={() => {
          setLoading(true);
          signIn('google', {
            ...(next && next.length > 0 ? { callbackUrl: next } : {}),
          });
        }}
        className="bg-transparent rounded-lg my-10 gap-2 w-full flex justify-center cursor-pointer hover:bg-gray-100 h-12"
      >
        <div className="flex items-center gap-2">
          <img
            className="w-6 h-6"
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="social-icons"
            loading="lazy"
          />
          <p className="text-gray-600 font-semibold">Continue with Google</p>
        </div>
      </Button>
    </div>
  );
};
