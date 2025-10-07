'use client';
import { Button } from '@/components/ui/button';
const PaginationSection = ({
  limit,
  totalCount,
  onShowMore,
  loading,
  renderLoading,
}) => {
  const progressPercentage = Math.min((limit / totalCount) * 100, 100);

  return (
    <>
      {loading ? (
        renderLoading()
      ) : (
        <div className="flex flex-col items-center my-5 space-y-3 col-span-full">
          <div className="w-full mx-auto bg-stone-700 rounded-full h-1 mb-1">
            <div
              className="bg-yellow-500 h-1 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center text-gray-400 text-sm space-x-2 mt-1">
            <span className="font-bold text-white">{limit}</span>
            <span>Out of</span>
            <span className="font-bold text-white">{totalCount}</span>
            <span>games displayed</span>
          </div>

          {limit >= totalCount || (
            <Button
              onClick={onShowMore}
              className="flex items-center justify-center text-white px-6 py-2 rounded-full mt-5 shiny-hover bg-red-600 hover:bg-red-800 transition focus:outline-none"
            >
              Show More
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default PaginationSection;
