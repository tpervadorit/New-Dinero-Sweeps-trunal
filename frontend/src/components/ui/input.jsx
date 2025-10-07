import * as React from 'react';
import { LockKeyhole, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  (
    {
      className,
      type,
      value,
      locked = false,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative w-full', locked && 'opacity-90')}>
        {type === "search" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full text-white rounded-md text-base shadow-sm transition-colors placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent px-3 py-2 focus:outline-none focus:ring-0',
            type === "search" && "pl-9",
            className
          )}
          value={value || ''}
          ref={ref}
          disabled={locked || props.disabled}
          placeholder={placeholder}
          {...props}
        />
        {locked && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <LockKeyhole className="h-5 w-5" />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
