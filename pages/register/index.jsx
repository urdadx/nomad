/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { Form } from '@/components/core/form';

export const socialIcons = [
  'https://img.icons8.com/fluency/48/facebook-new.png',
  'https://img.icons8.com/color/48/google-logo.png',
  'https://img.icons8.com/fluency/48/instagram-new.png',
];

const Register = () => {
  return (
    <>
      <BackNavigator cancel={true} isBlack={true} />
      <div className="my-8">
        <div className="my-4">
          <h2 className="font-semibold text-center text-2xl">Sign up now</h2>
          <p className="text-gray-400 text-center my-2">
            Please fill the details to create account
          </p>
        </div>
        <Form type="register" />
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

export default Register;
