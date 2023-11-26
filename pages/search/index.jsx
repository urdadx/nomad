import BottomNavigator from '@/components/shared/bottom-navigator';
import BackNavigator from '@/components/utils/back-navigator';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import { Search } from 'lucide-react';

export const SearchInfo = () => {
  return (
    <>
      <div className="px-4">
        <div className="my-6 p-2 w-full h-auto rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-2">
            <div className="flex justify-between">
              <h2>
                <strong className="text-primary">40 mins</strong> to Berekuso
              </h2>
              <Link className="text-primary font-semibold" href="/">
                See more
              </Link>
            </div>
            <div className="my-2">
              <h2>11km</h2>
            </div>
            <div className="flex justify-center">
              <Button className="flex items-center gap-1 bg-primary text-white px-10 rounded-2xl">
                <span>Start</span>
                <span>
                  <Navigation size={17} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchLocation = () => {
  return (
    <>
      <BackNavigator name="Search" cancel={true} />
      <div className="px-4 my-6 flex flex-col gap-y-5">
        <div className="relative">
          <Input
            className="rounded-xl h-12 text-md pl-10 pr-4"
            type="text"
            placeholder="Adenta"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={20} />
          </span>
        </div>
        <div className="relative">
          <Input
            className="rounded-xl h-12 text-md pl-10 pr-4"
            type="text"
            placeholder="Berekuso"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={20} />
          </span>
        </div>
      </div>
      <div className="px-4">
        <h2 className="text-lg font-semibold">Search Routes</h2>
      </div>
      {Array.from({ length: 2 }).map((_, index) => (
        <SearchInfo key={index} />
      ))}{' '}
      <div className="h-[50px]" />
      <div className="">
        <BottomNavigator />
      </div>
    </>
  );
};

export default SearchLocation;
