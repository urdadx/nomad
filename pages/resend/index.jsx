import { Button } from '@/components/ui/button';
import BackNavigator from '@/components/utils/back-navigator';
import { API_URL } from '@/lib/constants';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResendVerfication = () => {
  const handleResendEmail = async () => {
    try {
      await axios.post(`${API_URL}/resend`);

      toast.success('Email verification link resent successfully');
    } catch (error) {
      toast.error('Error resending email verification link', error);
    }
  };

  return (
    <>
      <BackNavigator />
      <section className="h-full w-full justify-center ">
        <div className="mt-24">
          <h2 className="text-center font-semibold text-xl">
            Email Verification
          </h2>
          <div className="my-6">
            <p className="text-gray-500 text-center">
              Your email verification link has expired. Click on the button to
              resend a new one.
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleResendEmail}
              className="bg-slate-950 rounded-xl h-12 hover:bg-slate-700"
            >
              Resend email verification link
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResendVerfication;
