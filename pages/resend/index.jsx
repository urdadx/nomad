import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BackNavigator from '@/components/utils/back-navigator';
import { API_URL } from '@/lib/constants';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingDots from '@/components/utils/loading-dots/loading-dots';
import { locations } from '@/lib/stock-img-locations';
import { Drawer } from 'vaul';

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
      setEmail('');
    } catch (error) {
      toast.error('Error resending verification link', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {locations.map((item, index) => {
        return (
          <Drawer.Root key={index} shouldScaleBackground>
            <Drawer.Trigger asChild>
              <div className="flex flex-row">
                <Button className="h-12 bg-primary mb-6">{item.name}</Button>
              </div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Content className="h-[50%]">hello world</Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        );
      })}
    </>
  );
};

export default Resend;
