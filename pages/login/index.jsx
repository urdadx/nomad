/* eslint-disable @next/next/no-img-element */
import BackNavigator from '@/components/utils/back-navigator';
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
    </>
  );
};

export default Login;
