import {
  PlusCircle,
  Bookmark,
  Phone,
  Pen,
  ChevronLeft,
  BellDot,
} from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BackNavigator = ({
  name,
  showNotification,
  cancel,
  phone,
  isTransparent,
  bookmark,
  isBlack,
  addButton,
  pen,
}) => {
  const { back } = useRouter();

  return (
    <>
      <div
        className={` ${
          isTransparent
            ? 'absolute bg-transparent flex justify-between items-center '
            : 'sticky bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl'
        } top-0 z-50 pt-6 w-full flex justify-between items-center h-16 px-4 shrink-0 `}
      >
        <div
          onClick={back}
          className={`${
            isTransparent
              ? 'bg-transparent cursor-pointer bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl p-2 w-fit h-auto rounded-full'
              : 'cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full'
          }`}
        >
          <ChevronLeft color={isTransparent && 'orange'} size={20} />
        </div>
        <div className="w-[250px] flex justify-center">
          <h2
            className={`${
              isTransparent ? 'text-white font-semibold' : ''
            } text-xl font-semibold`}
          >
            {name}
          </h2>
        </div>
        {showNotification && (
          <div
            onClick={back}
            className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full"
          >
            <BellDot size={20} />
          </div>
        )}
        {cancel && (
          <div onClick={back} className="cursor-pointer ">
            <small
              className={`font-semibold text-lg ${
                isBlack ? 'text-black' : 'text-primary'
              }`}
            >
              Cancel
            </small>
          </div>
        )}
        {phone && (
          <div
            onClick={back}
            className="cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full"
          >
            <Phone size={20} />
          </div>
        )}
        {bookmark && (
          <div
            onClick={back}
            className={`${
              isTransparent
                ? 'bg-transparent bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl p-2 w-fit h-auto rounded-full'
                : 'cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full'
            }`}
          >
            <Bookmark
              className={`${isTransparent && 'font-extrabold text-primary'}`}
              size={20}
            />
          </div>
        )}
        {pen && (
          <Link href="/create-schedule">
            <div
              className={`${
                isTransparent
                  ? 'bg-transparent bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl p-2 w-fit h-auto rounded-full'
                  : 'cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full'
              }`}
            >
              <Pen
                className={`${isTransparent && 'font-extrabold text-primary'}`}
                size={20}
              />
            </div>
          </Link>
        )}
        {addButton && (
          <Link href="/create-schedule">
            <div
              className={`${
                isTransparent
                  ? 'bg-transparent bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl p-2 w-fit h-auto rounded-full'
                  : 'cursor-pointer w-fit h-auto p-3 flex start bg-gray-100 rounded-full'
              }`}
            >
              <PlusCircle
                className={`${isTransparent && 'font-extrabold text-primary'}`}
                size={20}
              />
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default BackNavigator;
