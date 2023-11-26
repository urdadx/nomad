/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authIcons } from '../register';

const Login = () => {
  return (
    <>
      <BackNavigator cancel={true} isBlack={true} />
      <div className="my-8">
        <div className="my-4">
          <h2 className="font-semibold text-center text-2xl">Sign in now</h2>
          <p className="text-gray-400 text-center my-2">
            Please sign in to continue
          </p>
        </div>
        <div className="px-4 my-8">
          <div className="flex flex-col gap-8">
            <Input
              className="rounded-lg h-12 text-md"
              type="text"
              placeholder="Email"
            />
            <Input
              className="rounded-lg h-12 text-md"
              type="password"
              placeholder="Password"
            />
          </div>
          <p className="text-right font-semibold my-4 text-gray-600">
            Forgot Password?
          </p>
          <div className="my-6 ">
            <Button className="w-full h-12 bg-black text-white">Sign In</Button>
          </div>
          <p className="flex gap-2 items-center justify-center text-center my-6 ">
            <span className="text-gray-500"> Don&apos;t have an account? </span>
            <span className="font-semibold">
              <Link href="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="my-14 items-center flex gap-2 w-full justify-center">
        {authIcons.map((item, index) => {
          return (
            <div key={index}>
              <img className="w-10 h-10" src={item} alt="social-icons" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Login;
