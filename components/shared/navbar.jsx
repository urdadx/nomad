import { Compass } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 z-50  flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span>
            <Compass size={27} />
          </span>
          <h2 className="font-semibold text-xl">Nomad</h2>{' '}
        </div>
        <Link href="/login" className="">
          <Button
            className="rounded-2xl px-10 py-6 text-md "
            variant="secondary"
          >
            Sign In!
          </Button>
        </Link>
      </header>
    </>
  );
};

export default Navbar;
