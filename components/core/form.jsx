import { useState } from 'react';
import LoadingDots from '../utils/loading-dots/loading-dots';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/constants/constants';
import { toast } from 'react-hot-toast';

export const Form = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === 'login') {
          fetch(`${API_URL}/registered_users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: e.currentTarget.email.value,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 409) {
              toast.success('Login successful');
              setTimeout(() => {
                router.push('/home');
              }, 1200);
            } else {
              toast.error("You don't have an account");
              setTimeout(() => {
                router.push('/register');
              }, 1200);
            }
          });
        } else {
          fetch(`${API_URL}/registered_users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: e.currentTarget.email.value,
              username: e.currentTarget.username.value,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 201) {
              toast.success('Account created! ');
              setTimeout(() => {
                router.push('/home');
              }, 1200);
            } else {
              toast.error('An error occured');
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
      <p className="text-right font-semibold my-4 text-gray-600">
        Forgot Password?
      </p>
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
            <p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
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
    </form>
  );
};
