import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarSVG from './star-svg';
import ReactReadMoreReadLess from 'react-read-more-read-less';

const ReviewCard = ({ image, name, rating, text }) => {
  return (
    <div className="rounded-xl w-[330px] h-full border bg-card text-card-foreground shadow-md">
      <div className="p-3 flex flex-row">
        <div className="flex items-center gap-4">
          <Avatar className="rounded-full w-[50px] h-[50px] border-2 border-primary">
            <AvatarImage
              className="object-contain w-full h-full rounded-full"
              src={image}
              alt={`@${name}`}
            />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="font-semibold">{name}</h2>
            <h2 className="flex items-center gap-2">
              <StarSVG /> <span>{rating}</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-start">
          <ReactReadMoreReadLess charLimit={100}>{text}</ReactReadMoreReadLess>
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
