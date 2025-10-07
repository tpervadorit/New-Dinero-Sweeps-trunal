import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function CustomCardSkeleton({ rows = 10, className = '' }) {
  return (
    <>
      {Array.from(new Array(rows)).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            'flex-none relative overflow-hidden rounded-lg transition-all duration-200 ease-in-out w-full h-full',
            className
          )}
        >
          <Skeleton className="w-full min-h-28 h-full bg-neutral-700" />
        </div>
      ))}
    </>
  );
}
