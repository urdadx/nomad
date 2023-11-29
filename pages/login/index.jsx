/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { socialIcons } from '../register';
import { Form } from '@/components/core/form';

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
        <Form type="login" />
      </div>
      <div className="my-14 items-center flex gap-2 w-full justify-center">
        {socialIcons.map((item, index) => {
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
