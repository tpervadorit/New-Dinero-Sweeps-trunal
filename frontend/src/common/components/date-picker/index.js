'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, dateFormatter } from '@/lib/utils';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ onChange, className, ...props }) {
  const [date, setDate] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (selectedDate) => {
    const isoDate = selectedDate ? selectedDate.toISOString() : null;
    setDate(selectedDate);
    if (onChange) {
      onChange(isoDate);
    }
    setIsOpen(false);
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start hover:bg-neutral-800 hover:text-white border-0 h-10 text-left font-normal p-2 rounded-md shadow-sm focus:ring-0',
            !date && 'text-gray-500',
            className
          )}
        >
            <div className="flex justify-between items-center w-full">
            {props.value ? (
              dateFormatter(props.value)
            ) : (
              <span>Pick a date</span>
            )}
            </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-neutral-800 rounded-lg shadow-lg w-fit p-0 h-60 border-0"
        align="start"
      >
        <DatePicker
          selected={date}
          onChange={handleSelect}
          showTimeSelect={false}
          inline
          showYearDropdown
          dropdownMode="select"
          maxDate={maxDate}
          onClickOutside={() => setIsOpen(false)}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}

export default CustomDatePicker;
