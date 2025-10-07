'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Tabs = ({ options = [], active, setActive = () => {}, sliderClassNames, tabClassName, activeTabColor, deactiveTabColor }) => {
  const containerRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ transform: 'translateX(0px)', width: '0px' });

  useEffect(() => {
    const calculateSliderStyle = () => {
      if (containerRef.current) {
        const tabElements = Array.from(containerRef.current.querySelectorAll('.tabs_value'));
        const activeIndex = options.findIndex((option) => option.value === active);
        const cumulativeWidth = tabElements
          .slice(0, activeIndex)
          .reduce((acc, elem) => acc + elem.clientWidth, 0);

        setSliderStyle({
          transform: `translateX(${cumulativeWidth}px)`,
          width: `${tabElements[activeIndex]?.clientWidth}px`,
        });
      }
    };

    calculateSliderStyle();
  }, [active, options]);

  return (
    <div
      className={cn(
        "relative inline-flex p-0 rounded-full bg-gray-300 w-fit transition-all duration-300 overflow-hidden",
        tabClassName
      )}
      ref={containerRef}
    >
      {/* Active tab slider */}
      <div
        className={cn(
          "absolute top-0 left-0 h-full rounded-full transition-all duration-300 pointer-events-none z-0",
          "bg-gradient-to-br from-black to-purple-900",
          sliderClassNames
        )}
        style={sliderStyle}
      />

      {/* Tabs */}
      {options.map((item) => {
        const isActive = item.value === active;

        return (
          <div
            key={item.value}
            className={cn(
              "tabs_value relative z-10 px-6 py-2 text-sm font-semibold cursor-pointer select-none rounded-full transition-colors duration-300",
              isActive ? `text-white ${activeTabColor}` : `text-black ${deactiveTabColor}`
            )}
            onClick={(e) => {
              setActive(item.value);
              e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }}
          >
            {item.icon && (
              <Image src={item.icon} alt="" width={20} height={20} className="inline mr-2" />
            )}
            {item.label} {item.count !== undefined ? item.count : ''}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;