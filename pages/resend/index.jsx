import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BackNavigator from '@/components/utils/back-navigator';
import { API_URL } from '@/lib/constants';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';

const Resend = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/resend`, {
        user_id: email,
      });
      toast.success('Verification link sent successfully');
    } catch (error) {
      toast.error('Error resending verification link', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackNavigator name="Email verification" showNotification={true} />
      <section className="h-full w-full justify-center ">
        <form onSubmit={handleResendEmail} className="mt-24">
          <h2 className="text-center font-semibold text-xl">
            Resend Verification
          </h2>
          <div className="px-6 my-4">
            <p className="text-gray-500 text-center">
              Your email verification link has expired. Enter your email address
              for a new one.
            </p>
          </div>
          <div className="px-6 my-6 w-full">
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              className="w-full h-12"
            />
          </div>
          <div className="flex justify-center px-6">
            <Button
              type="submit"
              className="bg-slate-950 w-full text-md rounded-xl h-14 hover:bg-slate-700"
            >
              {isLoading ? (
                <LoadingDots color="#fff" />
              ) : (
                'Resend verification link'
              )}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Resend;
