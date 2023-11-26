import { Home, Calendar, Search, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const BottomNavigator = () => {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 bg-white shadow-md border-t">
        <div className="flex justify-between max-w-md mx-auto p-4">
          <Link href="/home" className="flex flex-col items-center">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/schedule-trips" className="flex flex-col items-center">
            <Calendar className="h-6 w-6" />
            <span className="text-xs">Calendar</span>
          </Link>
          <Link
            href="/search"
            className="flex flex-col shadow-lg bg-orange-500 w-[40px] px-4 p-2 h-auto items-center rounded-full"
          >
            <Search className="h-6 w-6 text-white" />
          </Link>
          <Link href="/ask-pi" className="flex flex-col items-center">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs">AskPi</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center">
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNavigator;
