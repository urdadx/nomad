import BottomNavigator from '../shared/bottom-navigator';
import { useRouter } from 'next/router';

const MobileLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <section className="lg:w-[400px] mx-auto lg:p-2 border min-h-screen rounded-t-xl lg:mt-6">
        {children}
        {router.pathname === '/ask-pi' ||
        router.pathname === '/login' ||
        router.pathname === '/resend' ||
        router.pathname === '/' ||
        router.pathname === '/register' ||
        router.pathname === '/maps-direction' ? (
          ''
        ) : (
          <BottomNavigator />
        )}
      </section>
    </>
  );
};

export default MobileLayout;
