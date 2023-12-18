/* eslint-disable @next/next/no-img-element */
import { Compass, LogOut, CircleUserRound } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/use-current-user';
import { ToolTipWrapper } from '../utils/tooltip-wrapper';
import { Drawer } from 'vaul';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Avatar from 'boring-avatars';

const Navbar = () => {
  const { status } = useSession();
  const { data: currentUser } = useCurrentUser();
  const [drawerOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('You logged out');
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      router.push('/login');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 ${
          !drawerOpen &&
          'bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>
            <Compass size={27} />
          </span>
          <h2 className="font-semibold text-xl">Nomad</h2>
        </div>
        {status === 'authenticated' ? (
          <ToolTipWrapper
            triggerElement={
              <Drawer.Root shouldScaleBackground>
                <Drawer.Trigger>
                  {currentUser?.image ? (
                    <div className="w-[37px] h-[37px] cursor-pointer border-2 border-primary rounded-full">
                      <img
                        className="w-full h-full rounded-full"
                        alt="profile-pic"
                        src={currentUser?.image}
                      />
                    </div>
                  ) : (
                    <Avatar
                      size={40}
                      name={currentUser?.name}
                      variant="marble"
                      colors={[
                        '#92A1C6',
                        '#146A7C',
                        '#F0AB3D',
                        '#C271B4',
                        '#C20D90',
                      ]}
                    />
                  )}
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Content className="bg-white lg:w-[395px] mx-auto flex flex-col rounded-t-[20px] lg:h-[25%] h-[17%] mt-24 fixed bottom-0 left-0 right-0 border">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mt-4 mb-1 sm:mb-4" />
                    <div className="container mt-4 mb-6 bg-white w-full rounded-4xl cursor-pointer  flex items-center gap-2 hover:bg-zinc">
                      <CircleUserRound className="text-zinc-500" />
                      <span className="font-semibold text-lg text-zinc-500">
                        <Link href="/profile">{currentUser?.name}</Link>
                      </span>
                    </div>
                    <div
                      onClick={handleLogout}
                      className="container bg-white w-full rounded-4xl cursor-pointer flex items-center gap-2 hover:bg-zinc"
                    >
                      <LogOut className="text-red-400" size={24} />
                      <span className="font-semibold text-lg text-red-400">
                        Sign out
                      </span>
                    </div>
                  </Drawer.Content>
                  <Drawer.Overlay />
                </Drawer.Portal>
              </Drawer.Root>
            }
            message={currentUser?.name}
          />
        ) : (
          <Link href="/login">
            <Button
              className="rounded-2xl px-10 py-6 text-md font-semibold"
              variant="secondary"
            >
              Sign In!
            </Button>
          </Link>
        )}
      </header>
    </>
  );
};

export default Navbar;
