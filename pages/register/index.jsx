/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
import { Form } from '@/components/core/form';

const Register = () => {
  return (
    <>
      <BackNavigator isBlack={true} />
      <div className="my-8">
        <div className="my-4">
          <h2 className="font-semibold text-center text-2xl">Sign up now</h2>
          <p className="text-gray-400 text-center my-2">
            Please fill the details to create account
          </p>
        </div>
        <Form type="register" />
      </div>
    </>
  );
};

export default Register;
