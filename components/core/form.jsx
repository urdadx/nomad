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

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          if (type === 'login') {
            signIn('credentials', {
              redirect: false,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }).then(({ error }) => {
              if (error) {
                setLoading(false);
                toast.error(error);
              } else {
                router.refresh();
                router.push('/');
              }
            });
          } else {
            fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: e.currentTarget.username.value,
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
              }),
            }).then(async (res) => {
              setLoading(false);
              if (res.status === 200) {
                toast.success('Account created');
                setTimeout(() => {
                  router.push('/');
                }, 2000);
              } else {
                const { error } = await res.json();
                console.log('Register', error);
                toast.error(error);
              }
            });
          }
        }}
        className="px-4 my-8"
      >
        <div className="flex flex-col gap-8">
          {type === 'register' && (
            <Input
              name="username"
              className="rounded-lg h-12 text-md"
              type="text"
              placeholder="Username"
            />
          )}
          <Input
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
        </div>
        <p className="text-right cursor-pointer font-semibold my-4 text-gray-600">
          Forgot Password?
        </p>
        <div className="my-6 ">
          <Button
            disabled={loading}
            className={`${
              loading
                ? 'cursor-not-allowed w-full bg-black'
                : 'w-full h-12 bg-black text-white hover:bg-slate-700'
            }`}
          >
            {loading ? (
              <LoadingDots />
            ) : (
              <p className="lg:text-lg">
                {type === 'login' ? 'Sign In' : 'Sign Up'}
              </p>
            )}
          </Button>
        </div>
        {type === 'register' ? (
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
        )}

        <Button
          onClick={() => {
            setLoading(true);
            signIn('google', {
              ...(next && next.length > 0 ? { callbackUrl: next } : {}),
            });
          }}
          className="bg-transparent rounded-lg my-12 gap-2 w-full flex justify-center cursor-pointer hover:bg-gray-100 h-12"
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
      </form>
    </>
  );
};
