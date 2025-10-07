import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function HomeCustomCardSkeleton({
  rows = 10,
  className = '',
  titled = false,
}) {
  return (
    <>
      {titled && (
        <div className="rounded-full relative h-10 w-36 mt-6 mb-4">
          <Skeleton className="w-full h-full rounded-full bg-neutral-700" />
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-start gap-3 w-full mx-auto overflow-x-hidden',
          !titled && 'mt-4'
        )}
      >
        {Array.from(new Array(rows)).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex-none relative overflow-hidden rounded-lg transition-all duration-200 ease-in-out 
             w-[110px] h-[110px] md:w-[160px] md:h-[160px] lg:w-[125px] lg:h-[125px] xl:w-[144px] xl:h-[144px] ${className}`}
          >
            <Skeleton className="w-full h-full bg-neutral-500" />
          </div>
        ))}
      </div>
    </>
  );
}
