import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-950">
      <div className="">
        <p className="text-center text-white font-semibold text-3xl">GoNomad</p>
        <div href="/register" className="my-8">
          <Link href="/register">
            <Button className="bg-primary text-white text-md h-14 rounded-xl w-[280px]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
