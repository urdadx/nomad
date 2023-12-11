export const AttractionCardSkeleton = () => {
  return (
    <div className="w-[270px] h-full">
      <div className="flex cursor-pointer">
        <div className="animate-pulse rounded-3xl p-3 bg-gray-200 w-[270px] h-[240px]"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-[35px] h-[35px] animate-pulse my-2">
          <div className="w-full h-full bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-[150px] flex gap-x-2 my-2 items-center animate-pulse">
          <div className="w-full h-[20px] bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
